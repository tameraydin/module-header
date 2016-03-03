import test from 'ava';
import mkdirp from 'mkdirp';
import header from './index';
import fs from 'fs';

const TEMP_FOLDER = './tmp';
const TEMP_FILE = TEMP_FOLDER + '/_temp';

test.before(async () => {
  await mkdirp(TEMP_FOLDER)
  await fs.openSync(TEMP_FILE, 'w');
});

test.after(async () => {
  await fs.unlinkSync(TEMP_FILE);
  await fs.rmdirSync(TEMP_FOLDER);
});

test('should append a header', async t => {
  await header(TEMP_FILE, {'name': 'test'});

  let contents = await fs.readFileSync(TEMP_FILE);
  t.true(contents.indexOf('test') > 0);
});