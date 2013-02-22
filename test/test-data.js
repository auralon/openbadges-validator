with (require('./test-data.json')) {
  module.exports = {
    '0.5.0': {
      valid: {
        'recipient': [EMAILS.good, HASHES.good],
        'salt': [STRINGS.good],
        'evidence': [URLS.good],
        'expires': [TIMES.good],
        'issued_on': [TIMES.good],
        'badge': [OBJECTS.good],
        'badge.version': [VERSIONS.good],
        'badge.name': [STRINGS.good],
        'badge.description': [STRINGS.good],
        'badge.image': [URLS.good],
        'badge.criteria': [URLS.good],
        'badge.issuer': [OBJECTS.good],
        'badge.issuer.name': [STRINGS.good],
        'badge.issuer.contact': [EMAILS.good],
        'badge.issuer.origin': [ORIGINS.good],
        'badge.issuer.org': [STRINGS.good],
      },
      invalid: {
        'recipient': [STRINGS.bad, EMAILS.bad, HASHES.bad],
        'salt': [STRINGS.bad],
        'evidence': [STRINGS.bad, URLS.bad],
        'expires': [STRINGS.bad, TIMES.bad],
        'issued_on': [STRINGS.bad, TIMES.bad],
        'badge': [OBJECTS.bad],
        'badge.version': [STRINGS.bad, VERSIONS.bad],
        'badge.name': [STRINGS.bad],
        'badge.description': [STRINGS.bad],
        'badge.image': [STRINGS.bad, URLS.bad],
        'badge.criteria': [STRINGS.bad, URLS.bad],
        'badge.issuer': [OBJECTS.bad],
        'badge.issuer.name': [STRINGS.bad],
        'badge.issuer.contact': [STRINGS.bad, EMAILS.bad],
        'badge.issuer.origin': [STRINGS.bad, ORIGINS.bad],
        'badge.issuer.org': [STRINGS.bad],
      }
    },
    '1.0.0-assertion': {
      valid: {
        'uid': [STRINGS.good],
        'recipient': [OBJECTS.good],
        'recipient.type': [IDENTITY_TYPES.good],
        'recipient.hashed': [BOOLEANS.good],
        'recipient.salt': [STRINGS.good],
        'recipient.identity': [STRINGS.good],
        'verify': [OBJECTS.good],
        'verify.type': [VERIFY_TYPES.good],
        'verify.url': [ABSOLUTE_URLS.good],
        'badge': [ABSOLUTE_URLS.good],
        'issuedOn': [TIMES.good, ISO8601.good],
        'expires': [TIMES.good, ISO8601.good],
        'evidence': [ABSOLUTE_URLS.good],
        'image': [ABSOLUTE_URLS.good, IMAGE_DATA_URLS.good],
      },
      invalid: {
        'uid': [STRINGS.bad],
        'recipient': [OBJECTS.bad],
        'recipient.type': [STRINGS.bad, IDENTITY_TYPES.bad],
        'recipient.hashed': [STRINGS.bad, BOOLEANS.bad],
        'recipient.salt': [STRINGS.bad],
        'recipient.identity': [STRINGS.bad],
        'verify': [OBJECTS.bad],
        'verify.type': [STRINGS.bad, VERIFY_TYPES.bad],
        'verify.url': [STRINGS.bad, ABSOLUTE_URLS.bad],
        'badge': [ABSOLUTE_URLS.bad],
        'issuedOn': [STRINGS.bad, TIMES.bad, ISO8601.bad],
        'expires': [STRINGS.bad, TIMES.bad, ISO8601.bad],
        'evidence': [STRINGS.bad, ABSOLUTE_URLS.bad],
        'image': [STRINGS.bad, ABSOLUTE_URLS.bad, IMAGE_DATA_URLS.bad],
      }
    },
    '1.0.0-badge': {
      valid: {
        name: [STRINGS.good],
        description: [STRINGS.good],
        image: [ABSOLUTE_URLS.good, IMAGE_DATA_URLS.good],
        criteria: [ABSOLUTE_URLS.good],
        issuer: [ABSOLUTE_URLS.good],
        alignment: [ALIGNMENTS.good],
        tags: [TAGLIST.good],
      },
      invalid: {
        name: [STRINGS.bad],
        description: [STRINGS.bad],
        image: [STRINGS.bad, ABSOLUTE_URLS.bad, IMAGE_DATA_URLS.bad],
        criteria: [STRINGS.bad, ABSOLUTE_URLS.bad],
        issuer: [STRINGS.bad, ABSOLUTE_URLS.bad],
        alignment: [ALIGNMENTS.bad],
        tags: [TAGLIST.bad],
      }
    },
  };
}
