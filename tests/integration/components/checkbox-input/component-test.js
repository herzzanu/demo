import { module, test } from 'qunit';
import { setupRenderingTest } from 'demo/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | checkbox-input', function (hooks) {
  setupRenderingTest(hooks);

  test('is checked when `checked` argument is passed as true', async function (assert) {
    this.noop = () => {};

    await render(hbs`
      <CheckboxInput
        @checked={{true}}
        @onToggle={{this.noop}}
        data-test-checkbox
      />
    `);

    assert.dom('[data-test-checkbox]').isChecked();
  });

  test('is not checked when `checked` argument is passed as false', async function (assert) {
    this.noop = () => {};

    await render(hbs`
      <CheckboxInput
        @checked={{false}}
        @onToggle={{this.noop}}
        data-test-checkbox
      />
    `);

    assert.dom('[data-test-checkbox]').isNotChecked();
  });

  test('it has `indeterminate` class when `indeterminate` argument is `true`', async function (assert) {
    this.noop = () => {};

    await render(hbs`
      <CheckboxInput
        @indeterminate={{true}}
        @onToggle={{this.noop}}
        data-test-checkbox
      />
    `);

    assert.dom('[data-test-checkbox]').hasClass(/.*indeterminate/);
  });

  test('it does not have `indeterminate` class when `indeterminate` argument is `false`', async function (assert) {
    this.noop = () => {};

    await render(hbs`
      <CheckboxInput
        @indeterminate={{false}}
        @onToggle={{this.noop}}
        data-test-checkbox
      />
    `);

    assert.dom('[data-test-checkbox]').doesNotHaveClass(/.*indeterminate/);
  });

  test('it calls `onToggle` when clicked', async function (assert) {
    this.onToggle = () => assert.step('toggle');

    await render(hbs`
      <CheckboxInput
        @onToggle={{this.onToggle}}
        data-test-checkbox
      />
    `);

    await click('[data-test-checkbox]');

    assert.verifySteps(['toggle']);
  });

  test('it renders a label when label block is used', async function (assert) {
    this.noop = () => {};

    await render(hbs`
      <CheckboxInput @onToggle={{this.noop}}>
        <:label>Label</:label>
      </CheckboxInput>
    `);

    assert.dom('[data-test-checkbox-label]').hasText('Label');
  });

  test('it does not render a label when label block is not used', async function (assert) {
    this.noop = () => {};

    await render(hbs`
      <CheckboxInput @onToggle={{this.noop}}>
      </CheckboxInput>
    `);

    assert.dom('[data-test-checkbox-label]').doesNotExist();
  });
});
