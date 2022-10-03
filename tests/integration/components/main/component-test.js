import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | main', function (hooks) {
  setupRenderingTest(hooks);

  test('download does not work if there are no items selected', async function (assert) {
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

    await render(hbs`<Main @items={{this.items}} />`);

    assert.dom('[data-test-row]').exists({ count: 2 });
    assert.dom('[data-test-row="0"] [data-test-select-item]').isNotChecked();
    assert.dom('[data-test-row="1"] [data-test-select-item]').isNotChecked();
    assert.dom('[data-test-download-button]').hasAttribute('disabled');
  });

  test('it download only items with available status if there are items selected', async function (assert) {
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

    let windowSpy = sinon.stub(window, 'alert');

    await render(hbs`<Main @items={{this.items}} />`);

    assert.dom('[data-test-row]').exists({ count: 2 });
    assert.dom('[data-test-row="0"] [data-test-select-item]').isNotChecked();
    assert.dom('[data-test-row="1"] [data-test-select-item]').isNotChecked();
    assert.dom('[data-test-download-button]').hasAttribute('disabled');

    await click('[data-test-header-select-checkbox]');

    assert.dom('[data-test-row="0"] [data-test-select-item]').isChecked();
    assert.dom('[data-test-row="1"] [data-test-select-item]').isChecked();

    await click('[data-test-download-button]');

    assert.true(
      windowSpy.calledOnceWithExactly([
        '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe - Luigi',
      ])
    );
  });
});
