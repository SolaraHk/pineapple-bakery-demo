import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4199/pineapple-bakery-demo/';
const browser = await chromium.launch({ headless: true });
const cases = [
  { name: 'v1 desktop', url: base, width: 1280, height: 720, mustHave: 'Fresh pineapple buns in Sheung Wan' },
  { name: 'v2 desktop', url: `${base}v2/`, width: 1280, height: 720, mustHave: 'A bakery launch page built like a fresh-batch signal board' },
  { name: 'v2 mobile', url: `${base}v2/`, width: 390, height: 844, mustHave: 'A bakery launch page built like a fresh-batch signal board' },
];

for (const testCase of cases) {
  const page = await browser.newPage({ viewport: { width: testCase.width, height: testCase.height } });
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(err.message));
  await page.goto(testCase.url, { waitUntil: 'networkidle' });
  await page.getByText(testCase.mustHave, { exact: false }).first().waitFor({ timeout: 5000 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  if (testCase.name.startsWith('v2')) {
    await page.locator('#v2-visit').scrollIntoViewIfNeeded();
    await page.getByText('Check Instagram for today', { exact: false }).first().waitFor({ timeout: 5000 });
    if (testCase.name === 'v2 desktop') {
      await page.getByRole('button', { name: '繁' }).click();
      await page.getByText('像新鮮出爐訊號板一樣', { exact: false }).first().waitFor({ timeout: 5000 });
    }
  }
  console.log(`${testCase.name}: title=${await page.title()} overflow=${overflow} errors=${errors.length}`);
  if (errors.length) console.log(errors.join('\n'));
  await page.close();
}
await browser.close();
