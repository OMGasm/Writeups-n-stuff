---
created: 2022-05-26T23:02:29+10:00
updated: 2022-05-27T18:59:31+10:00
---
# Meow
[[enumeration]] [[telnet]] [[external]]
- [x] connect to starting point vpn
- [x] spawn machine
1. [x] what does `VM` stand for
    - `virtual machine`
2. [x] What tool do we use to interact with the operating system in order to issue commands via the command line, such as the one to start our VPN connection? It's also known as a console or shell.
    - `terminal`
3. [x] What service do we use to form our VPN connection into HTB labs?
    - `openvpn`
4. [x] What is the abbreviated name for a 'tunnel interface' in the output of your VPN boot-up sequence output?
    - `tun0`
5. [x] What tool do we use to test our connection to the target with an ICMP echo request?
    - `ping`
6. [x] What is the name of the most common tool for finding open ports on a target?
    - `nmap`
7. [x] What service do we identify on port 23/tcp during our scans?
    - `telnet`
8. [x] What username is able to log into the target over telnet with a blank password?
    - `root`
    - initially had issues because of latency, so i messed up loggin at first lmao
9. [x] Submit root flag
    - `b40abdfe23665f766f9c61ecba8a4c19`

# Fawn
[[external]] [[enumeration]] [[ftp]]
1. [x] What does the 3-letter acronym FTP stand for?
    - `file transfer protocol`
2. [x] What communication model does FTP use, architecturally speaking?
    - `client-server`
    - ~~or `server-client`~~
3. [x] What is the name of one popular GUI FTP program?
    - `filezilla`
4. [x] Which port is the FTP service active on usually?
    - `21 tcp`
    - oops forgot tcp
5. [x] What acronym is used for the secure version of FTP?
    - `sftp`
    - maybe `ftps`
6. [x] What is the command we can use to test our connection to the target?
    - maybe `nc`, `ftp`
    - oh, just `ping`
7. [x] From your scans, what version is FTP running on the target?
    - `vsftpd 3.0.3`
8. [x] From your scans, what OS type is running on the target?
    - `linux`
9. [x] Submit Flag
    - telnet $TARGET
    - (a couple attempts at logging in without knowing what i'm doing, and a failed attempt at logging in as root)
        - USER anonymous
        - PASS anonymous
    - HELP
    - LIST
        - also a couple failed attempt at ls/dir
    - PASV /
    - LIST
        - *looked up using ftp over telnet*
    - PASV /
        - (142, 102)
        - $142*256+102 = 36454$
    - telnet $TARGET 36454
    - LIST
        - flag.txt
    - PASV /
        - 
    - RETR flag.txt
        - `035db21c881520061c53e0536e44f815`

## Thoughts
don't do FTP(over telnet) it's a pain in the ass

# Dancing
1. [x] What does the 3-letter acronym SMB stand for?
    - `server message block`
2. [x] What port does SMB use to operate at?
    - `445`
3. [x] What network communication model does SMB use, architecturally speaking?
    - probably `client-server model`
4. [x] What is the service name for port 445 that came up in our nmap scan?
    - `microsoft-ds`
5. [x] What is the tool we use to connect to SMB shares from our Linux distribution?
    - `smbclient`
6. [x] What is the `flag` or `switch` we can use with the SMB tool to `list` the contents of the share?
    - `-L`
7. [x] What is the name of the share we are able to access in the end?
    - `workshares`
8. [x] What is the command we can use within the SMB shell to download the files we find?
    - `get`
    - thank god the shell provides help
9. [x] Submit Flag
    - `5f61c10dffbc77a704d76016a22f1664`
# Redeemer
[[linux]] [[redis]] [[enumeration]] [[anon access]]
1. [x] Which TCP port is open on the machine?
    - `6379`
2. [x] Which service is running on the port that is open on the machine?
    - `redis`
3. [x] What type of database is Redis? Choose from the following options: (i) In-memory Database, (ii) Traditional Database
    - `in-memory database`
4. [x] Which command-line utility is used to interact with the Redis server? Enter the program name you would enter into the terminal without any arguments.
    - `redis-cli`
5. [x] Which flag is used with the Redis command-line utility to specify the hostname?
    - `-h`
6. [x] Once connected to a Redis server, which command is used to obtain the information and statistics about the Redis server?
    - `info`
7. [x] What is the version of the Redis server being used on the target machine?
    - `5.0.7`
8. [x] Which command is used to select the desired database in Redis?
    - `select`
    - tbh just guessed it
9. [x] How many keys are present inside the database with index 0?
    - `4`
    - couldn't figure out the command so i had to use a hint :(
    - probably should looked it up in the first place(or pay attention to the info output)
10. [x] Which command is used to obtain all the keys in a database?
    - `keys *`
    - ok why was this one so easy because i couldn't figure out how to use the pattern before
11. [x] Submit Flag
    - `03e1d2b376c37ab3f5319922053953eb`

## Thoughts
A touch more challenging, but only because i'm unfamiliar with using redis, so my reliance on the builtin help was a little much

# Explosion

# Preignition