[![news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# news-image-20261126 — The World in One Day: Thursday, 26 November 2026

An entry for the make.fun bounty
[Sum up 26 November's world news in one image](https://make.fun/bounty/news-image-20261126).
The program writes a single image that sums up the world's news of Thursday,
26 November 2026 to `/output/entry.png`.

## The image

The entry is a newspaper front page — **THE WORLD IN ONE DAY — THURSDAY,
26 NOVEMBER 2026** — built from the day's verified lead stories:

- **SPACE — Pakistan's first astronaut reaches China's space station.**
  Shenzhou-24 docked with Tiangong on 25 November. Muhammad Zeeshan Ali, 40,
  is the first Pakistani in orbit and the first foreign visitor to the
  station. (Reuters, Nature, 25 Nov 2026)
- **UKRAINE WAR — Leaked records: at least 490,334 Russian soldiers killed.**
  An analysis by BBC Russian / Mediazona of Russia's own Rosstat death
  registers puts the toll near half a million — far above anything Moscow
  admits. (BBC Russian, Le Monde, 25 Nov 2026)
- **CARTAGENA — All 20 hostages freed from a supermarket siege** after a
  17-hour standoff. (Reuters/AFP, 25 Nov 2026)
- **WASHINGTON — US set to unveil a new tariffs plan;** consumer confidence
  hits a near two-year high.
- **GAZA — Israeli strike kills a security official and family.**
- **MERCURY — A probe reaches Mercury after eight years** (a joint
  Japanese-European mission).

The ticker along the foot of the page also records Colombia's 10 years since
its historic peace deal, Mumbai's 18 years since the 26/11 attacks,
Venezuela's $237.5bn public-debt reveal, and Brazil's Petrobras $122bn
investment plan.

## How it works

`compose.py` (Pillow) draws the front page — masthead, lead story with a
freshly generated photo of the Shenzhou-24 launch, the Russia death-toll
headline, and four illustrated story panels — and saves it as `entry.png`
(1024×1024, under 1 MiB).

`main.ts` (Node 22, standard library only) is the entry runner: it copies
`entry.png` to `/output/entry.png` — or to `$MAKEFUN_OUTPUT_DIR` outside the
grader — but only after the image passes validation, and it re-checks the
written file afterwards. See "How it is validated" below.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## How it is validated

`main.ts` validates the entry twice, through two functions:

- `validateEntry()` runs before anything is written. It checks that
  `entry.png` exists and is a regular, non-empty file, that it starts with
  the eight-byte PNG signature, that its first chunk is `IHDR`, that the
  width and height fields in that chunk read exactly 1024×1024, and that the
  file fits under the 1 MiB (1,048,576 byte) cap. It returns a report with
  the width, height, byte size, and SHA-256 hash of the image — and throws
  with a plain-language reason at the first check that fails, so a bad entry
  can never be written out silently.
- `verifyOutput()` runs after the copy. It re-reads the file that was just
  written and compares its byte length and SHA-256 hash against the report
  from `validateEntry()`. If the copy was truncated or corrupted, the run
  fails instead of reporting success.

The run prints the destination path, the dimensions, the byte size, and the
SHA-256 hash, e.g. `wrote out/entry.png (1024x1024, 228991 bytes, sha256 …)`.

## Determinism check

The runner uses no network, no clock, and no randomness: the same input
bytes are copied to the output on every run. To confirm, run it twice into
two different directories and compare hashes:

```sh
mkdir -p out1 out2
MAKEFUN_OUTPUT_DIR=out1 node main.ts
MAKEFUN_OUTPUT_DIR=out2 node main.ts
sha256sum out1/entry.png out2/entry.png
```

Both hashes must be identical — the two outputs are byte-for-byte the same
file. If they ever differ, something in the pipeline has become
non-deterministic and the entry must not be submitted until it is fixed.

## Sources

Reuters, Nature, BBC Russian / Mediazona, Le Monde, AFP — all stories as
published 25–26 November 2026.
