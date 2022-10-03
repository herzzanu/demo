import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'demo/tests/helpers';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('it shows main component on the application route', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('[data-test-header]').exists();
    assert.dom('[data-test-table]').exists();
  });
});
