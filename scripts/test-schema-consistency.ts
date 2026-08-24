import assert from 'node:assert/strict';
import {
  CONTACT_PAGE_BUSINESS_ENTITY,
  MASTER_BUSINESS_ENTITY,
} from '../src/utils/centralizedSchemas';

assert.deepEqual(
  CONTACT_PAGE_BUSINESS_ENTITY.geo,
  MASTER_BUSINESS_ENTITY.geo,
  'ContactPage and master business schemas must use the same coordinates',
);

assert.equal(
  CONTACT_PAGE_BUSINESS_ENTITY.hasMap,
  MASTER_BUSINESS_ENTITY.hasMap,
  'ContactPage and master business schemas must use the same canonical place URL',
);

console.log('Schema location consistency check passed.');
