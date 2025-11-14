/**
 * 룬 관련 유틸리티 함수
 */

import { RuneType, RuneGrade } from '../data/equip/weapons'

/**
 * 룬 타입에 따른 Badge 스타일 클래스 반환
 * 
 * @param type - 룬 타입
 * @returns Tailwind CSS 클래스 문자열
 * 
 * @remarks
 * 타입별 색상:
 * - 무기: 빨간색 계열
 * - 방어구: 파란색 계열
 * - 장신구: 보라색 계열
 */
export function getRuneTypeBadgeClass(type: RuneType): string {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md border-2'
  
  switch (type) {
    case RuneType.Weapon:
      return `${baseClasses} bg-red-50 dark:bg-red-700 text-red-950 dark:text-red-100 border-red-700 dark:border-red-500`
    case RuneType.Armor:
      return `${baseClasses} bg-blue-50 dark:bg-blue-700 text-blue-950 dark:text-blue-100 border-blue-700 dark:border-blue-500`
    case RuneType.Accessory:
      return `${baseClasses} bg-purple-50 dark:bg-purple-700 text-purple-950 dark:text-purple-100 border-purple-700 dark:border-purple-500`
    default:
      return `${baseClasses} bg-secondary text-secondary-foreground border-border`
  }
}

/**
 * 룬 등급에 따른 Badge 스타일 클래스 반환
 * 
 * @param grade - 룬 등급
 * @returns Tailwind CSS 클래스 문자열
 * 
 * @remarks
 * 등급별 색상:
 * - 전설: 주황색 계열
 * - 신화: 분홍색 계열 (더 희귀함)
 */
export function getRuneGradeBadgeClass(grade: RuneGrade): string {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md border-2'
  
  switch (grade) {
    case RuneGrade.Legendary:
      return `${baseClasses} bg-orange-50 dark:bg-orange-700 text-orange-950 dark:text-orange-100 border-orange-700 dark:border-orange-500`
    case RuneGrade.Mythic:
      return `${baseClasses} bg-pink-50 dark:bg-pink-700 text-pink-950 dark:text-pink-100 border-pink-700 dark:border-pink-500`
    default:
      return `${baseClasses} bg-secondary text-secondary-foreground border-border`
  }
}

/**
 * 룬 타입에 따른 Badge 스타일 클래스 반환 (큰 사이즈용)
 * 
 * @param type - 룬 타입
 * @returns Tailwind CSS 클래스 문자열
 */
export function getRuneTypeBadgeClassLarge(type: RuneType): string {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-sm font-medium rounded-md border-2'
  
  switch (type) {
    case RuneType.Weapon:
      return `${baseClasses} bg-red-50 dark:bg-red-700 text-red-950 dark:text-red-100 border-red-700 dark:border-red-500`
    case RuneType.Armor:
      return `${baseClasses} bg-blue-50 dark:bg-blue-700 text-blue-950 dark:text-blue-100 border-blue-700 dark:border-blue-500`
    case RuneType.Accessory:
      return `${baseClasses} bg-purple-50 dark:bg-purple-700 text-purple-950 dark:text-purple-100 border-purple-700 dark:border-purple-500`
    default:
      return `${baseClasses} bg-secondary text-secondary-foreground border-border`
  }
}

/**
 * 룬 등급에 따른 Badge 스타일 클래스 반환 (큰 사이즈용)
 * 
 * @param grade - 룬 등급
 * @returns Tailwind CSS 클래스 문자열
 */
export function getRuneGradeBadgeClassLarge(grade: RuneGrade): string {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-sm font-medium rounded-md border-2'
  
  switch (grade) {
    case RuneGrade.Legendary:
      return `${baseClasses} bg-orange-50 dark:bg-orange-700 text-orange-950 dark:text-orange-100 border-orange-700 dark:border-orange-500`
    case RuneGrade.Mythic:
      return `${baseClasses} bg-pink-50 dark:bg-pink-700 text-pink-950 dark:text-pink-100 border-pink-700 dark:border-pink-500`
    default:
      return `${baseClasses} bg-secondary text-secondary-foreground border-border`
  }
}

