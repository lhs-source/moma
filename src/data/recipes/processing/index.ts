import type { Recipe } from '../../schemas/recipe'
import { metalProcessingRecipes } from './metal'
import { woodProcessingRecipes } from './wood'
import { leatherProcessingRecipes } from './leather'
import { fabricProcessingRecipes } from './fabric'
import { medicineProcessingRecipes } from './medicine'
import { foodProcessingRecipes } from './food'

// 모든 가공 레시피 통합
export const processingRecipes: Recipe[] = [
  ...metalProcessingRecipes,
  ...woodProcessingRecipes,
  ...leatherProcessingRecipes,
  ...fabricProcessingRecipes,
  ...medicineProcessingRecipes,
  ...foodProcessingRecipes
]

// 개별 카테고리별 export
export { metalProcessingRecipes } from './metal'
export { woodProcessingRecipes } from './wood'
export { leatherProcessingRecipes } from './leather'
export { fabricProcessingRecipes } from './fabric'
export { medicineProcessingRecipes } from './medicine'
export { foodProcessingRecipes } from './food'
