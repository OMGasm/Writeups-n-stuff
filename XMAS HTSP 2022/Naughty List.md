---
created: 2022-12-17T19:42:56+10:00
updated: 2022-12-17T21:07:03+10:00
---
# Intro
> PinkiePie managed to get on the Naughty List this year.  
> Use your skills to get him out of this situation and he might reward you!

In this challenge, you're the C++ source code for the naughty list, and your task is to "remove" PinkiePie from it.  
At first, it might appear impossible as there are no methods to remove any name from the list, but it's quickly evident that you actually don't need to. ;)  

# Digging deeper
The first couple lines of the program immediately give a couple clues.
```cpp
#define ELF_MAX_NAGHTY_COUNT 16
std::unordered_map<std::string, std::string> naughty_list{
    {"PinkiePie", "Very naughty"}};
```
First, there appears to be a hard-coded limit for the naughty list - only 16 names? ~~that seems optimistic ;)~~  
Second, it's using an unordered map, and these can contain unlimited\* entries.  
Third, it seems the elves really don't like Pinkie as they hard-coded him into the list.  

## Flag pls?
At this point I'd take a look at the function that gives you the flag
```cpp
void ask_pinkiepie()
{
    bool pinkiepie_naughty = false;
    auto it = naughty_list.begin();
    for (int i = 0; i < ELF_MAX_NAGHTY_COUNT; i++)
    {
        if (it->first == "PinkiePie")
        {
            pinkiepie_naughty = true;
            break;
        }
        ++it;
        if (it == naughty_list.end()) { break; }
    }
    if (pinkiepie_naughty)
    // ...
}
```
The TL;DR on the function is that it goes though the first `ELF_MAX_NAUGHTY_COUNT`  (16) items in the map and checks if PinkiePie is found anywhere in there, and only gives you the flag if he isn't.  

## Just add more names right?
Seems simple right? Just add 16 names before him!  
Maybe not as simple
```cpp
void add_to_list(const std::string &name)
{
    if (naughty_list.size() == ELF_MAX_NAGHTY_COUNT)
    {
        std::cout << "Adding this many people requires authorization from Elf "
                     "Resources.";
        return;
    }
    else
    {
        naughty_list.insert({name, "Naughty"});
    }
}
```
It checks if there's already 16 names on the list, including Pinkie, and will only add another if there's fewer than 16. Maybe we need to look elsewhere.

## It's just a simple check, right?
The only other function we haven't looked at yet is the one that checks if a name is on the list.
```cpp
bool is_naughty(const std::string &name) { return !(naughty_list[name] == ""); }
```
This simply returns `true` if the supplied name(given in the menu) is found anywhere in the list... *Or does it?*  
Maps allow "indexing" into them like an array, giving whatever underlying value is stored within, but with basically any value/type, in this case with names.  
*But*
There's a catch  
![](attachments/Pasted%20image%2020221217202943.png)
C++ devs really like to make their functions/operators super obvious as to what they do -- haha no. They thought it would be nice if whenever you queried a map in this way, it should *obviously* insert whatever you queried into the map. How generous.  

## I think we're on to something
So yeah, now we can just add as many names as we need to kick Pinkie off the front of the list, but how do we go about it?  
One might assume you can just add \[a, b, c, d...\] as they come before `P` right? Well, after a quick glance at an example provided by that website, I think it's fairly safe to assume it's "ASCIIbetical"[^1] [^2], so we'll just use uppercase instead.

![](attachments/Pasted%20image%2020221217205915.png)
We just need to do this a few times, I used the normal add in this case just to illustrate that the list is now full.  
Of course, when we try to get the flag right now, Pinkie's still there.
![](attachments/Pasted%20image%2020221217210003.png)
So let's just add another couple of names! [^3]
![](attachments/Pasted%20image%2020221217210124.png)
We did it!

Now we just need to add whichever elf wrote this thing onto the list 😏

# Solve script
```bash
python3 -c "print(*[f'2 Pa{x}' for x in range(17)], 1, sep='\n')" | nc challs.htsp.ro 8002
```

[^1]: (Basically, 'a' comes after 'P' because in [ASCII](https://en.wikipedia.org/wiki/ASCII) all the capital letters come first)
[^2]: It's technically ordered based on some kind of hash(we can mostly ignore this luckily)
[^3]: For whatever reason just 'P' and a number seems to usually come after Pinkie, so I just ran my solve script for this screenshot, which just uses 'Pa' and a number, which seems to come before thankfully