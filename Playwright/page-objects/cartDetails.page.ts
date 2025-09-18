import { Item } from "./Item";

export class cartDetailsPage {
    selectedItems: Item[] = [];

    checkItemsInCart(selectedItems: Item[]): boolean {
        let allItemsPresent = true;
        for (const item of selectedItems) {
            const itemInCart = this.selectedItems.find(cartItem => cartItem.name === item.name && cartItem.price === item.price);
            if (!itemInCart) {
                allItemsPresent = false;
                break;
            }
        }
        return allItemsPresent;
    }
}
