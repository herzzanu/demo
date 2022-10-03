import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | files-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the header and rows', async function (assert) {
    this.items = [
      {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        id: 2,
        name: 'netsh.exe',
        device: 'Luigi',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ];
    this.selectedItems = [this.items[0]];
    this.noop = () => {};

    await render(hbs`
      <FilesTable
        @items={{this.items}}
        @selectedItems={{this.selectedItems}}
        @selectedItemsIds={{array 1}}
        @toggleSelectItem={{this.noop}}
      />
    `);

    assert.dom('[data-test-name]').hasText('Name');
    assert.dom('[data-test-device]').hasText('Device');
    assert.dom('[data-test-path]').hasText('Path');
    assert.dom('[data-test-status]').hasText('Status');
    assert.dom('[data-test-row]').exists({ count: 2 });
  });

  test('it calls `toggleSelectItem` with expected arguments', async function (assert) {
    this.items = [
      {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        id: 2,
        name: 'netsh.exe',
        device: 'Luigi',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
    ];
    this.selectedItems = [this.items[0]];
    this.toggleSelectItem = sinon.spy();

    await render(hbs`
      <FilesTable
        @items={{this.items}}
        @selectedItems={{this.selectedItems}}
        @selectedItemsIds={{array 1}}
        @toggleSelectItem={{this.toggleSelectItem}}
      />
    `);

    await click('[data-test-row="0"] [data-test-select-item]');

    assert.true(this.toggleSelectItem.calledOnce);
    assert.strictEqual(this.toggleSelectItem.getCalls()[0].args[0], 1);
  });
});
