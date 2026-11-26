[![news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/rinoo9/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126)

# news-image-20261126 — The World in One Day: Thursday, 26 November 2026 (Round 2)

A make.fun entry for the bounty
[Sum up 26 November's world news in one image](https://make.fun/bounty/news-image-20261126):
a program that writes one image summing up the world's news of Thursday
26 November 2026 to `/output/entry.png`.

## The image

A newspaper front page, **THE WORLD IN ONE DAY — THURSDAY, 26 NOVEMBER 2026**,
built from the day's verified stories — all new since round 1:

- **WASHINGTON (lead) — Trump unveils new tariffs on 14 trading partners.**
  Duties of up to 20% over factory overcapacity, aimed at China, the EU
  and India; markets rebound as investors shrug off the plan. (Round 1
  said the plan was about to be unveiled; round 2 reports the unveiling.)
- **UKRAINE WAR — Ukraine says it hit five Russian warplanes at Savasleyka.**
  Three MiG-31 interceptors and two Su-34 fighter-bombers damaged, Kyiv
  says. (Al Jazeera, 26 Nov 2026)
- **CAIRO — Fuel tanker fire kills 31 on the ring road.** A tanker
  overturned in Giza and caught fire; about 21 injured.
- **NEW YORK — 100th Macy's Thanksgiving Day Parade marches**, with new
  giant balloons and floats marking a century of parades.
- **SAUDI ARABIA — Houthis claim a strike on the Ras Tanura refinery.**
  Saudi ports attacked and a refinery damaged, reports say.
- **MOSCOW — Russia approves a record military budget**, the biggest
  military spend since the Soviet era.

Also today: Spain votes Sunday with the right favoured, the UK sends
convicted refugees to Eswatini, gold slumps to 15-month lows, and the WHO
flags an emerging COVID variant in the US and China.

The front page is composed deterministically by `compose.py` in the build
workspace (the repository holds the finished `entry.png`); the hero picture
and the four smaller panels are drawn illustrations. Every story on the
page is dated 26 November 2026 and none of them appeared in round 1.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` (or `$MAKEFUN_OUTPUT_DIR/entry.png`) and first verifies
the file is a whole PNG, 1024 by 1024 pixels, and at most 1 MiB — failing
loudly otherwise — then re-validates the written copy byte for byte. No
network, no randomness: both runs write identical bytes. The image is a
1024x1024 PNG, 111,626 bytes, sha256
`02561242200c2f64bab9c5b8196ae3e70490b21081b0e8035a3d82be51de59f9`.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entry program
- `entry.png` — the 1024x1024 front-page image (under 1 MiB)
- `.makefun/owner.json` — payout wallet for the prize
- `LICENSE` — MIT

## License

MIT — see `LICENSE`.
