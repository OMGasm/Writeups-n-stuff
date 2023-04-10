---
created: 2023-03-16T23:28:21+10:00
updated: 2023-03-17T00:45:27+10:00
---
# Intro
The first thing I did when I saw this challenge was wonder what the 'TOCTOU' tag meant. So I looked it up:
## Time-of-check to time-of-use
TL;DR it appears to be a case where if you check that you can open a file *before you open it*, you actually make yourself vulnerable to a bait and switch attack
Wikipedia has a handy simplified POC for how this works:
![toctou code example](attachments/Pasted%20image%2020230317002951.png)
# Exploration
![](attachments/Pasted%20image%2020230316232720.png)
Now, it turns out there's only really 3 lines of code we're really interested in. (simplified, [original source](#appendix))
```cpp
// Check the file's status information. (includes ownership)
if (stat(filename.c_str(), &statbuf) == -1) {
  //exit with error
}

// does the file's owner currently (not) match your user?
if (statbuf.st_uid != getuid()) {
  //exit with error
}

// Read the contents of the file.
if (file.is_open()) {
  // >>> output the file contents <<< :)
} else { 
  //exit with error
}
```

![flag get](attachments/Pasted%20image%2020230317002537.png)

---
# appendix
```cpp
#include <iostream>
#include <fstream>
#include <unistd.h>
#include <sys/stat.h>

int main(int argc, char *argv[]) {
  if (argc != 2) {
    std::cerr << "Usage: " << argv[0] << " <filename>" << std::endl;
    return 1;
  }

  std::string filename = argv[1];
  std::ifstream file(filename);
  struct stat statbuf;

  // Check the file's status information.
  if (stat(filename.c_str(), &statbuf) == -1) {
    std::cerr << "Error: Could not retrieve file information" << std::endl;
    return 1;
  }

  // Check the file's owner.
  if (statbuf.st_uid != getuid()) {
    std::cerr << "Error: you don't own this file" << std::endl;
    return 1;
  }

  // Read the contents of the file.
  if (file.is_open()) {
    std::string line;
    while (getline(file, line)) {
      std::cout << line << std::endl;
    }
  } else {
    std::cerr << "Error: Could not open file" << std::endl;
    return 1;
  }

  return 0;
}```