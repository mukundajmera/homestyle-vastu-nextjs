/* eslint-disable @typescript-eslint/no-require-imports -- This standalone runner uses CommonJS resolution to load global Playwright when available. */
const { execFileSync } = require('node:child_process');
const path = require('node:path');

function loadPlaywright() {
  try {
    return require('playwright-core');
  } catch {
    const globalRoot = process.platform === 'win32'
      ? path.join(process.env.APPDATA, 'npm', 'node_modules')
      : execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
    return require(path.join(globalRoot, '@playwright', 'cli', 'node_modules', 'playwright-core'));
  }
}

async function main() {
  const baseUrl = process.env.E2E_BASE_URL || 'http://127.0.0.1:3000';
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const runSmoke = require('./smoke');
    await runSmoke(page, baseUrl);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
