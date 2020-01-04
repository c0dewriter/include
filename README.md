<p align="center">
    <a href="https://github.com/c0dewriter/include-nodejs">
        <img src="https://img.shields.io/npm/v/include-nodejs?color=informational" />
    </a>
    <a href="https://github.com/c0dewriter/include-nodejs/issues">
        <img src="https://img.shields.io/github/issues/c0dewriter/include-nodejs" />
    </a>
    <a href="https://github.com/c0dewriter/include-nodejs/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/c0dewriter/include-nodejs?color=important"/>
    </a>
    <a href="#">
        <img src="https://img.shields.io/badge/Platforms-Linux%20|%20MacOS-important" />
    </a>
    <a href="https://travis-ci.org/c0dewriter/include-nodejs">
        <img src="https://img.shields.io/travis/c0dewriter/include-nodejs"/>
    </a>
</p>  

Motivation 
=====================
Refactoring **everything** without breaking some is hard.  
[@include](https://www.npmjs.com/package/include-nodejs) is a lightweight, small, and 
convenient module designed solely to make 
importing local libraries easy and most importantly, flexible in case it's ever needed.   
Imagine having the following `lib` directory at version 0.2:
```bash
lib/
├── common
│   ├── ask-q.js
│   ├── print.js
│   └── shutdown.js
├── hierarchy
│   └── carveFromJSON.js
├── manager
│   ├── index.js
│   ├── map-interpreter.js
│   └── sanity-check.js
├── print.js
└── templates
    └── Q
        ├── database.json
        └── yesOrNo.js

5 directories, 10 files

```
And, for reasons, you had to change the entire `lib`'s structure for version 0.9.0-alpha.  
You've come a long way since version 0.2. Your codebase has grown **much** bigger and you're using plenty more libraries than you did before.  
So how do you adjust every `require("path_to_lib")` with the new folder structure?
 - Use the refactoring tools built into your Editor / IDE?  
 - Find and Replace every instance? (hopefully not)

In my humble opinion, these are messy and not really professional.  
That's the reason why [@include](https://www.npmjs.com/package/include-nodejs) was born

Quick Start
=====================
### Install
```node
>>> npm install --save include-nodejs
```

Or, you know:
```node
>>> npm i include-nodejs
```

### Setup
Create a `.includemap` at the root of your project like so:  
```node
{
  "_LIBROOT": "/unix/style/abspath/to/project/lib",
  "_MAP": {
    "common":     "$_LIBROOT/common",
    "templates":  "$_LIBROOT/templates",
    
    "get-os": "$common/get-os.js",
  }
}
```

### Check setup
```node
>>> npx include check
```

Or, you know:     
```node
// Include the script in your `package.json`
{
  "scripts": {
    "include": "include"
  }
}
```

And then run:   
```node
$ npm run include check
```

Either way, green is good.

### Use
```node
// file: project/src/index.js
const include = require("include-nodejs");

const getOS = include("$get-os");

function isRunningDos() {
  if ( getOS() === "windows" )
    return true;
}

......

// file: project/src/cli/schema
const include = require("include-nodejs");

const QnA = include("$templates/q-n-a.js");
// ...
```

How it works
=====================
### .includemap
Simple. It reads a JSON-formatted file named `.includemap` from the working directory of the current node process 
(which is likely the root of the project unless intentionally changed).    
Using our example [lib](#motivation), this would be a valid **.includemap**:
```node
{
  "_LIBROOT": "/home/watermelon/Work/Github/watermelon-reborn/lib",

  "_MAP": {
    "print": "$_LIBROOT/print.js",

    "common":     "$_LIBROOT/common",
    "hierarchy":  "$_LIBROOT/hierarchy",
    "manager":    "$_LIBROOT/manager",
    "templates":  "$_LIBROOT/templates",
    "QTemplates": "$templates/Q",
    "QDatabase":  "$QTemplates/database.json",

    "ask-q":    "$common/ask-q.js",
    "print":    "$common/print.js",
    "shutdown": "$common/shutdown.js",

    "carveFromJSON": "$hierarchy/carveFromJSON.js",

    "map-interpreter": "$manager/map-interpreter",
    "sanity-check":    "$manager/sanity-check"
  }
}
```
> I am well aware of the limits which I'm putting on the project because of its design.
> I have plans to remove them, and make @include much more flexible when I have the time (checkout my Wishlist below).

#### Explanation
- `_MAP` is where you map keywords to paths.
- Each entry can reference another by using a `$` sign.
- `_LIBROOT` is required. It's the absolute path to your library root.

---

### include()
The first (and only) argument is the string to be translated:  
```node
const print = include("$print");
// or
const print = include("$common/print.js");

const print = include("print") // raises MODULE_NOT_FOUND
```
#### Explanation
- The `$` prefix indicates a keyword.
- The translator treats each keyword as something to be read from `.includemap`.
- The translator loop-translates the string looking for keywords until there are none left.


Wishlist
=====================
- [X] Add a CLI interface.
- [ ] Add a CLI library mapper for convenience.
- [ ] Support Windows (Oh c'mon! Do I have to?)
- [ ] Support multiple include maps for different work environments.
- [ ] Support multiple library roots.
- [ ] Support loading libraries from another server.
