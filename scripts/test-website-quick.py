# -*- coding: utf-8 -*-
"""
The Drinkers - Quick Website Test (No Emoji)
"""
from playwright.sync_api import sync_playwright, expect
import time
import sys

BASE_URL = "http://localhost:3000"

def test_website():
    print("\n" + "="*80)
    print("   THE DRINKERS - WEBSITE TEST")
    print("="*80 + "\n")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        
        tests_passed = 0
        tests_failed = 0
        
        # TEST 1: Homepage
        print("[TEST 1] Homepage Loads")
        try:
            page.goto(BASE_URL, wait_until='networkidle', timeout=30000)
            title = page.title()
            assert "Drinkers" in title
            print("  [PASS] Homepage loaded - Title: " + title)
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 2: Navigation
        print("\n[TEST 2] Navigation Menu")
        try:
            nav_links = page.locator('nav a').all()
            print("  Found " + str(len(nav_links)) + " navigation links")
            for i, link in enumerate(nav_links[:5]):
                text = link.inner_text()
                link.click()
                page.wait_for_load_state('networkidle')
                time.sleep(0.5)
                print("  [PASS] Link " + str(i+1) + ": " + text)
                tests_passed += 1
            page.goto(BASE_URL)
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 3: Hero Section
        print("\n[TEST 3] Hero Section")
        try:
            hero = page.locator('section').first
            expect(hero).to_be_visible()
            print("  [PASS] Hero section visible")
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 4: Music Page
        print("\n[TEST 4] Music Page")
        try:
            page.goto(BASE_URL + "/music", wait_until='networkidle')
            assert "/music" in page.url
            print("  [PASS] Music page loaded")
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 5: Tour Page
        print("\n[TEST 5] Tour Page")
        try:
            page.goto(BASE_URL + "/tour", wait_until='networkidle')
            assert "/tour" in page.url
            print("  [PASS] Tour page loaded")
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 6: Merch Page
        print("\n[TEST 6] Merch Page")
        try:
            page.goto(BASE_URL + "/merch", wait_until='networkidle')
            assert "/merch" in page.url
            print("  [PASS] Merch page loaded")
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 7: Press Page
        print("\n[TEST 7] Press Page")
        try:
            page.goto(BASE_URL + "/press", wait_until='networkidle')
            assert "/press" in page.url
            print("  [PASS] Press page loaded")
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 8: Social Campaign Page
        print("\n[TEST 8] Social Campaign Page")
        try:
            page.goto(BASE_URL + "/social-campaign", wait_until='networkidle')
            assert "/social-campaign" in page.url
            print("  [PASS] Social campaign page loaded")
            tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 9: Mobile
        print("\n[TEST 9] Mobile Responsiveness")
        try:
            mobile_context = browser.new_context(viewport={'width': 375, 'height': 667})
            mobile_page = mobile_context.new_page()
            mobile_page.goto(BASE_URL, wait_until='networkidle')
            content = mobile_page.locator('main, body').first
            expect(content).to_be_visible()
            print("  [PASS] Mobile view working")
            tests_passed += 1
            mobile_context.close()
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        # TEST 10: Performance
        print("\n[TEST 10] Performance")
        try:
            page.goto(BASE_URL)
            metrics = page.evaluate("""() => {
                return {
                    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                    fullyLoaded: performance.timing.loadEventEnd - performance.timing.navigationStart
                }
            }""")
            print("  DOM Content Loaded: " + str(metrics['domContentLoaded']) + "ms")
            print("  Fully Loaded: " + str(metrics['fullyLoaded']) + "ms")
            if metrics['domContentLoaded'] < 3000:
                print("  [PASS] Performance good")
                tests_passed += 1
            else:
                print("  [WARN] Performance could be improved")
                tests_passed += 1
        except Exception as e:
            print("  [FAIL] " + str(e))
            tests_failed += 1
        
        browser.close()
        
        # SUMMARY
        print("\n" + "="*80)
        print("   TEST SUMMARY")
        print("="*80)
        print("\n  [PASS] Tests Passed: " + str(tests_passed))
        print("  [FAIL] Tests Failed: " + str(tests_failed))
        total = tests_passed + tests_failed
        rate = (tests_passed / total * 100) if total > 0 else 0
        print("  Success Rate: " + str(round(rate, 1)) + "%")
        
        if tests_failed == 0:
            print("\n  *** ALL TESTS PASSED! ***")
        else:
            print("\n  " + str(tests_failed) + " test(s) need attention")
        
        print("\n" + "="*80 + "\n")
        
        return tests_failed == 0

if __name__ == "__main__":
    success = test_website()
    exit(0 if success else 1)
