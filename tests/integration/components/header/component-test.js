import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | header', function (hooks) {
  setupRenderingTest(hooks);

  module('when there are no items selected', function () {
    test('label displays none selected', async function (assert) {
      this.selectedItemsIds = [];
      this.noop = () => {};

      await render(hbs`
        <Header
          @selectedItemsIds={{this.selectedItemsIds}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert.dom('[data-test-header-select]').hasText('None Selected');
    });

    test('download button is disabled', async function (assert) {
      this.selectedItemsIds = [];
      this.noop = () => {};

      await render(hbs`
        <Header
          @selectedItemsIds={{this.selectedItemsIds}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert
        .dom('[data-test-download-button]')
        .hasText('Download Selected')
        .hasAttribute('disabled');
    });
  });

  module('when there are items selected', function () {
    test('label displays the number of items selected', async function (assert) {
      this.selectedItemsIds = [1, 2];
      this.noop = () => {};

      await render(hbs`
        <Header
          @selectedItemsIds={{this.selectedItemsIds}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert.dom('[data-test-header-select]').hasText('Selected 2');
    });

    test('download button is not disabled', async function (assert) {
      this.selectedItemsIds = [1, 2];
      this.noop = () => {};

      await render(hbs`
        <Header
          @selectedItemsIds={{this.selectedItemsIds}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert
        .dom('[data-test-download-button]')
        .hasText('Download Selected')
        .doesNotHaveAttribute('disabled');
    });
  });

  module('checkbox', function () {
    test('is checked when `isAllSelected` is true', async function (assert) {
      this.noop = () => {};

      await render(hbs`
        <Header
          @isAllSelected={{true}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert.dom('[data-test-header-select-checkbox]').isChecked();
    });

    test('is not checked when `isAllSelected` is false', async function (assert) {
      this.noop = () => {};

      await render(hbs`
        <Header
          @isAllSelected={{false}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert.dom('[data-test-header-select-checkbox]').isNotChecked();
    });

    test('is indeterminate when `isSomeSelected` is true', async function (assert) {
      this.noop = () => {};

      await render(hbs`
        <Header
          @isSomeSelected={{true}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert
        .dom('[data-test-header-select-checkbox]')
        .hasClass(/.*indeterminate/);
    });

    test('is not indeterminate when `isSomeSelected` is false', async function (assert) {
      this.noop = () => {};

      await render(hbs`
        <Header
          @isSomeSelected={{false}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      assert
        .dom('[data-test-header-select-checkbox]')
        .doesNotHaveClass(/.*indeterminate/);
    });
  });

  module('actions', function () {
    test('`toggleSelectAll` is called', async function (assert) {
      this.noop = () => {};
      this.toggleSelectAll = sinon.spy();

      await render(hbs`
        <Header
          @toggleSelectAll={{this.toggleSelectAll}}
          @downloadSelectedItems={{this.noop}}
        />
      `);

      await click('[data-test-header-select-checkbox]');

      assert.true(this.toggleSelectAll.calledOnce);
    });

    test('`downloadSelectedItems` is called', async function (assert) {
      this.selectedItems = [{ id: 1 }, { id: 2 }];
      this.noop = () => {};
      this.downloadSelectedItems = sinon.spy();

      await render(hbs`
        <Header
          @selectedItemsIds={{array '1' '2'}}
          @selectedItems={{this.selectedItems}}
          @toggleSelectAll={{this.noop}}
          @downloadSelectedItems={{this.downloadSelectedItems}}
        />
      `);

      await click('[data-test-download-button]');

      assert.true(this.downloadSelectedItems.calledOnce);
      assert.deepEqual(
        this.downloadSelectedItems.getCalls()[0].args[0],
        this.selectedItems
      );
    });
  });
});
