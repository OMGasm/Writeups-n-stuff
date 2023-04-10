---
created: 2023-03-16T22:23:38+10:00
updated: 2023-03-16T22:38:30+10:00
---
![initial directory listing](attachments/Pasted%20image%2020230316222255.png)
![server.py contents](attachments/Pasted%20image%2020230316222603.png)
![ping not found](attachments/Pasted%20image%2020230316222818.png)
![yep, ping not found](attachments/Pasted%20image%2020230316223107.png)
## rabbit hole
Next I went looking for binaries with the setuid bit
`ll /usr/bin`
![programs with setuid](attachments/Pasted%20image%2020230316223655.png)
Unfortunately everything was fairly normal.
Then I tried 
`export PATH=/home/picoctf:$PATH`
`cp /usr/bin/su ./ping`
