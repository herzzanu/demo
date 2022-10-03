import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | selector', function (hooks) {
  setupRenderingTest(hooks);

  test('it yields the items', async function (assert) {
    this.items = [{ id: 1 }, { id: 2 }];

    await render(hbs`
      <Selector @items={{this.items}} as |selector|>
        {{#each selector.items as |item index|}}
          <div data-test-item={{index}}>{{item.id}}</div>
        {{/each}}
      </Selector>
    `);

    assert.dom('[data-test-item]').exists({ count: 2 });
    assert.dom('[data-test-item="0"]').hasText('1');
    assert.dom('[data-test-item="1"]').hasText('2');
  });

  test('it toggles selecting an item', async function (assert) {
    this.items = [{ id: 1 }, { id: 2 }];

    await render(hbs`
      <Selector @items={{this.items}} as |selector|>
        {{#each selector.items as |item index|}}
          <label data-test-item={{index}}>
            <input type='checkbox' {{on 'input' (fn selector.toggleSelectItem item.id)}} />
            {{item.id}}
          </label>
        {{/each}}

        {{#each selector.selectedItems as |item index|}}
          <div data-test-selected-item={{index}}>{{item.id}}</div>
        {{/each}}

        {{#each selector.selectedItemsIds as |item index|}}
          <div data-test-selected-item-id={{index}}>{{item}}</div>
        {{/each}}

        <div data-test-some-selected>{{selector.isSomeSelected}}</div>
      </Selector>
    `);

    assert.dom('[data-test-item]').exists({ count: 2 });
    assert.dom('[data-test-item="0"]').hasText('1');
    assert.dom('[data-test-selected-item]').doesNotExist();
    assert.dom('[data-test-selected-item-id]').doesNotExist();
    assert.dom('[data-test-some-selected]').hasText('false');

    await click('[data-test-item="0"]');

    assert.dom('[data-test-selected-item]').exists({ count: 1 });
    assert.dom('[data-test-selected-item-id]').exists({ count: 1 });
    assert.dom('[data-test-selected-item="0"]').hasText('1');
    assert.dom('[data-test-selected-item-id="0"]').hasText('1');
    assert.dom('[data-test-some-selected]').hasText('true');

    await click('[data-test-item="0"]');

    assert.dom('[data-test-selected-item]').doesNotExist();
    assert.dom('[data-test-some-selected]').hasText('false');
  });

  test('it toggles selecting all items', async function (assert) {
    this.items = [{ id: 1 }, { id: 2 }];

    await render(hbs`
      <Selector @items={{this.items}} as |selector|>
        <input type='checkbox' {{on 'input' selector.toggleSelectAll}} data-test-select-all />

        {{#each selector.items as |item|}}
          <div data-test-item>{{item.id}}</div>
        {{/each}}

        {{#each selector.selectedItems as |item|}}
          <div data-test-selected-item>{{item.id}}</div>
        {{/each}}

        <div data-test-all-selected>{{selector.isAllSelected}}</div>
      </Selector>
    `);

    assert.dom('[data-test-item]').exists({ count: 2 });
    assert.dom('[data-test-selected-item]').doesNotExist();
    assert.dom('[data-test-all-selected]').hasText('false');

    await click('[data-test-select-all]');

    assert.dom('[data-test-selected-item]').exists({ count: 2 });
    assert.dom('[data-test-all-selected]').hasText('true');

    await click('[data-test-select-all]');

    assert.dom('[data-test-selected-item]').doesNotExist();
    assert.dom('[data-test-all-selected]').hasText('false');
  });
});
