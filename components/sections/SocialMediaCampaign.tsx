'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

/**
 * Social Media Campaign Component
 * Displays the 7-day launch campaign with AI-generated images
 */
export function SocialMediaCampaign() {
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Campaign data
  const campaignDays = [
    {
      day: 1,
      platform: 'Instagram',
      type: 'Story',
      title: 'Something Big Is Coming',
      copy: 'Something big is coming... 🎸🔥 #TheDrinkers',
      timing: '19:00',
      prompt: 'Dark moody Instagram story vertical 9:16, crimson red spotlight on black background, electric guitar silhouette, stage fog, mysterious atmosphere, rock band aesthetic, professional photography',
      aspect: '9:16',
    },
    {
      day: 2,
      platform: 'Facebook',
      type: 'Post',
      title: 'Pripravljeni na Novo Ero',
      copy: '🍺 PRIPRAVLJENI NA NOVO ERO? 🍺\n\nStran se lansira kmalu! 🚀\n\n#TheDrinkers #NewEra',
      timing: '18:30',
      prompt: 'Facebook post square 1:1, crimson red to black gradient background, COMING SOON bold typography in center, professional social media graphic, rock band launch announcement',
      aspect: '1:1',
    },
    {
      day: 3,
      platform: 'Instagram',
      type: 'Reel',
      title: '15-Sec Video Teaser',
      copy: 'Kdo smo? The Drinkers. 🎸\nKaj igramo? Rock\'n\'roll. 🤘\nKdaj? Kmalu. ⏰',
      timing: '20:00',
      prompt: '15 second rock band teaser video vertical, guitar close-up crimson red lighting, drummer hands, singer with microphone, beer mug slam, logo reveal',
      aspect: '9:16',
      video: true,
    },
    {
      day: 4,
      platform: 'Twitter/X',
      type: 'Post',
      title: 'New Era',
      copy: 'New website. New era. Same rock \'n\' roll. 🤘\n\nthedrinkers.si launches soon.\n\n#TheDrinkers #SlovenianRock',
      timing: '12:00',
      prompt: 'Twitter header horizontal 16:9, The Drinkers logo pulsing crimson red glow, black background, minimal rock aesthetic, professional social media banner',
      aspect: '16:9',
    },
    {
      day: 5,
      platform: 'Instagram',
      type: 'Story',
      title: 'Poll: Katero Pesem?',
      copy: '🎸 KATERO PESEM ŽELITE SLIŠATI V ŽIVO? 🎸\n\nVote now! 👇',
      timing: '19:30',
      prompt: 'Instagram story vertical 9:16, music album covers collage faded background, crimson red and black color scheme, space in center for poll sticker, rock band aesthetic',
      aspect: '9:16',
    },
    {
      day: 6,
      platform: 'Facebook',
      type: 'Post',
      title: 'Countdown 3 Days',
      copy: '🎉 ŠTEJTE Z NAMI! 3 DNI DO LAUNCHA! 🎉\n\n📅 [Datum]\n⏰ Ob 18:00\n🚀 thedrinkers.si',
      timing: '17:00',
      prompt: 'Facebook post square 1:1, large number 3 in crimson red metallic texture, DAYS TO LAUNCH text, confetti celebration elements, exciting atmosphere',
      aspect: '1:1',
    },
    {
      day: 7,
      platform: 'ALL',
      type: 'Launch',
      title: 'JUTRI! Ob 18:00!',
      copy: '🚀 JUTRI! OB 18:00! 🚀\n\nthedrinkers.si\n\nSet your alarms! ⏰',
      timing: '18:00',
      prompt: 'Launch announcement Instagram post square 1:1, TOMORROW 18:00 bold typography center, crimson red explosion background, The Drinkers logo, dramatic lighting',
      aspect: '1:1',
    },
  ];

  // Generate image using Pollinations.ai (free, no login required)
  const generateImage = async (day: number, prompt: string, aspect: string) => {
    setIsGenerating(true);
    
    try {
      // Parse aspect ratio
      const [width, height] = aspect.split(':').map(Number);
      const finalWidth = width === 1 && height === 1 ? 1080 : width === 9 ? 1080 : 1200;
      const finalHeight = width === 1 && height === 1 ? 1080 : height === 16 ? 1920 : 675;
      
      // Build Pollinations.ai URL
      const encodedPrompt = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${finalWidth}&height=${finalHeight}&seed=${day}&model=flux&nologo=true`;
      
      // Set image URL
      setGeneratedImages(prev => ({
        ...prev,
        [day]: imageUrl,
      }));
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate all images
  const generateAllImages = async () => {
    for (const day of campaignDays) {
      await generateImage(day.day, day.prompt, day.aspect);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between images
    }
  };

  return (
    <Section id="social-campaign" className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📱 Social Media Launch Campaign
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            7-delna kampanja za launch nove spletne strani
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on 2026 Social Media Trends Research
          </p>
        </div>

        {/* Generate All Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={generateAllImages}
            disabled={isGenerating}
            className="bg-crimson-600 hover:bg-crimson-700 text-white px-8 py-4 text-lg"
          >
            {isGenerating ? 'Generating...' : '🎨 Generate All Campaign Images'}
          </Button>
        </div>

        {/* Campaign Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaignDays.map((day) => (
            <div
              key={day.day}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-crimson-600 transition-all"
            >
              {/* Image Preview */}
              <div className="aspect-square bg-gray-800 relative">
                {generatedImages[day.day] ? (
                  <img
                    src={generatedImages[day.day]}
                    alt={`Day ${day.day} preview`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🎸</div>
                      <p className="text-sm">Click generate to create image</p>
                    </div>
                  </div>
                )}
                
                {/* Day Badge */}
                <div className="absolute top-2 left-2 bg-crimson-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Day {day.day}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Platform & Type */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-crimson-400 uppercase tracking-wider">
                    {day.platform}
                  </span>
                  <span className="text-xs text-gray-500">
                    {day.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {day.title}
                </h3>

                {/* Timing */}
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span className="mr-2">⏰</span>
                  {day.timing} CET
                </div>

                {/* Copy Preview */}
                <div className="bg-gray-800 rounded p-3 mb-4">
                  <p className="text-sm text-gray-300 whitespace-pre-line">
                    {day.copy}
                  </p>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={() => generateImage(day.day, day.prompt, day.aspect)}
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full text-sm"
                >
                  {generatedImages[day.day] ? '🔄 Regenerate' : '✨ Generate Image'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">📋 Navodila</h3>
          <ol className="space-y-2 text-gray-300">
            <li>1. Klikni &quot;Generate All Campaign Images&quot; ali posamično za vsak dan</li>
            <li>2. Počakaj 10-30 sekund na generiranje vsake slike</li>
            <li>3. Desni klik na sliko → &quot;Save image as...&quot;</li>
            <li>4. Shrani v public/images/social/[platform]/[filename].jpg</li>
            <li>5. Uploadaj v Meta Business Suite in schedule objave</li>
          </ol>
          <p className="mt-4 text-sm text-gray-500">
            📖 Več informacij: <a href="/SOCIAL_MEDIA_POSTING_SCHEDULE.md" className="text-crimson-400 hover:underline">SOCIAL_MEDIA_POSTING_SCHEDULE.md</a>
          </p>
        </div>
      </div>
    </Section>
  );
}
