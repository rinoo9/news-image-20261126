// news-image-20261126 — entry runner (Node 22, standard library only).
//
// What this program does, in one sentence: it takes the finished front-page
// image that ships next to this file (`entry.png`) and places a verified copy
// at `<output>/entry.png`, refusing to write anything that fails the checks.
//
// The checks live in validateEntry() and verifyOutput() below, so the entry
// is inspected twice: once before the copy (is the source a genuine
// 1024x1024 PNG under the 1 MiB cap?) and once after it (did the exact same
// bytes land on disk?). Nothing here touches the network, the clock, or any
// random source, so two runs over the same input produce the same bytes.
//
// Run it outside the grader like this:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Inside the grader, MAKEFUN_OUTPUT_DIR is unset and the target is /output.

import { createHash } from "node:crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

// The bounty gate, spelled out as constants so a reader can see the rules
// without hunting through the code.
const PNG_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
const MAX_BYTES = 1024 * 1024; // 1 MiB

const ENTRY_NAME = "entry.png";
const SOURCE_URL = new URL(`./${ENTRY_NAME}`, import.meta.url);
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const TARGET_PATH = join(OUTPUT_DIR, ENTRY_NAME);

interface EntryReport {
  width: number;
  height: number;
  bytes: number;
  sha256: string;
}

function sha256Hex(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function fail(message: string): never {
  throw new Error(`entry validation failed: ${message}`);
}

// validateEntry() — inspect a candidate entry image in memory and either
// return a report describing it or throw with the first problem found.
//
// The checks, in order:
//   1. the file exists and is a regular file (not a directory, not missing);
//   2. it starts with the eight-byte PNG signature;
//   3. its first chunk is IHDR, whose big-endian width/height fields sit at
//      byte offsets 16 and 20 and must read exactly 1024 x 1024;
//   4. the whole file fits under the 1 MiB bounty cap.
// A report is returned only when every check passes, so callers can treat a
// returned report as proof the image is a legal entry.
function validateEntry(): EntryReport {
  if (!existsSync(SOURCE_URL)) {
    fail(`${ENTRY_NAME} is missing next to main.ts`);
  }
  const info = statSync(SOURCE_URL);
  if (!info.isFile()) {
    fail(`${ENTRY_NAME} is not a regular file`);
  }
  if (info.size === 0) {
    fail(`${ENTRY_NAME} is empty`);
  }

  const data = readFileSync(SOURCE_URL);
  if (data.length < 33) {
    fail(`${ENTRY_NAME} is only ${data.length} bytes, too short to be a PNG`);
  }
  if (!data.subarray(0, 8).equals(PNG_MAGIC)) {
    fail(`${ENTRY_NAME} does not start with the PNG signature`);
  }
  const firstChunk = data.toString("ascii", 12, 16);
  if (firstChunk !== "IHDR") {
    fail(`first PNG chunk is ${firstChunk}, expected IHDR`);
  }

  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    fail(
      `${ENTRY_NAME} is ${width}x${height}, ` +
        `expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
    );
  }
  if (data.length > MAX_BYTES) {
    fail(
      `${ENTRY_NAME} is ${data.length} bytes, over the ${MAX_BYTES} byte cap`,
    );
  }

  return {
    width,
    height,
    bytes: data.length,
    sha256: sha256Hex(data),
  };
}

// verifyOutput() — after the copy, re-read the written file and prove it is
// byte-identical to the validated source: same length and same SHA-256 hash.
// A mismatch means the copy was truncated or corrupted, and the run must not
// report success.
function verifyOutput(expected: EntryReport): void {
  if (!existsSync(TARGET_PATH)) {
    fail(`${TARGET_PATH} was not written`);
  }
  const written = readFileSync(TARGET_PATH);
  if (written.length !== expected.bytes) {
    fail(
      `wrote ${written.length} bytes to ${TARGET_PATH}, ` +
        `expected ${expected.bytes}`,
    );
  }
  const actualHash = sha256Hex(written);
  if (actualHash !== expected.sha256) {
    fail(
      `${TARGET_PATH} hash ${actualHash} does not match ` +
        `source hash ${expected.sha256}`,
    );
  }
}

function run(): void {
  const report = validateEntry();

  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(SOURCE_URL, TARGET_PATH);
  verifyOutput(report);

  console.log(
    `wrote ${TARGET_PATH} (${report.width}x${report.height}, ` +
      `${report.bytes} bytes, sha256 ${report.sha256})`,
  );
}

run();
