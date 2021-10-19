import { BigInt, Address, log } from '@graphprotocol/graph-ts'
import { Item, ThirdParty } from '../entities/schema'
import {
  ItemAdded,
  ItemUpdated,
  ThirdPartyAdded
} from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import { buildCountFromItem, buildCountFromThirdParty } from '../modules/Count'
import { buildItemEntityId, getCollectionId, getItemId } from '../modules/ID'
import { buildMetadata } from '../modules/Metadata'
import { setThirdPartySearchFields } from '../modules/Metadata/ThirdParty'

export function handleThirdPartyAdded(event: ThirdPartyAdded): void {
  let thirdParty = new ThirdParty(event.params._thirdPartyId)

  thirdParty.resolver = event.params._resolver
  thirdParty.rawMetadata = event.params._metadata
  thirdParty.maxItems = BigInt.fromI32(0)
  thirdParty.totalItems = BigInt.fromI32(0)
  thirdParty.isApproved = event.params._isApproved

  let managers = new Array<string>()
  let eventManagers = event.params._managers

  for (let i = 0; i < event.params._managers.length; i++) {
    let m = eventManagers.pop()
    managers.push((m as Address).toHexString())
  }
  thirdParty.managers = managers

  let metadata = buildMetadata(thirdParty.id, thirdParty.rawMetadata)
  thirdParty.metadata = metadata.id

  thirdParty = setThirdPartySearchFields(thirdParty)

  thirdParty.save()

  let metric = buildCountFromThirdParty()
  metric.save()
}

export function handleItemUpdated(event: ItemUpdated): void {
  let itemEntityId = buildItemEntityId(
    event.params._thirdPartyId,
    event.params._itemId
  )
  let item = Item.load(itemEntityId)
  if (item == null) {
    log.error('An item with a non existent id "{}" tried to be updated', [
      itemEntityId
    ])
    return
  }

  item.rawMetadata = event.params._metadata
  let metadata = buildMetadata(item.id, item.rawMetadata)
  item.metadata = metadata.id

  item.save()
}

export function handleItemAdded(event: ItemAdded): void {
  let collectionId = getCollectionId(event.params._itemId)
  let itemId = getItemId(event.params._itemId)
  if (collectionId == null || itemId == null) {
    log.error(
      'An item was added in the TPR "{}" with an incorrect id - collectionId: "{}", itemId: "{}"',
      [
        event.params._thirdPartyId,
        collectionId ? collectionId : 'null',
        itemId ? itemId : 'null'
      ]
    )
    return
  }

  let item = Item.load(
    buildItemEntityId(event.params._thirdPartyId, event.params._itemId)
  )
  if (item === null) {
    item = new Item(event.params._itemId)
  }

  item.rawMetadata = event.params._metadata
  item.thirdParty = event.params._thirdPartyId
  item.isApproved = false
  item.searchCollectionId = collectionId!
  item.searchItemId = itemId!

  let metadata = buildMetadata(item.id, item.rawMetadata)
  item.metadata = metadata.id

  item.save()

  let metric = buildCountFromItem()
  metric.save()
}
