import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectorComponent extends Component {
  @tracked selectedItemsIds = [];

  get selectedItems() {
    return this.args.items.filter((item) =>
      this.selectedItemsIds.includes(item.id)
    );
  }

  get isAllSelected() {
    return (
      this.selectedItems.length > 0 &&
      this.selectedItems.length === this.args.items.length
    );
  }

  get isSomeSelected() {
    return this.selectedItems.length > 0 && !this.isAllSelected;
  }

  @action
  toggleSelectItem(itemId) {
    let newItems = [];

    if (this.selectedItemsIds.includes(itemId)) {
      newItems = this.selectedItemsIds.filter((id) => itemId !== id);
    } else {
      newItems = [...this.selectedItemsIds, itemId];
    }

    this.selectedItemsIds = newItems;
  }

  @action
  toggleSelectAll() {
    let newItems = [];

    if (this.isAllSelected) {
      newItems = [];
    } else {
      newItems = this.args.items.map(({ id }) => id);
    }

    this.selectedItemsIds = newItems;
  }
}
