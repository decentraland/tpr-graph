import { BigInt, Address, log } from '@graphprotocol/graph-ts'
import { Item, ThirdParty } from '../entities/schema'
import {
  ItemAdded,
  ItemUpdated,
  ThirdPartyAdded
} from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import { buildCountFromItem, buildCountFromThirdParty } from '../modules/Count'
import { buildItemEntityId, isBlockchainIdValid } from '../modules/Item'
import { buildMetadata } from '../modules/Metadata'
import { setItemSearchFields } from '../modules/Metadata/Item'
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
  let itemEntity = Item.load(itemEntityId)
  if (itemEntity == null) {
    log.error('An item with a non existent id "{}" tried to be updated', [
      itemEntityId
    ])
    return
  }

  itemEntity.rawMetadata = event.params._metadata
  let metadata = buildMetadata(itemEntity.id, itemEntity.rawMetadata)
  itemEntity.metadata = metadata.id

  itemEntity.save()
}

export function handleItemAdded(event: ItemAdded): void {
  if (isBlockchainIdValid(event.params._itemId)) {
    log.error('An item was added in the TPR "{}" with an incorrect id "{}"', [
      event.params._thirdPartyId,
      event.params._itemId
    ])
    return
  }

  let itemEntityId = buildItemEntityId(
    event.params._thirdPartyId,
    event.params._itemId
  )

  let itemEntity = Item.load(itemEntityId)
  if (itemEntity === null) {
    itemEntity = new Item(itemEntityId)
  }

  itemEntity.blockchainItemId = event.params._itemId
  itemEntity.rawMetadata = event.params._metadata
  itemEntity.thirdParty = event.params._thirdPartyId
  itemEntity.isApproved = false
  // As of today, the URN is the same as the item entity id
  itemEntity.urn = itemEntityId

  let metadata = buildMetadata(itemEntity.id, itemEntity.rawMetadata)
  itemEntity.metadata = metadata.id

  itemEntity = setItemSearchFields(itemEntity)

  itemEntity.save()

  let metric = buildCountFromItem()
  metric.save()
}
