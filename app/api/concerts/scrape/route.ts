import { NextRequest, NextResponse } from 'next/server';

// Firecrawl API configuration
const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_BASE_URL = 'https://api.firecrawl.dev';

/**
 * Scrape concert data from Eventim
 * Uses Firecrawl to extract concert information
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const artist = searchParams.get('artist') || 'The Drinkers';
    
    if (!FIRECRAWL_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Firecrawl API key not configured',
          message: 'Add FIRECRAWL_API_KEY to .env.local'
        },
        { status: 500 }
      );
    }

    // Search for concerts on Eventim
    const eventimSearchUrl = `https://www.eventim.si/search/?query=${encodeURIComponent(artist)}`;
    
    const response = await fetch(`${FIRECRAWL_BASE_URL}/v1/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url: eventimSearchUrl,
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 3000, // Wait for JS to render
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse concert data from markdown
    const concerts = parseConcertData(data.markdown);

    return NextResponse.json({
      success: true,
      source: 'eventim.si',
      artist,
      concerts,
      scrapedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error scraping concerts:', error);
    return NextResponse.json(
      { 
        error: 'Failed to scrape concerts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Parse concert data from markdown
 * This is a simple parser - adjust based on actual HTML structure
 */
function parseConcertData(markdown: string) {
  const concerts = [];
  const lines = markdown.split('\n');
  
  let currentConcert: any = null;
  
  for (const line of lines) {
    // Look for date patterns
    const dateMatch = line.match(/(\d{1,2}\.\s\w+\s\d{4})/);
    if (dateMatch) {
      if (currentConcert) {
        concerts.push(currentConcert);
      }
      currentConcert = {
        date: dateMatch[1],
        venue: '',
        city: '',
        ticketUrl: '',
      };
    }
    
    // Look for venue information
    if (currentConcert && line.includes('●')) {
      const parts = line.split('●').map((s: string) => s.trim());
      if (parts.length >= 2) {
        currentConcert.city = parts[0];
        currentConcert.venue = parts[1];
      }
    }
  }
  
  if (currentConcert) {
    concerts.push(currentConcert);
  }
  
  return concerts;
}
