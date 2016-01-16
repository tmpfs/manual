manual
======

Functions and constants for man page generation.

[<img src="https://travis-ci.org/tmpfs/manual.svg" alt="Build Status">](https://travis-ci.org/tmpfs/manual)
[<img src="http://img.shields.io/npm/v/manual.svg" alt="npm version">](https://npmjs.org/package/manual)
[<img src="https://coveralls.io/repos/tmpfs/manual/badge.svg?branch=master&service=github&v=1" alt="Coverage Status">](https://coveralls.io/github/tmpfs/manual?branch=master).

Used by the [command](https://github.com/cli-kit/cli-command) module and the [mdp](https://github.com/tmpfs/mdp) program.

## Install

```
npm i manual
```

Constants are shown below see [index.js](https://github.com/tmpfs/manual/blob/master/index.js) for function definitions.

```javascript
{
  "NAME": "name",
  "SYNOPSIS": "synopsis",
  "DESCRIPTION": "description",
  "COMMANDS": "commands",
  "OPTIONS": "options",
  "ENVIRONMENT": "environment",
  "FILES": "files",
  "EXAMPLES": "examples",
  "EXIT": "exit",
  "HISTORY": "history",
  "AUTHOR": "author",
  "BUGS": "bugs",
  "COPYRIGHT": "copyright",
  "SEE": "see",
  "SECTION": 1,
  "constants": {
    "NAME": "name",
    "SYNOPSIS": "synopsis",
    "DESCRIPTION": "description",
    "COMMANDS": "commands",
    "OPTIONS": "options",
    "ENVIRONMENT": "environment",
    "FILES": "files",
    "EXAMPLES": "examples",
    "EXIT": "exit",
    "HISTORY": "history",
    "AUTHOR": "author",
    "BUGS": "bugs",
    "COPYRIGHT": "copyright",
    "SEE": "see"
  },
  "sections": [
    "User Commands",
    "System Calls",
    "Library Functions",
    "Special Files",
    "File Formats",
    "Games",
    "Miscellanea",
    "System Administration"
  ],
  "layout": [
    "name",
    "synopsis",
    "description",
    "commands",
    "options",
    "environment",
    "files",
    "examples",
    "exit",
    "history",
    "author",
    "bugs",
    "copyright",
    "see"
  ],
  "headers": {
    "synopsis": "usage",
    "arguments": "arguments",
    "see": "see also"
  },
  "elements": {
    "th": ".TH \"%s\" \"%s\" \"%s\" \"%s\" \"%s\"\n",
    "sh": ".SH \"%s\"\n",
    "ss": ".SS \"%s\"\n",
    "sp": ".SP\n",
    "b": ".B ",
    "pp": ".PP\n%s\n",
    "tp": ".TP\n",
    "ti": ".TI\n",
    "fb": "\\fB",
    "fi": "\\fI",
    "fr": "\\fR",
    "lt": ".LT\n%s\n",
    "bl": ".BL\n",
    "it": ".IP \"\\[ci]\" 4\n%s\n",
    "el": ".EL\n",
    "br": ".br\n",
    "comment": ".\\\" %s\n"
  }
}
```

## Developer

Clone the repository, install project and global dependencies ([mdp](https://github.com/tmpfs/mdp), [jshint](http://jshint.com) and [jscs](http://jscs.info)):

```
npm i && npm i -g mdp jshint jscs
```

### Test

Run the test specifications:

```
npm test
```

### Cover

Generate code coverage:

```
npm run cover
```

### Lint

Run the source tree through [jshint](http://jshint.com) and [jscs](http://jscs.info):

```
npm run lint
```

### Clean

Remove generated files:

```
npm run clean
```

### Readme

Generate the readme file (requires [mdp](https://github.com/tmpfs/mdp)):

```
npm run readme
```

## License

Everything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](https://github.com/tmpfs/manual/blob/master/LICENSE) if you feel inclined.

Generated by [mdp(1)](https://github.com/tmpfs/mdp).

[mdp]: https://github.com/tmpfs/mdp
[command]: https://github.com/cli-kit/cli-command
[jshint]: http://jshint.com
[jscs]: http://jscs.info
