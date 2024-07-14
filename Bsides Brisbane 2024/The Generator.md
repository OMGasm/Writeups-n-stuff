---
created: 2024-07-14T14:51
updated: 2024-07-14T15:36
---
# The Generator
todo: find actual description
tldr: the user forgot their password to an encrypted file, and they used some password generator with "20 characters and all the options ticked".

## The "user" way
After a moment of faffing about with the virtual desktop and a couple random guesses of the password I realised the date in the properties for the file actually meaningful (it was some time around 2013/07/03 08:??:?? UTC (todo: find date)), and so it was clear the password generator was going to be time based.

A quick dive in the source code on the page later, the password generator in fact uses JS's `Date.now()` divided by 1000 (to get the current second (since 1970) from the resulting unix timestamp). At first I just tried parsing the given date and storing it in a variable `d`, and patched `Date.now` to just return the value of `d`, and then just repeatedly generating passwords,copying them into the password field, hoping it would work, and otherwise just subtracting 1000 from `d`. Rinse and repeat.

## The "node" way
After overhearing a competing team mention something about making a loop in their browser for that challenge (thanks Jackson 😁) I realised I could just see what the generator/validation forms are actually doing and just extract their code, and pop it into a loop (which turned out to be calls to `generateCustomPassword` with all the parameters, and `decryptText` with the text (encrypted of course, and stored in a script on the webpage)), and the password as parameters.

A few minutes of ~~dev tools->Debugger->save as~~ extracting the necessary functions, rewriting a number of calls to `window.crypto` to use `node:crypto`, and writing a couple auxiliary functions later, I had a :fire: Blazingly Fast:tm: way to generate passwords and attempt to decrypt the file. All I had to do next was chuck it in a loop and wait.

aside: thanks for the rickroll in `crypto.js`, author :)

## Profit
```
...
1341306994000
1341306993000
flag{I_w1sh_it_was_Crypt0}
```
~~i don't~~

Another aside: This thing felt oddly similar to a talk/article I had heard about a while ago to do with an old password generator and some hardware wallet thing.
Aside++: Wow ok. (it was fun though)
![](attachments/Pasted%20image%2020240714153552.png)

[solve script](generator_solve.js)
