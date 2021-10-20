import { log } from '@graphprotocol/graph-ts'
import { Item, ItemWearableMetadata, Metadata } from '../../../entities/schema'
import { toLowerCase } from '../../../utils'
import { getCollectionId, getItemId } from '../../Item'
import * as MetadataTypes from '../types'
import { Categories, BodyShapes, ITEM_WEARABLE_V1_VERSION } from './constants'

export function buildWearableMetadata(
  id: string,
  metadataValues: string[]
): ItemWearableMetadata | null {
  if (metadataValues.length < 1) {
    log.error(
      'The metadata for the wearable item with id "{}" is not correctly formatted "{}"',
      [id, metadataValues.join(':')]
    )
    return null
  }

  if (metadataValues[1] == ITEM_WEARABLE_V1_VERSION) {
    return buildWearableMetadataV1(id, metadataValues)
  }

  log.error(
    'The metadata version "{}" for the wearable item with id "{}" is not one of the available',
    [metadataValues[1], id]
  )

  return null
}

function buildWearableMetadataV1(
  id: string,
  metadataValues: string[]
): ItemWearableMetadata | null {
  if (metadataValues.length !== 6) {
    log.error(
      'The metadata with version 1 for the wearable item with id "{}" is not correctly formatted "{}"',
      [id, metadataValues.join(':')]
    )
    return null
  }

  let itemMetadata = ItemWearableMetadata.load(id)
  if (itemMetadata == null) {
    itemMetadata = new ItemWearableMetadata(id)
  }

  itemMetadata.name = metadataValues[2]
  itemMetadata.description = metadataValues[3]
  itemMetadata.category = buildWearableCategory(metadataValues[4])
  itemMetadata.bodyShapes = buildWearableBodyShapes(metadataValues[5])

  itemMetadata.save()

  return itemMetadata
}

function buildWearableCategory(metadataCategory: string): string | null {
  let lowerCasedMetadataCategory = toLowerCase(metadataCategory)
  if (Categories.indexOf(lowerCasedMetadataCategory) !== 1) {
    return lowerCasedMetadataCategory
  }

  log.error(
    'The wearable category "{}" is not one of the available categories',
    [metadataCategory]
  )

  return null
}

function buildWearableBodyShapes(metadataBodyShapes: string): string[] {
  let splittedBodyShapes = metadataBodyShapes.split(',')
  return splittedBodyShapes.filter(
    splittedBodyShape => BodyShapes.indexOf(splittedBodyShape) !== -1
  )
}

export function setItemSearchFields(item: Item): Item {
  let collectionId = getCollectionId(item.blockchainItemId)
  let itemId = getItemId(item.blockchainItemId)
  item.searchCollectionId = collectionId!
  item.searchItemId = itemId!

  let metadata = Metadata.load(item.id)
  if (metadata && metadata.type == MetadataTypes.ITEM_WEARABLE_V1) {
    let wearableMetadata = ItemWearableMetadata.load(metadata.itemWearable!)
    if (wearableMetadata) {
      item.searchName = wearableMetadata.name
      item.searchDescription = wearableMetadata.description
      item.searchCategory = wearableMetadata.category
      item.searchBodyShapes = wearableMetadata.bodyShapes
    }
  }
  return item
}
