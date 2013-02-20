const test = require('tap').test;
const validator = require('..');

function sha(string, salt) {
  const hasher = require('crypto').createHash('sha256');
  hasher.update('brian@mozillafoundation.org' + (salt||''));
  return 'sha256$' + hasher.digest('hex');
}

function objReplace(obj, dotString, value) {
  const keys = dotString.split('.');
  const target = keys.pop();
  const ref = keys.reduce(function (obj, key) {
    if (obj[key])
      return obj[key]
    return (obj[key] = {});
  }, obj);
  ref[target] = value;
  return ref;
}

function oldBadge(replacements) {
  replacements = replacements || {};
  const badge = {
    recipient: sha('brian@mozillafoundation.org', 'seasalt'),
    salt: 'seasalt',
    evidence: 'https://example.org',
    expires: '2013-06-06',
    issued_on: '2013-01-01',
    badge: {
      version: '0.5.0',
      criteria: '/criteria',
      image: '/image.png',
      name: 'Some Awesome Badge',
      description: 'This is a description',
      issuer: {
        origin: 'https://example.org',
        name: 'Example',
        org: 'Organization',
        contact: 'guy@example.org',
      },
    },
  };
  Object.keys(replacements).forEach(function (dotString) {
    const value = replacements[dotString];
    objReplace(badge, dotString, value);
  });
  return badge;
}

const BAD_STRINGS = [
  ['not', 'a', 'string'],
  { not: 'a string' },
];
const GOOD_STRINGS = [
  'OH', 'hey'
];
const BAD_EMAILS = [
  'lkajd',
  'skj@asdk',
  '@.com',
  '909090',
  '____!@',
];
const GOOD_EMAILS = [
  'brian@awesome.com',
  'yo+wut@example.com',
  'ümlaut@heavymetal.de',
];
const GOOD_HASHES = [
  'sha1$c0b19425e0f2c8021ab06c79b19144e127b0f2cb',
  'sha256$406f04039d10c79c070b26781e8246dc01ed1d0453c5ad0fa705ff7d507fd898'
];
const BAD_HASHES = [
  'sha1stuff',
  'bcrypt$5$something'
];
const GOOD_URLS = [
  'http://example.com/',
  'https://example.com/w/yo',
  '/partial/path',
  '/rad.awesome/great/',
  '/foreign/crázy/ååú´¨la/'
];
const BAD_URLS = [
  '-not-asdo',
  'ftp://bad-scheme',
  '@.com:90/',
  'just totally wrong'
];
const GOOD_TIMES = [
  Date.now()/1000 | 0,
  '2012-01-01'
];
const BAD_TIMES = [
  'oiajsd09gjas;oj09',
  'foreever ago',
  '@.com:90/',
  '2001-10-190-19',
  '901d1',
  '000000000000000000000'
];

const VALID =  {
  recipient: [GOOD_EMAILS, GOOD_HASHES],
  salt: [GOOD_STRINGS],
  evidence: [GOOD_URLS],
  expires: [GOOD_TIMES],
  issued_on: [GOOD_TIMES],
};
const INVALID = {
  recipient: [BAD_STRINGS, BAD_EMAILS, BAD_HASHES],
  salt: [BAD_STRINGS],
  evidence: [BAD_STRINGS, BAD_URLS],
  expires: [BAD_STRINGS, BAD_TIMES],
  issued_on: [BAD_STRINGS, BAD_TIMES],
};

function flatten(arry) {
  return arry.reduce(function (coll, intArr) {
    return coll.concat(intArr);
  }, []);
}

function testInvalid(field) {
  flatten(INVALID[field]).forEach(function (val) {
    test('0.5.0 badges: invalid '+field+' ("'+val+'")', function (t) {
      const replacement = {};
      replacement[field] = val;
      const badge = oldBadge(replacement);
      const result = validator.structure(badge);
      t.same(result.length, 1, 'should one errors');
      t.same(result[0].field, field, 'should be `'+field+'` error');
      t.end();
    });
  });
}

function testValid(field) {
  flatten(VALID[field]).forEach(function (val) {
    test('0.5.0 badges: valid '+field+' ("'+val+'")', function (t) {
      const replacement = {};
      replacement[field] = val;
      const badge = oldBadge(replacement);
      const result = validator.structure(badge);
      t.same(result.length, 0, 'should no errors');
      t.end();
    });
  });
}

test('0.5.0 badges: no errors', function (t) {
  const badge = oldBadge();
  const result = validator.structure(badge);
  t.same(result.length, 0, 'should have zero errors');
  t.end();
});

testInvalid('recipient'); testValid('recipient');
testInvalid('salt'); testValid('salt');
testInvalid('evidence'); testValid('evidence');
testInvalid('expires'); testValid('expires');
testInvalid('issued_on'); testValid('issued_on');
testInvalid('badge'); testInvalid('badge');