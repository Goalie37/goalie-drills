const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 }
  });
  const page = await context.newPage();

  console.log('Taking screenshots...');

  // Home page
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'artifacts/01-home.png', fullPage: true });
  console.log('✓ Home page captured');

  // Drills directory
  await page.goto('http://localhost:3000/drills');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'artifacts/02-drills.png', fullPage: true });
  console.log('✓ Drills directory captured');

  // Single drill detail
  await page.goto('http://localhost:3000/drills/1');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'artifacts/03-drill-detail.png', fullPage: true });
  console.log('✓ Drill detail captured');

  // Practice plans - navigate and click create
  await page.goto('http://localhost:3000/practice-plans');
  await page.waitForLoadState('networkidle');
  
  // Check if there's a create button visible
  const createButton = await page.locator('button:has-text("Create")').first();
  if (await createButton.isVisible()) {
    await createButton.click();
    await page.waitForTimeout(500);
  }
  
  await page.screenshot({ path: 'artifacts/04-practice-plans.png', fullPage: true });
  console.log('✓ Practice plans captured');

  // Season plans
  await page.goto('http://localhost:3000/season-plans');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'artifacts/05-season-plans.png', fullPage: true });
  console.log('✓ Season plans captured');

  await browser.close();
  console.log('\nAll screenshots saved to artifacts/');
})();
