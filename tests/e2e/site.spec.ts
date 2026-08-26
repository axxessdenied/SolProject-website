import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const basePath = '/SolProject-website/';
const primaryRoutes = [
  { path: '', heading: 'A galaxy that moves without you.' },
  { path: 'game/', heading: 'Make a life between the stars.' },
  { path: 'engine/', heading: 'The machinery behind the horizon.' },
  { path: 'roadmap/', heading: 'Built in runnable milestones.' },
  { path: 'updates/', heading: 'Signals from the build.' },
] as const;

const navigation = [
  { label: 'Home', path: '' },
  { label: 'Game', path: 'game/' },
  { label: 'Engine', path: 'engine/' },
  { label: 'Roadmap', path: 'roadmap/' },
  { label: 'Updates', path: 'updates/' },
] as const;

for (const route of primaryRoutes) {
  test(`${route.path || 'home'} renders its content and navigation`, async ({
    page,
  }) => {
    const response = await page.goto(route.path);

    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { level: 1, name: route.heading }),
    ).toBeVisible();

    const primaryNav = page.getByRole('navigation', {
      name: 'Primary navigation',
    });

    for (const item of navigation) {
      await expect(
        primaryNav.getByRole('link', { name: item.label }),
      ).toHaveAttribute('href', `${basePath}${item.path}`);
    }
  });
}

test('internal resources and links preserve the GitHub Pages base path', async ({
  page,
}) => {
  await page.goto('');

  const resourcePaths = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .map((entry) => new URL(entry.name).pathname),
  );

  expect(resourcePaths.length).toBeGreaterThan(0);
  for (const path of resourcePaths) {
    expect(path.startsWith('/SolProject-website/')).toBe(true);
  }

  const internalHrefs = await page
    .locator('a[href^="/SolProject-website/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));

  expect(internalHrefs.length).toBeGreaterThan(5);
  for (const href of internalHrefs) {
    expect(href?.startsWith('/SolProject-website/')).toBe(true);
  }
});

test('keyboard users can reach and use the skip link', async ({ page }) => {
  await page.goto('');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
});

const mobileRoutes = [
  ...primaryRoutes.map(({ path }) => path),
  'updates/playable-galaxy-to-production-tools/',
] as const;

for (const path of mobileRoutes) {
  test(`${path || 'home'} keeps mobile navigation and content in the viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);

    const primaryNav = page.getByRole('navigation', {
      name: 'Primary navigation',
    });
    for (const item of navigation) {
      await expect(
        primaryNav.getByRole('link', { name: item.label }),
      ).toBeVisible();
    }

    const hasOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
}

test('a published update is listed and has a generated detail page', async ({
  page,
}) => {
  await page.goto('updates/');
  const updateLink = page.getByRole('link', {
    name: 'From a playable galaxy to a production toolchain',
    exact: true,
  });
  await expect(updateLink).toHaveAttribute(
    'href',
    `${basePath}updates/playable-galaxy-to-production-tools/`,
  );

  await updateLink.click();
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'From a playable galaxy to a production toolchain',
    }),
  ).toBeVisible();
});

for (const path of [
  '',
  'game/',
  'updates/playable-galaxy-to-production-tools/',
]) {
  test(`${path || 'home'} has no serious or critical axe violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const severeViolations = results.violations.filter(({ impact }) =>
      ['serious', 'critical'].includes(impact ?? ''),
    );

    expect(severeViolations).toEqual([]);
  });
}
