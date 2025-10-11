import type { Item } from "./schemas/item";
import { foodItems } from "./items/food";
import { foodIngredientItems } from "./items/foodIngredients";
import { materialItems } from "./items/materials";
import { metalProcessingItems } from "./items/processing/metal";
import { woodProcessingItems } from "./items/processing/wood";
import { leatherProcessingItems } from "./items/processing/leather";
import { fabricProcessingItems } from "./items/processing/fabric";
import { medicineProcessingItems } from "./items/processing/medicine";
import { foodProcessingItems } from "./items/processing/food";
import { potionItems } from "./items/potions";
import { consumableItems } from "./items/consumable";
import { otherItems } from "./items/other";
import { currencyItems } from "./items/currency";

export const items: Item[] = [
  ...foodItems,
  ...foodIngredientItems,
  ...materialItems,
  ...metalProcessingItems,
  ...woodProcessingItems,
  ...leatherProcessingItems,
  ...fabricProcessingItems,
  ...medicineProcessingItems,
  ...foodProcessingItems,
  ...potionItems,
  ...consumableItems,
  ...otherItems,
  ...currencyItems,
];
