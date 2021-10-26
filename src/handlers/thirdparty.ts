import { BigInt, Address, log } from '@graphprotocol/graph-ts'
import { Item, ThirdParty } from '../entities/schema'
import {
  ItemAdded,
  ItemUpdated,
  ThirdPartyAdded
} from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import { buildCountFromItem, buildCountFromThirdParty } from '../modules/Count'
import { isURNValid } from '../modules/ThirdParty'
import { buildItemId, isBlockchainIdValid } from '../modules/Item'
import { buildMetadata } from '../modules/Metadata'
import { setItemSearchFields } from '../modules/Metadata/Item'
import { setThirdPartySearchFields } from '../modules/Metadata/ThirdParty'

export function handleThirdPartyAdded(event: ThirdPartyAdded): void {
  if (!isURNValid(event.params._thirdPartyId)) {
    log.error('A third party was added with an invalid URN as an id "{}"', [
      event.params._thirdPartyId
    ])
    return
  }

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
  let itemId = buildItemId(event.params._thirdPartyId, event.params._itemId)
  let item = Item.load(itemId)
  if (item == null) {
    log.error('An item with a non existent id "{}" tried to be updated', [
      itemId
    ])
    return
  }

  item.rawMetadata = event.params._metadata
  let metadata = buildMetadata(item.id, item.rawMetadata)
  item.metadata = metadata.id

  item = setItemSearchFields(item)

  item.save()
}

export function handleItemAdded(event: ItemAdded): void {
  if (!isBlockchainIdValid(event.params._itemId)) {
    log.error('An item was added in the TPR "{}" with an incorrect id "{}"', [
      event.params._thirdPartyId,
      event.params._itemId
    ])
    return
  }

  let itemId = buildItemId(event.params._thirdPartyId, event.params._itemId)

  let item = Item.load(itemId)
  if (item === null) {
    item = new Item(itemId)
  }

  item.blockchainItemId = event.params._itemId
  item.rawMetadata = event.params._metadata
  item.thirdParty = event.params._thirdPartyId
  item.isApproved = false
  // As of today, the URN is the same as the item entity id
  item.urn = itemId

  let metadata = buildMetadata(item.id, item.rawMetadata)
  item.metadata = metadata.id

  item = setItemSearchFields(item)

  item.save()

  let metric = buildCountFromItem()
  metric.save()
}
