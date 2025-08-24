// Simple parser to read src/data/items.ts and emit ai_docs/items.md as a Markdown table
// This avoids importing TS directly by parsing the array textually.

import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()
const itemsTsPath = path.join(projectRoot, 'src', 'data', 'items.ts')
const outputMdPath = path.join(projectRoot, 'ai_docs', 'items.md')

function escapeCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ')
}

function extractItemsArray(text) {
  const startIdx = text.indexOf('export const items')
  if (startIdx === -1) throw new Error('Could not find items export')
  const arrStart = text.indexOf('[', startIdx)
  if (arrStart === -1) throw new Error('Could not find start of items array')
  let depth = 0
  let i = arrStart
  for (; i < text.length; i++) {
    const ch = text[i]
    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) {
        // include the closing bracket
        const arrayText = text.slice(arrStart, i + 1)
        return arrayText
      }
    }
  }
  throw new Error('Failed to find matching closing bracket for items array')
}

function splitTopLevelObjects(arrayText) {
  // Remove leading [ and trailing ]
  const inner = arrayText.trim().slice(1, -1)
  const objects = []
  let depth = 0
  let start = -1
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i]
    if (ch === '{') {
      if (depth === 0) start = i
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0 && start !== -1) {
        objects.push(inner.slice(start, i + 1))
        start = -1
      }
    }
  }
  return objects
}

function parseItem(objText) {
  function re(rex, group = 1) {
    const m = objText.match(rex)
    return m ? m[group] : ''
  }
  const id = re(/\bid:\s*'([^']*)'/)
  const name = re(/\bname:\s*'([^']*)'/)
  const imageUrl = re(/\bimageUrl:\s*'([^']*)'/)
  const description = re(/\bdescription:\s*'([^']*)'/)
  const isCraftable = re(/\bisCraftable:\s*(true|false)/)
  const category = re(/\bcategory:\s*'([^']*)'/)
  const isFromTraded = re(/\bisFromTraded:\s*(true|false)/)
  const price = re(/\bprice:\s*([0-9]+)/)

  // craftingRecipe: [ ... ]
  let craftingRecipe = ''
  const recipeMatch = objText.match(/craftingRecipe:\s*\[([\s\S]*?)\]/)
  if (recipeMatch) {
    const recipeBody = recipeMatch[1]
    const pairs = []
    const itemRe = /\{[^}]*?itemId:\s*'([^']+)'[^}]*?quantity:\s*([0-9]+)[^}]*?\}/g
    let m
    while ((m = itemRe.exec(recipeBody)) !== null) {
      pairs.push(`${m[1]} x${m[2]}`)
    }
    craftingRecipe = pairs.join(', ')
  }

  return {
    id,
    name,
    imageUrl,
    description,
    isCraftable,
    category,
    isFromTraded,
    price,
    craftingRecipe,
  }
}

function main() {
  const text = fs.readFileSync(itemsTsPath, 'utf8')
  const arrayText = extractItemsArray(text)
  const objTexts = splitTopLevelObjects(arrayText)
  const items = objTexts.map(parseItem)

  const headers = [
    'id',
    'name',
    'imageUrl',
    'description',
    'isCraftable',
    'category',
    'isFromTraded',
    'price',
    'craftingRecipe',
  ]
  const lines = []
  lines.push('|' + headers.join('|') + '|')
  lines.push('|' + headers.map(() => '---').join('|') + '|')
  for (const it of items) {
    const row = headers.map((h) => escapeCell(it[h]))
    lines.push('|' + row.join('|') + '|')
  }

  fs.writeFileSync(outputMdPath, lines.join('\n'), 'utf8')
  console.log(`Wrote ${items.length} items to ${path.relative(projectRoot, outputMdPath)}`)
}

main()



