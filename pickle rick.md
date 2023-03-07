---
created: 2022-09-16T00:41:22+10:00
updated: 2022-09-16T05:30:02+10:00
---
# Pickle Rick
inspected main page, got a note on the username `R1ckRul3s`
ran dirbuster against the site, didn't get any significant results other than `robots.txt` and `/assets`.
remembered a friend who was saying that they should always try robots because it so often has something useful hidden away in there in CTF challenges. indeed, there was `Wubbalubbadubdub`. tried this as a couple urls and didn't get anywhere.
decided to try `/assets` where some of the images were hosted and it had a directory listing, `portal.jpg` seemed interesting and made me think to try `/portal.php`. bingo
immediately tried using `R1ckRul3s` and `Wubbalubbadubdub` as the user/pass. again, bingo
a command panel? OwO, what's this?
`ls` o3o
`cat Sup3rS3cretPickl3Ingred.txt` ... command disabled
thought about a previous ctf with command filtering (in particular it would remove certain letters and you had to double up some of them), but thought that approach wouldn't be the right one here so i thought about trying ways of somehow combining strings into a command that wouldn't be filtered. tried a couple things on a local shell before landing on `'c''at'`
`'c''at' Sup3rS3cretPickl3Ingred.txt`: mr meeseek hair :o
`clue.txt`: look around the filesystem
explored the filesystem a bit
`/home/rick/second ingredient`, jerry tear
found `/home/ubuntu`. noticed there was a .ssh, some bash history, and some sudo successful
first two were a dead end, but then tried sudo, looks like it had NOPASSWD:ALL or something configured
neither user had any more useful info. tried sudo ls /root. `3rd.txt`, opened that, bam, got myself some fleeb juice
## Ingredients
1. `mr. meeseek hair`
2. `1 jerry tear`
3. `fleeb juice`