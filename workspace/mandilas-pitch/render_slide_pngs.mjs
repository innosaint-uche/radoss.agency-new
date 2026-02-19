#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const htmlDir = '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/workspace/mandilas-pitch/slides-html';
const outDir = '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/tmp/pdfs/slides-png';
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(htmlDir)
  .filter((x) => x.endsWith('.html'))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });

for (const f of files) {
  const abs = path.join(htmlDir, f);
  await page.goto(`file://${abs}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, f.replace('.html', '.png')) });
}

await browser.close();
console.log(`Rendered ${files.length} PNG slides to ${outDir}`);
