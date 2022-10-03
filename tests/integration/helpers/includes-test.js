import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | includes', function (hooks) {
  setupRenderingTest(hooks);

  test('it retuns true if a given array includes an element', async function (assert) {
    this.item = 'a';
    this.list = ['a', 'b'];

    await render(hbs`{{includes this.item this.list}}`);

    assert.equal(this.element.textContent, 'true');
  });

  test('it retuns false if a given array does not include an element', async function (assert) {
    this.item = 'c';
    this.list = ['a', 'b'];

    await render(hbs`{{includes this.item this.list}}`);

    assert.equal(this.element.textContent, 'false');
  });
});
