export interface RuneData {
  id: string;
  name: string;
  part: 'weapon' | 'armor' | 'accessory';
  source: 'raid' | 'abyss'; // 획득 경로
  cost: number;            // 필요 증표 또는 화석 수량
}

export const runes: RuneData[] = [
  // 무기 룬 (raid)
  { id: 'weapon_harmony', name: '무기 룬: 조화', part: 'weapon', source: 'raid', cost: 70 },
  { id: 'weapon_darklight', name: '무기 룬: 명암', part: 'weapon', source: 'raid', cost: 70 },

  // 방어구 룬 (abyss 600)
  { id: 'armor_harmony', name: '방어구 룬: 조화', part: 'armor', source: 'abyss', cost: 600 },
  { id: 'armor_darklight', name: '방어구 룬: 명암', part: 'armor', source: 'abyss', cost: 600 },

  // 장신구 룬 (accessory) 예시 – raid
  { id: 'accessory_swiftness', name: '장신구 룬: 질풍+', part: 'accessory', source: 'raid', cost: 70 },
]; 