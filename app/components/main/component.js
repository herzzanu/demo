import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MainComponent extends Component {
  @action
  downloadSelectedItems(items) {
    let availableItems = items
      .filter(({ status }) => status === 'available')
      .map((item) => `${item.path} - ${item.device}`);

    window.alert(availableItems);
  }
}
