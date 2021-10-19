import { BigInt, Address } from '@graphprotocol/graph-ts'
import { Item, ThirdParty } from '../entities/schema'
import {
  ItemAdded,
  ItemUpdated,
  ThirdPartyAdded
} from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import { buildCountFromThirdParty } from '../modules/Count'
import { getCollectionId, getItemId } from '../modules/ID'
import { buildMetadata } from '../modules/Metadata'
import { setThirdPartySearchFields } from '../modules/Metadata/ThirdParty'

export function handleThirdPartyAdded(event: ThirdPartyAdded): void {
  let thirdParty = new ThirdParty(event.params._thirdPartyId)

  thirdParty.resolver = event.params._resolver
  thirdParty.rawMetadata = event.params._metadata
  thirdParty.maxItems = BigInt.fromI32(0)
  thirdParty.totalItems = BigInt.fromI32(0)
  thirdParty.isApproved = event.params._isApproved
  thirdParty.managers = new Array<string>()

  let eventManagers = event.params._managers

  for (let i = 0; i < event.params._managers.length; i++) {
    let m = eventManagers.pop()
    thirdParty.managers.push((m as Address).toHexString())
  }

  let metadata = buildMetadata(thirdParty.id, thirdParty.rawMetadata)
  thirdParty.metadata = metadata.id

  thirdParty = setThirdPartySearchFields(thirdParty)

  thirdParty.save()

  let metric = buildCountFromThirdParty()
  metric.save()
}

export function handleItemUpdated(event: ItemUpdated): void {
  let item = Item.load(event.params._itemId)
  if (item == null) {
    return
  }

  item.metadata = event.params._metadata

  item.save()
}

export function handleItemAdded(event: ItemAdded): void {
  let collectionId = getCollectionId(event.params._itemId)
  let itemId = getItemId(event.params._itemId)
  if (collectionId == null || itemId == null) {
    return
  }

  let item = Item.load(event.params._itemId)
  if (item === null) {
    item = new Item(event.params._itemId)
  }

  item.rawMetadata = event.params._metadata
  item.thirdParty = event.params._thirdPartyId
  item.id = event.params._itemId
  item.isApproved = false
  item.searchCollectionId = collectionId!
  item.searchItemId = itemId!

  item.save()
}
