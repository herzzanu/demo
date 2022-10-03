import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | equal', function (hooks) {
  setupRenderingTest(hooks);

  test('it compares strings, numbers and booleans', async function (assert) {
    await render(
      hbs`[{{equal 'abc' 'abc'}}][{{equal 'abc' 'def'}}][{{equal 2 2}}][{{equal 2 3}}][{{equal true true}}][{{equal true false}}]`
    );

    assert.equal(
      this.element.textContent,
      '[true][false][true][false][true][false]'
    );
  });
});
