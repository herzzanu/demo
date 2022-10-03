import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | files-table/row', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a row with the item data', async function (assert) {
    this.item = {
      id: 1,
      name: 'smss.exe',
      device: 'Mario',
      path: '\\smss.exe',
      status: 'scheduled',
    };

    this.noop = () => {};

    await render(hbs`
      <FilesTable::Row
        @item={{this.item}}
        @toggleSelectItem={{this.noop}}
      />
    `);

    assert.dom('[data-test-item-name]').hasText('smss.exe');
    assert.dom('[data-test-item-device]').hasText('Mario');
    assert.dom('[data-test-item-path]').hasText('\\smss.exe');
    assert.dom('[data-test-status]').hasText('Scheduled');
  });

  module('status indicator', function () {
    test('has `success` class when status is `available`', async function (assert) {
      this.item = {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\smss.exe',
        status: 'available',
      };

      this.noop = () => {};

      await render(hbs`
        <FilesTable::Row
          @item={{this.item}}
          @toggleSelectItem={{this.noop}}
        />
      `);

      assert.dom('[data-test-status-indicator]').hasClass(/.*success/);
    });

    test('has `warning` class when status is `scheduled`', async function (assert) {
      this.item = {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\smss.exe',
        status: 'scheduled',
      };

      this.noop = () => {};

      await render(hbs`
        <FilesTable::Row
          @item={{this.item}}
          @toggleSelectItem={{this.noop}}
        />
      `);

      assert.dom('[data-test-status-indicator]').hasClass(/.*warning/);
    });
  });

  module('checkbox', function () {
    test('is checked when `isSelected` is `true`', async function (assert) {
      this.item = {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\smss.exe',
        status: 'scheduled',
      };

      this.noop = () => {};

      await render(hbs`
        <FilesTable::Row
          @item={{this.item}}
          @isSelected={{true}}
          @toggleSelectItem={{this.noop}}
          data-test-row
        />
      `);

      assert.dom('[data-test-row]').hasClass(/.*selected/);
      assert.dom('[data-test-select-item]').isChecked();
    });

    test('is not checked when `isSelected` is `false`', async function (assert) {
      this.item = {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\smss.exe',
        status: 'scheduled',
      };

      this.noop = () => {};

      await render(hbs`
        <FilesTable::Row
          @item={{this.item}}
          @isSelected={{false}}
          @toggleSelectItem={{this.noop}}
          data-test-row
        />
      `);

      assert.dom('[data-test-row]').doesNotHaveClass(/.*selected/);
      assert.dom('[data-test-select-item]').isNotChecked();
    });
  });

  test('it calls `toggleSelectItem` with the expected item id', async function (assert) {
    this.item = {
      id: 1,
      name: 'smss.exe',
      device: 'Mario',
      path: '\\smss.exe',
      status: 'scheduled',
    };

    this.toggleSelectItem = sinon.spy();

    await render(hbs`
      <FilesTable::Row
        @item={{this.item}}
        @toggleSelectItem={{this.toggleSelectItem}}
      />
    `);

    await click('[data-test-select-item]');

    assert.true(this.toggleSelectItem.calledOnce);
    assert.strictEqual(this.toggleSelectItem.getCalls()[0].args[0], 1);
  });
});
