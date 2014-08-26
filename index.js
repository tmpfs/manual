var util = require('util');
var EOL = require('os').EOL;
var SECTION = 1;

var sections = [
  "User Commands",
  "System Calls",
  "Library Functions",
  "Special Files",
  "File Formats",
  "Games",
  "Miscellanea",
  "System Administration"
];

var layout = [
  'name',
  'synopsis',
  'description',
  'commands',
  'options',
  'environment',
  'files',
  'examples',
  'exit',
  'history',
  'author',
  'bugs',
  'copyright',
  'see'
];

var constants = {};

layout.forEach(function(key) {
  var value = '' + key;
  key = key.toUpperCase();
  module.exports[key] =
    constants[key] = value;
});

var headers = {
  synopsis: 'usage',
  arguments: 'arguments',
  see: 'see also'
};

var elements = {
  th: '.TH "%s" "%s" "%s" "%s" "%s"' + EOL,
  sh: '.SH "%s"' + EOL,
  ss: '.SS "%s"' + EOL,
  sp: '.SP' + EOL,
  b: '.B ',
  pp: '.PP' + EOL + '%s' + EOL,
  tp: '.TP' + EOL,
  ti: '.TI' + EOL,
  fb: '\\fB',
  fi: '\\fI',
  fr: '\\fR',
  lt: '.LT' + EOL + '%s' + EOL,
  bl: '.BL' + EOL,
  it: '.IP "\\[ci]" 4' + EOL + '%s' + EOL,
  el: '.EL' + EOL,
  br: '.br' + EOL,
  comment: '.\\" %s' + EOL
};

function match(value) {
  return /^[1-8]$/.test('' + value);
}

function ends(value) {
  return /[1-8]$/.test('' + value);
}

function section(value) {
  var index = parseInt(value);
  if(isNaN(index)) index = 1;
  return sections[index - 1];
}

function header(key) {
  var value = headers[key] || constants[key.toUpperCase()] || '';
  return value ? value.toUpperCase() : key;
}

// strip file extension .1 or (1)
function strip(value) {
  if(!value) return value;
  value = value.replace(/\.[0-9]$/, '');
  return value.replace(/\([0-9]+\)$/, '')
}

/**
 *  Gets the preamble for a man page.
 *
 *  @param options The preamble options.
 *  @param options.title The document title.
 *  @param options.version A version number.
 *  @param options.date Document generation date.
 *  @param options.section The man section number (1-8).
 *  @param options.comment A comment string.
 *  @param options.name A name that indicates the name section should be
 *  added.
 *  @param options.description A short description to go aside the name.
 */
function preamble(opts) {
  var str = '';
  var index = opts.section || SECTION;
  var date = opts.date || new Date().toISOString();
  var version = opts.version || '1.0';
  // section name
  var sname = section(index);
  var title = opts.title || opts.name;
  if(!title) {
    throw new TypeError('manual preamble requires a name or title');
  }

  // use comment
  if(opts.comment) {
    str += util.format(elements.comment, opts.comment);
  }

  str += util.format(
    elements.th, strip(title.toUpperCase()).replace(/\s+.*$/, ''),
    index, date,
    (strip(opts.name || title)).replace(/\s+.*$/, '') + ' ' + version, sname);

  // add name section
  if(opts.name) {
    var name = strip(opts.name);
    str += util.format(elements.sh, header(constants.NAME));
    if(opts.description) {
      str += util.format('%s \\- %s' + EOL, name, opts.description);
    }else{
      str += util.format('%s' + EOL, name);
    }
  }
  return str;
}

function sanitize(value) {
  value = value.replace(/\\\n/gm, '\\e\n');
  value = value.replace(/-/gm, '\\-');
  //value = value.replace(/\\/, '\e');
  value = value.replace(/\r?\n/gm, EOL + elements.br);
  return value;
}

module.exports.SECTION = SECTION;
module.exports.constants = constants;
module.exports.sanitize = sanitize;
module.exports.section = section;
module.exports.sections = sections;
module.exports.layout = layout;
module.exports.headers = headers;
module.exports.elements = elements;
module.exports.match = match;
module.exports.ends = ends;
module.exports.header = header;
module.exports.preamble = preamble;
module.exports.strip = strip;
