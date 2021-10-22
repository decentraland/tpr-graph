import { log } from '@graphprotocol/graph-ts'
import { Item, ItemWearableMetadata, Metadata } from '../../../entities/schema'
import { toLowerCase } from '../../../utils'
import {
  getSearchCollectionId,
  getSearchItemId,
  isBlockchainIdValid
} from '../../Item'
import * as MetadataTypes from '../types'
import { Categories, BodyShapes, ITEM_WEARABLE_V1_VERSION } from './constants'

/**
 * Builds the wearable metadata by looking for the correct metadata decoder for the metadata version.
 *
 * @param id - The metadata id.
 * @param metadataValues - The metadata values splitted by ':'.
 */
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

/**
 * Builds the wearable metadata of version 1.
 * This type of metadata follows the format: "type:version:name:description:category:bodyshapes."
 * i.e: w:1:third party item 1:the third party item 1 description:hat:BaseMale,BaseFemale
 *
 * @param id - The metadata id.
 * @param metadataValues - The metadata values splitted by ':'.
 */
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

/**
 * Modifies the item by setting the item's search fields.
 *
 * @param item - The item to set the search fields to.
 */
export function setItemSearchFields(item: Item): Item {
  if (!isBlockchainIdValid(item.blockchainItemId)) {
    log.error(
      'The item can\'t have their metadata values set because its ID "{}" isn\'t well formatted',
      [item.blockchainItemId]
    )
    return item
  }

  let collectionId = getSearchCollectionId(item.blockchainItemId)
  let itemId = getSearchItemId(item.blockchainItemId)
  item.searchCollectionId = collectionId!
  item.searchItemId = itemId!

  let metadata = Metadata.load(item.id)
  if (metadata && metadata.type == MetadataTypes.ITEM_WEARABLE_V1) {
    let wearableMetadata = ItemWearableMetadata.load(metadata.itemWearable!)
    if (wearableMetadata) {
      item.searchName = wearableMetadata.name
      item.searchDescription = wearableMetadata.description
      item.searchWearableCategory = wearableMetadata.category
      item.searchWearableBodyShapes = wearableMetadata.bodyShapes
      item.searchText =
        wearableMetadata.name + ' ' + wearableMetadata.description
    } else {
      log.error(
        'The wearable with id "{}" has the "{}" metadata type but no metadata is registered for it',
        [item.id, metadata.type]
      )
    }
  } else {
    log.error(
      'The item with id "{}" does not have metadata or a recognizable metadata type',
      [item.id]
    )
  }
  return item
}
