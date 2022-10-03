import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders header and row items', async function (assert) {
    this.items = ['a', 'b'];

    await render(hbs`
      <Table @items={{this.items}}>
        <:header>
          <div data-test-header>Header</div>
        </:header>

        <:row as |item index|>
          <div data-test-item={{index}}>{{item}}</div>
        </:row>
      </Table>
    `);

    assert.dom('[data-test-header]').hasText('Header');
    assert.dom('[data-test-item]').exists({ count: 2 });
    assert.dom('[data-test-item="0"]').hasText('a');
    assert.dom('[data-test-item="1"]').hasText('b');
  });
});
