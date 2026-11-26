// news-image-20261126 entry, round 2 (Node 22, standard library only).
// The entry image lives beside this file as entry.png; the program copies
// it to /output/entry.png and verifies it meets the bounty gate before
// and after writing: a whole PNG, 1024 by 1024 pixels, at most 1 MiB
// (1048576 bytes), and the written copy byte-identical to the source.
// No network, no randomness: the same input bytes are written every run.
//
// Round 2: the front page is "THE WORLD IN ONE DAY" for Thursday
// 26 November 2026 with all-new stories — Trump unveils tariffs on 14
// trading partners (lead), Ukraine hits five warplanes at Savasleyka,
// Cairo tanker fire, the 100th Macy's parade, the Ras Tanura strike,
// and Russia's record military budget. Drawn by compose.py (Pillow).
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The program has no flags: the only input is the image beside it
// and the optional MAKEFUN_OUTPUT_DIR, so both runs write the same bytes.
const MAX_BYTES = 1048576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

const src = new URL("./entry.png", import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

const bytes = readFileSync(src);

// PNG signature: 89 50 4E 47 0D 0A 1A 0A
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (bytes.length < 33 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a PNG file (bad signature)");
}

// IHDR chunk: width and height are big-endian uint32 at offsets 16 and 20.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(
    `entry.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
  );
}

if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Prove the written copy is byte-identical to the validated source,
// and that it still parses as the same PNG (signature + dimensions).
const written = readFileSync(dst);
if (!written.equals(bytes)) {
  throw new Error("written entry.png differs from the validated source");
}
if (
  written.length < 33 ||
  !written.subarray(0, 8).equals(PNG_SIGNATURE) ||
  written.readUInt32BE(16) !== EXPECTED_WIDTH ||
  written.readUInt32BE(20) !== EXPECTED_HEIGHT
) {
  throw new Error("written entry.png failed re-validation");
}
console.log(`wrote ${dst} (${width}x${height}, ${written.length} bytes)`);
