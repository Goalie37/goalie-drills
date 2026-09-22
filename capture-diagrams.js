const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  console.log('Capturing drill diagrams...');

  // Capture Butterfly Push Progression (drill 1)
  await page.goto('http://localhost:3000/drills/1');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/opt/cursor/artifacts/06-drill-diagram-butterfly-push.png', fullPage: true });
  console.log('✓ Butterfly Push diagram captured');

  // Capture Screen Traffic Challenge (drill 7) - more complex diagram
  await page.goto('http://localhost:3000/drills/7');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/opt/cursor/artifacts/07-drill-diagram-screen-traffic.png', fullPage: true });
  console.log('✓ Screen Traffic diagram captured');

  // Capture Backdoor Pass Coverage (drill 10) - shows pass and movement
  await page.goto('http://localhost:3000/drills/10');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/opt/cursor/artifacts/08-drill-diagram-backdoor.png', fullPage: true });
  console.log('✓ Backdoor Pass diagram captured');

  await browser.close();
  console.log('\nAll diagram screenshots saved!');
})();
