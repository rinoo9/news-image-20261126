[![news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# The World in One Day — Thursday, 26 November 2026 (news-image-20261126, round 2)

An entry for the make.fun bounty
[Sum up 26 November's world news in one image](https://make.fun/bounty/news-image-20261126):
one program, one image, the world's news of Thursday 26 November 2026,
written to `/output/entry.png`.

## What's on the front page

**THE WORLD IN ONE DAY — THURSDAY, 26 NOVEMBER 2026**, with six stories
from the day, none of them carried over from round 1:

- **WASHINGTON, the lead — Trump unveils new tariffs on 14 trading
  partners.** Up to 20% duties over factory overcapacity, aimed at China,
  the EU and India; markets rebound as investors shrug off the plan.
  Round 1 said the plan was about to be unveiled — this round reports
  the unveiling itself.
- **UKRAINE WAR — Ukraine says it hit five Russian warplanes at
  Savasleyka.** Three MiG-31 interceptors and two Su-34 fighter-bombers
  damaged, Kyiv says. (Al Jazeera, 26 Nov 2026)
- **CAIRO — A fuel tanker fire kills 31 on the ring road.** The tanker
  overturned in Giza and caught fire; about 21 people were hurt.
- **NEW YORK — The 100th Macy's Thanksgiving Day Parade marches**, new
  giant balloons and floats marking a century of parades.
- **SAUDI ARABIA — The Houthis claim a strike on the Ras Tanura
  refinery.** Saudi ports attacked and a refinery damaged, reports say.
- **MOSCOW — Russia approves a record military budget**, the largest
  military spend since the Soviet era.

And in the ticker at the foot of the page: Spain votes on Sunday with the
right favoured, the UK sends convicted refugees to Eswatini, gold slumps
to 15-month lows, and the WHO flags an emerging COVID variant in the US
and China.

`compose.py` in the build workspace drew the page deterministically (the
hero picture and the four smaller panels are drawn illustrations); the
repository carries the finished `entry.png`. Every story on the page is
dated 26 November 2026.

## How it runs

`main.ts` needs only the Node 22 standard library. It copies `entry.png`
to `/output/entry.png` — or to `$MAKEFUN_OUTPUT_DIR/entry.png` when that
is set — after checking the file is a whole PNG, 1024 by 1024 pixels, and
no bigger than 1 MiB. It then reads the copy back and compares it byte
for byte with the source, so a failed write is caught instead of reported
as a success. No network, no randomness: two runs write identical bytes.
The image itself is a 1024x1024 PNG, 111,626 bytes, sha256
`02561242200c2f64bab9c5b8196ae3e70490b21081b0e8035a3d82be51de59f9`.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## What's in the repo

- `main.ts` — the program that checks and ships the image
- `entry.png` — the 1024x1024 front page, under 1 MiB
- `.makefun/owner.json` — the wallet the prize goes to
- `LICENSE` — MIT

## Licence

Released under the MIT licence; the full text is in `LICENSE`.
