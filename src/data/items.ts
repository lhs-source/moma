import type { Item } from "./schemas/item";
import { foodItems } from "./items/food";
import { foodIngredientItems } from "./items/foodIngredients";
import { materialItems } from "./items/materials";
import { potionItems } from "./items/potions";
import { otherItems } from "./items/other";
import { currencyItems } from "./items/currency";

export const items: Item[] = [
  ...foodItems,
  ...foodIngredientItems,
  ...materialItems,
  ...potionItems,
  ...otherItems,
  ...currencyItems,
];
