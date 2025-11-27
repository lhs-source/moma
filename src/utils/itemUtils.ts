import { items } from '../data/items';
import type { Item } from '../data/schemas/item';

/**
 * 아이템 이름으로 아이템 정보를 찾는 함수
 * @param itemName 아이템 이름
 * @returns 아이템 정보 또는 undefined
 */
export function findItemByName(itemName: string): Item | undefined {
  return items.find(item => item.name === itemName);
}

/**
 * 아이템 ID로 아이템 정보를 찾는 함수
 * @param itemId 아이템 ID
 * @returns 아이템 정보 또는 undefined
 */
export function findItemById(itemId: string): Item | undefined {
  return items.find(item => item.id === itemId);
}

/**
 * 아이템 이름으로 아이템 이미지 URL을 가져오는 함수
 * @param itemName 아이템 이름
 * @returns 아이템 이미지 URL 또는 기본 이미지
 */
export function getItemImageUrl(itemName: string): string {
  const item = findItemByName(itemName);
  return item?.imageUrl || '/images/items/default.webp';
}

/**
 * 아이템 ID로 아이템 이미지 URL을 가져오는 함수
 * @param itemId 아이템 ID
 * @returns 아이템 이미지 URL 또는 기본 이미지
 */
export function getItemImageUrlById(itemId: string): string {
  const item = findItemById(itemId);
  return item?.imageUrl || '/images/items/default.webp';
}

/**
 * 아이템 이름으로 아이템 정보를 가져오는 함수 (이미지 URL 포함)
 * @param itemName 아이템 이름
 * @returns 아이템 정보 객체
 */
export function getItemInfo(itemName: string): { name: string; imageUrl: string; } {
  const item = findItemByName(itemName);
  return {
    name: itemName,
    imageUrl: item?.imageUrl || '/images/items/default.webp',
  };
}

/**
 * 아이템 ID로 아이템 정보를 가져오는 함수 (이름과 이미지 URL 포함)
 * @param itemId 아이템 ID
 * @returns 아이템 정보 객체
 */
export function getItemInfoById(itemId: string): { name: string; imageUrl: string; } {
  const item = findItemById(itemId);
  return {
    name: item?.name || itemId,
    imageUrl: item?.imageUrl || '/images/items/default.webp',
  };
}
