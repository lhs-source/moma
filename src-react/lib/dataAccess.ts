import { items } from '../../src/data/items'
import type { Item } from '../../src/data/schemas/item'
import { npcs } from '../../src/data/npcs'
import type { NPC } from '../../src/data/schemas/npc'
import { locations } from '../../src/data/locations'
import type { Location } from '../../src/data/schemas/location'

const itemMap = new Map<string, Item>(items.map((item) => [item.id, item]))
const npcMap = new Map<string, NPC>(npcs.map((npc) => [npc.id, npc]))
const locationMap = new Map<string, Location>(locations.map((loc) => [loc.id, loc]))

export function getItemById(id: string): Item | undefined {
  return itemMap.get(id)
}

export function getNpcById(id: string): NPC | undefined {
  return npcMap.get(id)
}

export function getLocationById(id: string): Location | undefined {
  return locationMap.get(id)
}

export const itemList = items
export const npcList = npcs
export const locationList = locations

