/**
 * sync.mjs — one command to update all destinations:
 *   1. build:forge ? forge.inerate.com/atelier/docs   ? forge-site/public/atelier/docs
 *   2. build:gh    ? inerate.github.io/atelier/docs   ? inerate.github.io/atelier/docs
 */
import { execSync } from 'child_process';
import { cpSync, rmSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, 'dist');
const forgeTarget = resolve(__dirname, '../forge-site/public/atelier/docs');
const ghTarget = resolve(__dirname, '../inerate.github.io/atelier/docs');

// 1. Build for forge.inerate.com/atelier/docs
console.log('\n? Building for forge.inerate.com/atelier/docs ...');
execSync('pnpm run build:forge', { stdio: 'inherit', cwd: __dirname });
rmSync(forgeTarget, { recursive: true, force: true });
cpSync(dist, forgeTarget, { recursive: true });
console.log('? Copied to forge-site/public/atelier/docs');

// 2. Build for inerate.github.io/atelier/docs
console.log('\n? Building for inerate.github.io/atelier/docs ...');
execSync('pnpm run build:gh', { stdio: 'inherit', cwd: __dirname });
rmSync(ghTarget, { recursive: true, force: true });
mkdirSync(ghTarget, { recursive: true });
cpSync(dist, ghTarget, { recursive: true });
console.log('? Copied to inerate.github.io/atelier/docs');

console.log('\n? All destinations synced.\n');
