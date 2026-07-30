import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const documentUrl = new URL('../flatland.html', import.meta.url);
const html = await readFile(documentUrl, 'utf8');
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function openingTags(name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}

function attribute(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = tag.match(new RegExp(`\\b${escapedName}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? null;
}

function elementById(name, id) {
  return openingTags(name).find((tag) => attribute(tag, 'id') === id);
}

check(/^\s*<!doctype html>/i.test(html), 'flatland.html must start with an HTML5 doctype.');

const htmlTag = openingTags('html')[0];
check(htmlTag && attribute(htmlTag, 'lang'), 'The document must declare a language.');

const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
check(titleMatches.length === 1 && titleMatches[0][1].trim(), 'The document must contain one non-empty title.');

const viewport = openingTags('meta').find((tag) => attribute(tag, 'name')?.toLowerCase() === 'viewport');
check(Boolean(viewport), 'The document must contain viewport metadata.');

const expectedCanvases = [
  { id: 'view', width: '800', height: '120' },
  { id: 'map', width: '800', height: '500' },
];

for (const expected of expectedCanvases) {
  const canvas = elementById('canvas', expected.id);
  check(Boolean(canvas), `Missing canvas #${expected.id}.`);
  if (canvas) {
    check(attribute(canvas, 'width') === expected.width, `Canvas #${expected.id} must be ${expected.width} pixels wide.`);
    check(attribute(canvas, 'height') === expected.height, `Canvas #${expected.id} must be ${expected.height} pixels high.`);
  }
}

check(Boolean(elementById('div', 'help')), 'Missing the #help instructions panel.');
check(!/<script\b[^>]*\bsrc\s*=/i.test(html), 'The application must remain free of external script files.');
check(!/<link\b[^>]*\brel\s*=\s*(["'])stylesheet\1/i.test(html), 'The application must remain free of external stylesheets.');

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
check(scripts.length === 1, 'The document must contain exactly one inline script.');

if (scripts.length === 1) {
  try {
    new vm.Script(scripts[0][1], { filename: 'flatland.html:inline-script' });
  } catch (error) {
    errors.push(`Inline JavaScript does not parse: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error('Flatland checks failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Flatland checks passed: document structure and inline JavaScript are valid.');
}
