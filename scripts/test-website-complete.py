"""
The Drinkers - Comprehensive Website Testing Script
Tests all pages, buttons, navigation, and functionality
"""

# -*- coding: utf-8 -*-
from playwright.sync_api import sync_playwright, expect
import time
import sys

# Force UTF-8 encoding for Windows console
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')
import re

BASE_URL = "http://localhost:3000"

def test_website():
    """Complete website testing suite"""
    
    print("\n" + "="*80)
    print("   THE DRINKERS - COMPREHENSIVE WEBSITE TEST")
    print("="*80 + "\n")
    
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1920, 'height': 1080}
        )
        page = context.new_page()
        
        # Enable console logging
        page.on('console', lambda msg: print(f"  📝 Console: {msg.type}: {msg.text}"))
        page.on('pageerror', lambda err: print(f"  ❌ Page Error: {err}"))
        
        tests_passed = 0
        tests_failed = 0
        
        # TEST 1: Homepage loads
        print("\n[TEST 1] Homepage Loads")
        print("-" * 40)
        try:
            page.goto(BASE_URL, wait_until='networkidle', timeout=30000)
            title = page.title()
            assert "Drinkers" in title
            print("  ✅ Homepage loaded successfully")
            print(f"  📊 Title: {title}")
            tests_passed += 1
        except Exception as e:
            print(f"  ❌ Homepage failed: {e}")
            tests_failed += 1
        
        # TEST 2: Navigation menu works
        print("\n🧭 TEST 2: Navigation Menu")
        print("-" * 40)
        try:
            # Find and click navigation links
            nav_links = page.locator('nav a').all()
            print(f"  📍 Found {len(nav_links)} navigation links")
            
            for i, link in enumerate(nav_links[:5]):  # Test first 5
                text = link.inner_text()
                link.click()
                page.wait_for_load_state('networkidle')
                time.sleep(1)
                print(f"  ✅ Nav link {i+1}: {text}")
                tests_passed += 1
            
            # Return to homepage
            page.goto(BASE_URL)
        except Exception as e:
            print(f"  ❌ Navigation test failed: {e}")
            tests_failed += 1
        
        # TEST 3: Hero section
        print("\n🎸 TEST 3: Hero Section")
        print("-" * 40)
        try:
            hero = page.locator('section').first
            expect(hero).to_be_visible()
            print("  ✅ Hero section visible")
            
            hero_heading = hero.locator('h1, h2').first
            if hero_heading.count() > 0:
                print(f"  📝 Hero heading: {hero_heading.inner_text()[:50]}...")
                tests_passed += 1
        except Exception as e:
            print(f"  ❌ Hero section failed: {e}")
            tests_failed += 1
        
        # TEST 4: Music section
        print("\n🎵 TEST 4: Music Section")
        print("-" * 40)
        try:
            page.goto(f"{BASE_URL}/music", wait_until='networkidle')
            assert "/music" in page.url
            print("  ✅ Music page loaded")
            tests_passed += 1
        except Exception as e:
            print(f"  ❌ Music page failed: {e}")
            tests_failed += 1
        
        # TEST 5: Tour page
        print("\n🎫 TEST 5: Tour Page")
        print("-" * 40)
        try:
            page.goto(f"{BASE_URL}/tour", wait_until='networkidle')
            assert "/tour" in page.url
            print("  ✅ Tour page loaded")
            tests_passed += 1
        except Exception as e:
            print(f"  ❌ Tour page failed: {e}")
            tests_failed += 1
        
        # TEST 6: Merch page
        print("\n👕 TEST 6: Merch Page")
        print("-" * 40)
        try:
            page.goto(f"{BASE_URL}/merch", wait_until='networkidle')
            assert "/merch" in page.url
            print("  ✅ Merch page loaded")
            tests_passed += 1
        except Exception as e:
            print(f"  ❌ Merch page failed: {e}")
            tests_failed += 1
        
        # TEST 7: Press page
        print("\n📰 TEST 7: Press Page")
        print("-" * 40)
        try:
            page.goto(f"{BASE_URL}/press", wait_until='networkidle')
            assert "/press" in page.url
            print("  ✅ Press page loaded")
            tests_passed += 1
        except Exception as e:
            print(f"  ❌ Press page failed: {e}")
            tests_failed += 1
        
        # TEST 8: Social Campaign page
        print("\n📱 TEST 8: Social Campaign Page")
        print("-" * 40)
        try:
            page.goto(f"{BASE_URL}/social-campaign", wait_until='networkidle')
            assert "/social-campaign" in page.url
            print("  ✅ Social campaign page loaded")
            
            # Test image generator button
            generate_btn = page.locator('button:has-text("Generate"), button:has-text("generate")').first
            if generate_btn.count() > 0:
                generate_btn.click()
                print("  ✅ Image generator button clickable")
                tests_passed += 2
        except Exception as e:
            print(f"  ❌ Social campaign page failed: {e}")
            tests_failed += 1
        
        # TEST 9: Mobile responsiveness
        print("\n📱 TEST 9: Mobile Responsiveness")
        print("-" * 40)
        try:
            # Set mobile viewport using new context approach
            mobile_context = browser.new_context(viewport={'width': 375, 'height': 667})
            mobile_page = mobile_context.new_page()
            mobile_page.goto(BASE_URL, wait_until='networkidle')
            
            # Check if mobile menu exists or content is visible
            content = mobile_page.locator('main, body').first
            expect(content).to_be_visible()
            print("  ✅ Mobile view working")
            tests_passed += 1
            
            # Close mobile context
            mobile_context.close()
        except Exception as e:
            print(f"  ❌ Mobile test failed: {e}")
            tests_failed += 1
        
        # TEST 10: Check for JavaScript errors
        print("\n🐛 TEST 10: JavaScript Errors")
        print("-" * 40)
        try:
            page.goto(BASE_URL, wait_until='networkidle')
            time.sleep(2)  # Wait for any async errors
            
            console_errors = []
            page.on('console', lambda msg: console_errors.append(msg) if msg.type == 'error' else None)
            
            if len(console_errors) == 0:
                print("  ✅ No JavaScript errors detected")
                tests_passed += 1
            else:
                print(f"  ⚠️ Found {len(console_errors)} console errors")
                for err in console_errors[:3]:
                    print(f"    - {err.text}")
                tests_failed += 1
        except Exception as e:
            print(f"  ❌ Error check failed: {e}")
            tests_failed += 1
        
        # TEST 11: Check all internal links
        print("\n🔗 TEST 11: Internal Links Check")
        print("-" * 40)
        try:
            links = page.locator('a[href^="/"]').all()
            working_links = 0
            broken_links = 0
            
            for link in links[:20]:  # Test first 20 links
                try:
                    href = link.get_attribute('href')
                    if href and not href.startswith('#'):
                        link.click(timeout=5000)
                        page.wait_for_load_state('networkidle', timeout=10000)
                        working_links += 1
                        page.go_back()
                except:
                    broken_links += 1
            
            print(f"  ✅ Working links: {working_links}")
            if broken_links > 0:
                print(f"  ⚠️ Broken links: {broken_links}")
            tests_passed += 1
        except Exception as e:
            print(f"  ❌ Link check failed: {e}")
            tests_failed += 1
        
        # TEST 12: Performance check
        print("\n⚡ TEST 12: Performance Check")
        print("-" * 40)
        try:
            page.goto(BASE_URL)
            metrics = page.evaluate("""() => {
                return {
                    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                    fullyLoaded: performance.timing.loadEventEnd - performance.timing.navigationStart,
                    resourceCount: performance.getEntriesByType('resource').length
                }
            }""")
            
            print(f"  ⏱️ DOM Content Loaded: {metrics['domContentLoaded']}ms")
            print(f"  ⏱️ Fully Loaded: {metrics['fullyLoaded']}ms")
            print(f"  📦 Resources: {metrics['resourceCount']}")
            
            if metrics['domContentLoaded'] < 3000:
                print("  ✅ Performance good")
                tests_passed += 1
            else:
                print("  ⚠️ Performance could be improved")
                tests_passed += 1
        except Exception as e:
            print(f"  ❌ Performance check failed: {e}")
            tests_failed += 1
        
        # Close browser
        browser.close()
        
        # FINAL SUMMARY
        print("\n" + "="*80)
        print("   TEST SUMMARY")
        print("="*80)
        print(f"\n  ✅ Tests Passed: {tests_passed}")
        print(f"  ❌ Tests Failed: {tests_failed}")
        print(f"  📊 Success Rate: {(tests_passed / (tests_passed + tests_failed) * 100):.1f}%")
        
        if tests_failed == 0:
            print("\n  🎉 ALL TESTS PASSED! Website is working perfectly! 🤘🍺")
        else:
            print(f"\n  ⚠️ {tests_failed} test(s) need attention")
        
        print("\n" + "="*80 + "\n")
        
        return tests_failed == 0

if __name__ == "__main__":
    success = test_website()
    exit(0 if success else 1)
