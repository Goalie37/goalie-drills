const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  console.log('Capturing drill detail page...');

  // Navigate to drills page first
  await page.goto('http://localhost:3000/drills');
  await page.waitForLoadState('networkidle');
  
  // Find and click the first drill card
  const drillCard = page.locator('a[href^="/drills/"]').first();
  await drillCard.click();
  
  // Wait for navigation to complete
  await page.waitForURL(/\/drills\/\d+/);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'artifacts/03-drill-detail.png', fullPage: true });
  console.log('✓ Drill detail page captured');

  await browser.close();
})();
