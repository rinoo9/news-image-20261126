// news-image-20261126 entry (Node 22, standard library only).
// The entry image lives beside this file as entry.png. The program copies
// it to /output/entry.png and verifies it meets the bounty gate first:
// a real PNG, 1024 by 1024 pixels, at most 1 MiB (1048576 bytes).
// No network, no randomness: the same input bytes are written every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

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
const written = statSync(dst).size;
if (written !== bytes.length) {
  throw new Error(`wrote ${written} bytes, expected ${bytes.length}`);
}
console.log(`wrote ${dst} (${width}x${height}, ${written} bytes)`);
