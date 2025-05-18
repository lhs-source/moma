
import type { Trade } from './schemas/trade'
import type { TradeData } from './schemas/trade'


export const trades: Trade[] = [
  {
    id: 'nora_travelers_snack',
    npcId: 'nora',
    giveItemId: 'malcolms_pillow',
    receiveItemId: 'travelers_snack',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 3,
    isEnabled: true
  },
  {
    id: 'malcolm_blank_score',
    npcId: 'malcolm',
    giveItemId: 'wool',
    receiveItemId: 'blank_score',
    giveQuantity: 50,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'malcolm_pillow',
    npcId: 'malcolm',
    giveItemId: 'spider_web',
    receiveItemId: 'malcolms_pillow',
    giveQuantity: 5,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'fergus_iron_ore',
    npcId: 'fergus',
    giveItemId: 'equipment_parts',
    receiveItemId: 'iron_ore',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'fergus_coal',
    npcId: 'fergus',
    giveItemId: 'equipment_parts',
    receiveItemId: 'coal',
    giveQuantity: 1,
    receiveQuantity: 3,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'fergus_alloy_steel',
    npcId: 'fergus',
    giveItemId: 'steel_ingot',
    receiveItemId: 'alloy_steel_ingot',
    giveQuantity: 2,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 4,
    isEnabled: true
  },
  {
    id: 'elvin_tannin',
    npcId: 'elvin',
    giveItemId: 'leather',
    receiveItemId: 'tannin_powder',
    giveQuantity: 5,
    receiveQuantity: 5,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'elvin_superior_log',
    npcId: 'elvin',
    giveItemId: 'superior_leather',
    receiveItemId: 'superior_log',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'elvin_superior_wood',
    npcId: 'elvin',
    giveItemId: 'stir_fried_vegetables',
    receiveItemId: 'superior_wood',
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 2,
    isEnabled: true
  },
  {
    id: 'tracy_leather',
    npcId: 'tracy',
    giveItemId: 'log',
    receiveItemId: 'leather',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'tracy_superior_leather',
    npcId: 'tracy',
    giveItemId: 'log',
    receiveItemId: 'superior_leather',
    giveQuantity: 10,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 10,
    isEnabled: true
  },
  {
    id: 'tracy_tree_sap',
    npcId: 'tracy',
    giveItemId: 'superior_log',
    receiveItemId: 'tree_sap',
    giveQuantity: 1,
    receiveQuantity: 4,
    type: 'daily',
    scope: 'character',
    maxExchanges: 5,
    isEnabled: true
  },
  {
    id: 'walter_superior_wood',
    npcId: 'walter',
    giveItemId: 'log_ornament',
    receiveItemId: 'superior_wood',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  },
  {
    id: 'walter_wooden_ornament',
    npcId: 'walter',
    giveItemId: 'tracy_wooden_music_box',
    receiveItemId: 'wooden_ornament',
    giveQuantity: 1,
    receiveQuantity: 1,
    type: 'daily',
    scope: 'character',
    maxExchanges: 1,
    isEnabled: true
  }
]

interface LocationTrades {
  [key: string]: TradeData[]
}

export const tradeData: LocationTrades = {
  '티르코네일': [
    {
      id: 'nora_travelers_snack',
      npc: '노라',
      itemId: 'travelers_snack',
      itemQuantity: 1,
      requiredItemId: 'malcolms_pillow',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'deian_superior_wool',
      npc: '데이안',
      itemId: 'superior_wool',
      itemQuantity: 4,
      requiredItemId: 'pet_food',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'dilis_four_leaf_clover',
      npc: '딜리스',
      itemId: 'four_leaf_clover',
      itemQuantity: 1,
      requiredItemId: 'mushroom',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'lasa_alchemy_catalyst_1',
      npc: '라사',
      itemId: 'alchemy_catalyst',
      itemQuantity: 1,
      requiredItemId: 'apple_juice',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'lasa_alchemy_catalyst_2',
      npc: '라사',
      itemId: 'alchemy_catalyst',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 3,
      limitType: 'none',
      limitCount: 0
    },
    {
      id: 'lasa_rare_alchemy_catalyst',
      npc: '라사',
      itemId: 'rare_alchemy_catalyst',
      itemQuantity: 1,
      requiredItemId: 'alchemy_catalyst',
      requiredQuantity: 15,
      limitType: 'none',
      limitCount: 0
    },
    {
      id: 'reynald_critical_potion',
      npc: '레이널드',
      itemId: 'critical_potion',
      itemQuantity: 1,
      requiredItemId: 'mayonnaise_stir_fry',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'malcolm_blank_score',
      npc: '말콤',
      itemId: 'blank_score',
      itemQuantity: 1,
      requiredItemId: 'wool',
      requiredQuantity: 50,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'malcolm_pillow',
      npc: '말콤',
      itemId: 'malcolms_pillow',
      itemQuantity: 1,
      requiredItemId: 'spider_web',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'malcolm_workbench',
      npc: '말콤',
      itemId: 'workbench_blueprint',
      itemQuantity: 1,
      requiredItemId: 'campfire_kit',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'maven_holy_water',
      npc: '메이븐',
      itemId: 'holy_water',
      itemQuantity: 1,
      requiredItemId: 'kaitin_bread',
      requiredQuantity: 1,
      limitType: 'account',
      limitCount: 1
    },
    {
      id: 'alisa_alchemy_powder_1',
      npc: '알리사',
      itemId: 'alchemy_powder',
      itemQuantity: 1,
      requiredItemId: 'egg',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'alisa_alchemy_powder_2',
      npc: '알리사',
      itemId: 'alchemy_powder',
      itemQuantity: 1,
      requiredItemId: 'lavender',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'alisa_wheat_flour_1',
      npc: '알리사',
      itemId: 'wheat_flour',
      itemQuantity: 1,
      requiredItemId: 'egg',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'alisa_wheat_flour_2',
      npc: '알리사',
      itemId: 'wheat_flour',
      itemQuantity: 1,
      requiredItemId: 'lavender',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'endelion_holy_water',
      npc: '엔델리온',
      itemId: 'holy_water',
      itemQuantity: 10,
      requiredItemId: 'kaitin_bread',
      requiredQuantity: 10,
      limitType: 'account',
      limitCount: 1
    },
    {
      id: 'kaitin_bread_trade',
      npc: '케이틴',
      itemId: 'kaitin_bread',
      itemQuantity: 3,
      requiredItemId: 'milk',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'kaitin_food_processing',
      npc: '케이틴',
      itemId: 'food_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'wheat_flour',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'fergus_iron_ore',
      npc: '퍼거스',
      itemId: 'iron_ore',
      itemQuantity: 1,
      requiredItemId: 'equipment_parts',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'fergus_coal',
      npc: '퍼거스',
      itemId: 'coal',
      itemQuantity: 3,
      requiredItemId: 'equipment_parts',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'fergus_alloy_steel',
      npc: '퍼거스',
      itemId: 'alloy_steel_ingot',
      itemQuantity: 1,
      requiredItemId: 'steel_ingot',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 4
    }
  ],
  '두갈드아일': [
    {
      id: 'elvin_tannin',
      npc: '엘빈',
      itemId: 'tannin_powder',
      itemQuantity: 5,
      requiredItemId: 'leather',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'elvin_superior_log',
      npc: '엘빈',
      itemId: 'superior_log',
      itemQuantity: 1,
      requiredItemId: 'superior_leather',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'elvin_superior_wood',
      npc: '엘빈',
      itemId: 'superior_wood',
      itemQuantity: 4,
      requiredItemId: 'stir_fried_vegetables',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'elvin_leather_processing',
      npc: '엘빈',
      itemId: 'leather_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'superior_fabric_plus',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'tracy_leather',
      npc: '트레이시',
      itemId: 'leather',
      itemQuantity: 1,
      requiredItemId: 'log',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'tracy_superior_leather',
      npc: '트레이시',
      itemId: 'superior_leather',
      itemQuantity: 1,
      requiredItemId: 'log',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 10
    },
    {
      id: 'tracy_tree_sap',
      npc: '트레이시',
      itemId: 'tree_sap',
      itemQuantity: 4,
      requiredItemId: 'superior_log',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'tracy_wood_carving',
      npc: '트레이시',
      itemId: 'tracy_wood_carving',
      itemQuantity: 1,
      requiredItemId: 'clam_chowder',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'tracy_wood_processing',
      npc: '트레이시',
      itemId: 'wood_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'caterpillar',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    }
  ],
  '던바튼': [
    {
      id: 'glenis_glenis_cake',
      npc: '글리니스',
      itemId: 'glenis_cake',
      itemQuantity: 1,
      requiredItemId: 'fork_in_milk',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'glenis_glenis_apple_milk_tea',
      npc: '글리니스',
      itemId: 'glenis_apple_milk_tea',
      itemQuantity: 1,
      requiredItemId: 'cream',
      requiredQuantity: 4,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'glenis_food_processing',
      npc: '글리니스',
      itemId: 'food_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'apple_soup',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'manus_life_gem',
      npc: '마누스',
      itemId: 'life_gem',
      itemQuantity: 1,
      requiredItemId: 'pet_food',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'walter_superior_wood',
      npc: '발터',
      itemId: 'superior_wood',
      itemQuantity: 16,
      requiredItemId: 'tracy_wood_carving',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'walter_heart_token',
      npc: '발터',
      itemId: 'heart_token',
      itemQuantity: 1,
      requiredItemId: 'love_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'walter_fire_bomb',
      npc: '발터',
      itemId: 'fire_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'walter_thunder_bomb',
      npc: '발터',
      itemId: 'thunder_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'walter_wind_bomb',
      npc: '발터',
      itemId: 'wind_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'walter_acid_bomb',
      npc: '발터',
      itemId: 'acid_bomb',
      itemQuantity: 1,
      requiredItemId: 'dark_fish',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'stewart_fire_crystal',
      npc: '스튜어트',
      itemId: 'fire_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_ice_crystal',
      npc: '스튜어트',
      itemId: 'ice_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_electric_crystal',
      npc: '스튜어트',
      itemId: 'electric_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_light_crystal',
      npc: '스튜어트',
      itemId: 'light_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'stewart_seal_crystal',
      npc: '스튜어트',
      itemId: 'seal_crystal',
      itemQuantity: 1,
      requiredItemId: 'alchemy_powder',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'simon_dye_base',
      npc: '시몬',
      itemId: 'dye_base',
      itemQuantity: 3,
      requiredItemId: 'superior_silk',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'simon_silk_fabric',
      npc: '시몬',
      itemId: 'silk_fabric',
      itemQuantity: 1,
      requiredItemId: 'ghost_lantern',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'simon_armor_blueprint',
      npc: '시몬',
      itemId: 'armor_blueprint',
      itemQuantity: 1,
      requiredItemId: 'sanded_ferodotS',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'aranwen_ultimate_potion',
      npc: '아란웬',
      itemId: 'ultimate_potion',
      itemQuantity: 1,
      requiredItemId: 'potato_salad',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'aranwen_spirit_trace',
      npc: '아란웬',
      itemId: 'spirit_trace',
      itemQuantity: 20,
      requiredItemId: 'class_master_medal',
      requiredQuantity: 1,
      limitType: 'none',
      limitCount: 0
    },
    {
      id: 'aira_paper',
      npc: '아이라',
      itemId: 'paper',
      itemQuantity: 10,
      requiredItemId: 'orphan_novel',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'jerome_silk',
      npc: '제롬',
      itemId: 'silk',
      itemQuantity: 4,
      requiredItemId: 'ricotta_cheese_salad',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'jerome_superior_silk',
      npc: '제롬',
      itemId: 'superior_silk',
      itemQuantity: 4,
      requiredItemId: 'cream_sauce_steak',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'jamie_superior_fabric',
      npc: '제이미',
      itemId: 'superior_fabric',
      itemQuantity: 4,
      requiredItemId: 'apple_soup',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'jamie_superior_fabric_plus',
      npc: '제이미',
      itemId: 'superior_fabric_plus',
      itemQuantity: 4,
      requiredItemId: 'apple_cream_cake',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'kalis_superior_wood',
      npc: '칼릭스',
      itemId: 'superior_wood_plus',
      itemQuantity: 12,
      requiredItemId: 'glenis_apple_milk_tea',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 2
    },
    {
      id: 'flora_orphan_novel',
      npc: '플로라',
      itemId: 'orphan_novel',
      itemQuantity: 1,
      requiredItemId: 'glenis_cake',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    }
  ],
  '얼음 협곡': [
    {
      id: 'karin_pet_food',
      npc: '카린',
      itemId: 'pet_food',
      itemQuantity: 10,
      requiredItemId: 'potato_soup',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    }
  ],
  '콜헨': [
    {
      id: 'armis_special_steel',
      npc: '아르미스',
      itemId: 'special_steel',
      itemQuantity: 1,
      requiredItemId: 'equipment_parts',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'armis_copper_ore',
      npc: '아르미스',
      itemId: 'copper_ore',
      itemQuantity: 10,
      requiredItemId: 'white_ore',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'armis_metal_processing',
      npc: '아르미스',
      itemId: 'metal_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'coal',
      requiredQuantity: 20,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'armis_weapon_blueprint',
      npc: '아르미스',
      itemId: 'weapon_blueprint',
      itemQuantity: 1,
      requiredItemId: 'fire_bomb',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'keaira_cave_gem',
      npc: '케아라',
      itemId: 'cave_gem',
      itemQuantity: 1,
      requiredItemId: 'superior_fabric',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'keaira_ruin_gem',
      npc: '케아라',
      itemId: 'ruin_gem',
      itemQuantity: 1,
      requiredItemId: 'superior_fabric',
      requiredQuantity: 10,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'keaira_superior_critical_potion',
      npc: '케아라',
      itemId: 'superior_critical_potion',
      itemQuantity: 1,
      requiredItemId: 'ice_fruit_juice',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'conor_four_leaf_clover',
      npc: '코너',
      itemId: 'four_leaf_clover',
      itemQuantity: 1,
      requiredItemId: 'healthy_drink',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'conor_ruin_gem',
      npc: '코너',
      itemId: 'ruin_gem',
      itemQuantity: 1,
      requiredItemId: 'chrysanthemum_ear',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 3
    },
    {
      id: 'killian_healthy_drink',
      npc: '킬리언',
      itemId: 'healthy_drink',
      itemQuantity: 1,
      requiredItemId: 'clean_mushroom_spores',
      requiredQuantity: 5,
      limitType: 'daily',
      limitCount: 5
    },
    {
      id: 'killian_four_leaf_clover',
      npc: '킬리언',
      itemId: 'four_leaf_clover',
      itemQuantity: 2,
      requiredItemId: 'alrio_orio',
      requiredQuantity: 1,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'killian_medicine_processing',
      npc: '킬리언',
      itemId: 'medicine_processing_blueprint',
      itemQuantity: 1,
      requiredItemId: 'poison_bag',
      requiredQuantity: 3,
      limitType: 'daily',
      limitCount: 1
    },
    {
      id: 'killian_medicine_blueprint',
      npc: '킬리언',
      itemId: 'medicine_blueprint',
      itemQuantity: 1,
      requiredItemId: 'sun_butterfly',
      requiredQuantity: 2,
      limitType: 'daily',
      limitCount: 1
    }
  ]
} 