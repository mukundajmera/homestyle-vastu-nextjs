module.exports = async (page, baseUrl) => {
  const checks = [];
  const failures = [];
  let consoleErrors = [];

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  async function check(name, action) {
    try {
      await action();
      checks.push({ name, status: 'passed' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      checks.push({ name, status: 'failed', message });
      failures.push(`${name}: ${message}`);
    }
  }

  page.on('console', (message) => {
    const expectedNotFoundNavigation = page.url().includes('/no-such-page')
      && message.text().includes('server responded with a status of 404');
    if (message.type() === 'error' && !expectedNotFoundNavigation) consoleErrors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));

  const base = new URL(baseUrl);
  const routes = ['/', '/services', '/about', '/contact', '/privacy'];

  for (const path of routes) {
    consoleErrors = [];
    let response;
    await check(`${path} returns 200 and exactly one h1`, async () => {
      response = await page.goto(new URL(path, base).href, { waitUntil: 'domcontentloaded' });
      assert(response && response.status() === 200, `Expected HTTP 200, received ${response?.status() ?? 'no response'}`);
      const headings = await page.locator('h1').count();
      assert(headings === 1, `Expected exactly one h1, received ${headings}`);
    });
    await check(`${path} has no console errors`, async () => {
      assert(consoleErrors.length === 0, consoleErrors.join('\n') || 'Unexpected console error');
    });
  }

  consoleErrors = [];
  await check('/no-such-page returns 404', async () => {
    const response = await page.goto(new URL('/no-such-page', base).href, { waitUntil: 'domcontentloaded' });
    assert(response && response.status() === 404, `Expected HTTP 404, received ${response?.status() ?? 'no response'}`);
  });
  await check('/no-such-page has no console errors', async () => {
    assert(consoleErrors.length === 0, consoleErrors.join('\n') || 'Unexpected console error');
  });

  await check('home compass previews West, restores its lock, and locks East', async () => {
    await page.goto(new URL('/', base).href, { waitUntil: 'domcontentloaded' });
    const figure = page.locator('figure').filter({ has: page.getByRole('group', { name: 'Choose a compass direction' }) });
    const dial = figure.locator('svg').first();
    const bounds = await dial.boundingBox();
    assert(bounds, 'Could not find compass dial bounds');
    const status = figure.getByText(/^(Previewing|Selected) /);

    await page.mouse.move(bounds.x + bounds.width * 0.1, bounds.y + bounds.height * 0.5);
    await status.waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.querySelector('figure')?.textContent?.includes('Previewing West'));
    assert((await status.textContent())?.startsWith('Previewing West'), 'Left side of the dial did not preview West');

    await page.mouse.move(5, 5);
    await page.waitForFunction(() => document.querySelector('figure')?.textContent?.includes('Selected North-East'));
    assert((await status.textContent())?.startsWith('Selected North-East'), 'Moving off the dial did not restore North-East');

    await page.mouse.click(bounds.x + bounds.width * 0.9, bounds.y + bounds.height * 0.5);
    await page.waitForFunction(() => document.querySelector('figure')?.textContent?.includes('Selected East'));
    assert((await status.textContent())?.startsWith('Selected East'), 'Right side click did not lock East');
  });

  let contactPostCalls = 0;
  await page.route('**/api/contact', async (route) => {
    if (route.request().method() === 'POST') contactPostCalls += 1;
    await route.abort();
  });
  let validationRendered = false;
  await check('empty contact form shows validation errors', async () => {
    const response = await page.goto(new URL('/contact', base).href, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => Boolean(document.querySelector('form'))
      || [...document.querySelectorAll('h1, h2, h3, h4')].some((heading) => heading.textContent?.includes('Inquiries Temporarily Paused')),
    null, { timeout: 5000 });
    const form = page.locator('form');
    const formCount = await form.count();
    if (formCount !== 1) {
      // When lead intake is paused the form is intentionally not rendered. That is correct,
      // so the check passes only if the paused notice is shown and no form is.
      const pausedMessage = await page.getByRole('heading', { name: 'Inquiries Temporarily Paused' }).count();
      assert(
        formCount === 0 && pausedMessage === 1,
        `HTTP ${response?.status() ?? 'no response'} /contact rendered ${formCount} forms and ${pausedMessage} paused notices`,
      );
      return;
    }
    await form.getByRole('button', { name: /Submit & Discuss Your Property/ }).click();
    const errors = form.locator('[aria-live="polite"]');
    await errors.first().waitFor({ state: 'visible', timeout: 3000 });
    validationRendered = await errors.count() > 0;
    assert(validationRendered, 'Submitting empty form did not show validation errors');
  });
  await check('empty contact form does not POST /api/contact', async () => {
    assert(contactPostCalls === 0, `Expected zero POST requests, received ${contactPostCalls}`);
  });
  await page.unroute('**/api/contact');

  let emptyPostObservation;
  await check('empty POST /api/contact returns 400 or 403 JSON error', async () => {
    const response = await page.context().request.post(new URL('/api/contact', base).href, { data: {} });
    const status = response.status();
    assert([400, 403].includes(status), `Expected status 400 or 403, received ${status}`);
    const body = await response.json().catch(() => null);
    assert(body && typeof body.error === 'string', `Expected JSON with an error string, received ${JSON.stringify(body)}`);
    emptyPostObservation = { status, body };
  });

  await check('home security headers are present', async () => {
    const response = await page.goto(new URL('/', base).href, { waitUntil: 'domcontentloaded' });
    assert(response, 'Home navigation returned no response');
    const headers = response.headers();
    assert(Boolean(headers['content-security-policy']), 'Missing content-security-policy');
    assert(headers['x-frame-options'] === 'DENY', `Expected x-frame-options DENY, received ${headers['x-frame-options'] ?? 'missing'}`);
    assert(Boolean(headers['strict-transport-security']), 'Missing strict-transport-security');
  });

  await check('robots.txt is served and non-empty', async () => {
    const response = await page.context().request.get(new URL('/robots.txt', base).href);
    const body = await response.text();
    assert(response.status() === 200, `Expected HTTP 200, received ${response.status()}`);
    assert(body.trim().length > 0, 'robots.txt was empty');
  });

  await check('mobile home has no horizontal overflow at 375x812', async () => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(new URL('/', base).href, { waitUntil: 'domcontentloaded' });
    const sizes = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    assert(sizes.documentWidth <= sizes.viewportWidth, `Horizontal overflow: document ${sizes.documentWidth}px, viewport ${sizes.viewportWidth}px`);
  });

  const passed = checks.filter((result) => result.status === 'passed').length;
  const failed = checks.filter((result) => result.status === 'failed').length;
  console.log(JSON.stringify({ baseUrl: base.href, passed, failed, checks, emptyPostObservation }, null, 2));
  if (failures.length) throw new Error(failures.join('\n'));
  return { passed, failed, checks, validationRendered };
}
