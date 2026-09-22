const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  console.log('Capturing new diagram screenshots...');

  // 1. Editor with toolbar
  await page.goto('http://localhost:3000/editor/1');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/opt/cursor/artifacts/09-editor-toolbar.png', fullPage: true });
  console.log('✓ Editor toolbar captured');

  // 2. Drill detail with dual view (Drill 1 - Butterfly Push)
  await page.goto('http://localhost:3000/drills/1');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/opt/cursor/artifacts/10-diagram-dual-view.png', fullPage: true });
  console.log('✓ Dual view diagram captured');

  // 3. Drill detail with in-zone view (Drill 2 - Tracking High-Low)
  await page.goto('http://localhost:3000/drills/2');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/opt/cursor/artifacts/11-diagram-half-ice.png', fullPage: true });
  console.log('✓ Half-ice diagram captured');

  await browser.close();
  console.log('\nAll new diagram screenshots saved!');
})();
