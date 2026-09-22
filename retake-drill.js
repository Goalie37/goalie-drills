const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  console.log('Retaking drill detail screenshot...');

  // Navigate to drills page first
  await page.goto('http://localhost:3000/drills');
  await page.waitForLoadState('networkidle');
  
  // Click on the first drill
  await page.locator('a[href="/drills/1"]').first().click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  
  await page.screenshot({ path: 'artifacts/03-drill-detail.png', fullPage: true });
  console.log('✓ Drill detail captured');

  await browser.close();
})();
