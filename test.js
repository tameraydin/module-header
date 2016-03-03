import test from 'ava';
import header from './index';
import fs from 'fs';

const TEMP_FILE = '_temp';

test.before(async () => {
  await fs.openSync(TEMP_FILE, 'w');
});

// test.after(async () => {
//  s = await createServer();
// });

test('should append a header', async t => {
  await header(TEMP_FILE, {'name': 'test'});
  let contents = await fs.readFileSync(TEMP_FILE);

  t.true(contents.toString().indexOf('test') > 0);
});