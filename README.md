[![news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# news-image-20261126 — The World in One Day: Thursday, 26 November 2026

A make.fun entry for the bounty
[Sum up 26 November's world news in one image](https://make.fun/bounty/news-image-20261126):
a program that writes one image summing up the world's news of Thursday
26 November 2026 to `/output/entry.png`.

## The image

A newspaper front page, **THE WORLD IN ONE DAY — THURSDAY, 26 NOVEMBER 2026**,
built from the day's verified lead stories:

- **SPACE — Pakistan's first astronaut reaches China's space station.**
  Shenzhou-24 docked with Tiangong on 25 November; Muhammad Zeeshan Ali, 40,
  is the first Pakistani in orbit and the first foreign visitor to the
  station. (Reuters, Nature, 25 Nov 2026)
- **UKRAINE WAR — Leaked records: at least 490,334 Russian soldiers killed.**
  BBC Russian / Mediazona analysis of Russia's own Rosstat death registers
  puts the toll near half a million — far above anything Moscow admits.
  (BBC Russian, Le Monde, 25 Nov 2026)
- **CARTAGENA — All 20 hostages freed from supermarket siege** after a
  17-hour standoff. (Reuters/AFP, 25 Nov 2026)
- **WASHINGTON — US set to unveil new tariffs plan;** consumer confidence
  hits a near two-year high.
- **GAZA — Israeli strike kills security official and family.**
- **MERCURY — Probe reaches Mercury after eight years** (joint
  Japanese-European mission).

The ticker at the foot of the page also notes Colombia's 10 years since its
historic peace deal, Mumbai's 18 years since the 26/11 attacks, Venezuela's
$237.5bn public debt reveal, and Brazil's Petrobras $122bn investment plan.

## How it works

`compose.py` (Pillow) draws the front page: masthead, lead story with a
freshly generated photo of the Shenzhou-24 launch, the Russia death-toll
headline, and four illustrated story panels, and saves it as `entry.png`
(1024×1024, under 1 MiB).

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` — or `$MAKEFUN_OUTPUT_DIR` outside the grader — and
verifies the PNG signature, the 1024×1024 dimensions, and the 1 MiB cap
before writing, failing loudly otherwise.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sources

Reuters, Nature, BBC Russian / Mediazona, Le Monde, AFP — all stories as
published 25–26 November 2026.
