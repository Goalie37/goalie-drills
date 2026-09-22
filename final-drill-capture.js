const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  console.log('Capturing drill detail page...');

  // Navigate directly to a drill detail page
  await page.goto('http://localhost:3000/drills/1');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'artifacts/03-drill-detail.png', fullPage: true });
  console.log('✓ Drill detail page captured');

  await browser.close();
})();
