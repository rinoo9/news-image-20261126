// news-image-20261126, round 2.
// This program ships the front page (entry.png) to the output directory.
// It refuses to write anything it has not checked first: the file must be
// a PNG, exactly 1024 by 1024, no bigger than 1 MiB. After copying it
// reads the copy back and compares it byte for byte with the source, so a
// partial or corrupted write is caught before the run reports success.
//
// The page itself is "THE WORLD IN ONE DAY" for Thursday 26 November 2026:
// tariffs lead, Savasleyka second, then Cairo, Macy's, Ras Tanura and the
// Russian budget. The picture was drawn by compose.py (Pillow) in the
// build workspace; the repository carries the finished PNG.
//
// Run it like this (MAKEFUN_OUTPUT_DIR stands in for /output outside the
// grader's container):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "entry.png";
const LIMIT = 1 << 20; // 1 MiB
const WANT_W = 1024;
const WANT_H = 1024;

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// A failed check stops the run with a plain error message; there is no
// fallback image and no partial output.
function die(message: string): never {
  throw new Error(message);
}

function checkPng(buf: Buffer): { width: number; height: number } {
  if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
    die(`${ENTRY} is not a PNG file`);
  }
  // In the IHDR chunk the width and height sit at offsets 16 and 20,
  // stored big-endian.
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (width !== WANT_W || height !== WANT_H) {
    die(`${ENTRY} is ${width}x${height}, want ${WANT_W}x${WANT_H}`);
  }
  if (buf.length > LIMIT) {
    die(`${ENTRY} is ${buf.length} bytes, over the 1 MiB limit`);
  }
  return { width, height };
}

const here = new URL(`./${ENTRY}`, import.meta.url);
const source = readFileSync(here);
const { width, height } = checkPng(source);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, ENTRY);
mkdirSync(outDir, { recursive: true });
copyFileSync(here, target);

// The copy must match the checked source byte for byte, and still parse
// as the same PNG — otherwise the run fails instead of claiming success.
const copy = readFileSync(target);
if (!copy.equals(source)) {
  die(`the copy of ${ENTRY} does not match the source`);
}
checkPng(copy);
console.log(`wrote ${target} (${width}x${height}, ${copy.length} bytes)`);
