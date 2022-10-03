import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | capitalize', function (hooks) {
  setupRenderingTest(hooks);

  test('it capitalizes a string', async function (assert) {
    await render(hbs`{{capitalize "hello"}}`);

    assert.dom(this.element).hasText('Hello');
  });
});
