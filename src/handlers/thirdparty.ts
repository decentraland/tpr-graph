import { BigInt, Address, log } from '@graphprotocol/graph-ts'
import { Curation, Item, Receipt, ThirdParty } from '../entities/schema'
import {
  ItemAdded,
  ItemReviewed,
  ItemSlotsConsumed,
  ItemUpdated,
  ThirdPartyAdded,
  ThirdPartyItemSlotsBought,
  ThirdPartyReviewedWithRoot,
  ThirdPartyUpdated
} from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import {
  buildCountFromCuration,
  buildCountFromItem,
  buildCountFromReceipt,
  buildCountFromThirdParty
} from '../modules/Count'
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
  thirdParty.maxItems = event.params._itemSlots
  thirdParty.totalItems = BigInt.fromI32(0)
  thirdParty.isApproved = event.params._isApproved

  let managers = new Array<string>()
  let eventManagers = event.params._managers
  let eventManagersLength = event.params._managers.length

  for (let i = 0; i < eventManagersLength; i++) {
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

export function handleThirdPartyUpdated(event: ThirdPartyUpdated): void {
  if (!isURNValid(event.params._thirdPartyId)) {
    log.error('A third party was added with an invalid URN as an id "{}"', [
      event.params._thirdPartyId
    ])
    return
  }

  let thirdParty = ThirdParty.load(event.params._thirdPartyId)

  if (!thirdParty) {
    log.error('Invalid third party "{}"', [event.params._thirdPartyId])
    return
  }

  thirdParty.resolver = event.params._resolver
  thirdParty.maxItems = thirdParty.maxItems.plus(event.params._itemSlots)
  thirdParty.rawMetadata = event.params._metadata

  let eventManagersAddresses = event.params._managers
  let eventManagersValues = event.params._managerValues

  let managers = new Set<string>()

  // Add previous members to set
  for (let i = 0; i < thirdParty.managers.length; i++) {
    managers.add(thirdParty.managers[i])
  }

  // From the managers and values received, add or remove
  // a manager from the set
  for (let i = 0; i < eventManagersAddresses.length; i++) {
    const manager = eventManagersAddresses[i]
    const val = eventManagersValues[i]

    if (val) {
      managers.add(manager.toHexString())
    } else {
      managers.delete(manager.toHexString())
    }
  }

  // Assign the managers to the third party entity
  // @ts-ignore - managers.values() returns an Array<string> and not an IterableIterator<string> as the IDE suggests
  thirdParty.managers = managers.values()

  let metadata = buildMetadata(thirdParty.id, thirdParty.rawMetadata)
  thirdParty.metadata = metadata.id

  thirdParty = setThirdPartySearchFields(thirdParty)

  thirdParty.save()
}

export function handleThirdPartyItemSlotsBought(
  event: ThirdPartyItemSlotsBought
): void {
  let thirdParty = ThirdParty.load(event.params._thirdPartyId)

  if (thirdParty == null) {
    log.error(
      'A non existent Third Party with id "{}" bought "{}" item slots',
      [event.params._thirdPartyId, event.params._value.toString()]
    )
    return
  }

  thirdParty.maxItems = thirdParty.maxItems.plus(event.params._value)
  thirdParty.save()
}

export function handleThirdPartyReviewedWithRoot(
  event: ThirdPartyReviewedWithRoot
): void {
  const thirdPartyId = event.params._thirdPartyId

  const thirdParty = ThirdParty.load(thirdPartyId)

  if (thirdParty == null) {
    log.error(
      'Attempted to review with root using an unregistered third party with id {}',
      [thirdPartyId]
    )
    return
  }

  thirdParty.root = event.params._root.toHexString()

  thirdParty.save()
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
  item.updatedAt = event.block.timestamp

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

  let thirdParty = ThirdParty.load(event.params._thirdPartyId)
  if (thirdParty == null) {
    log.error(
      'An item with id "{}" was added into a non existent TPR with id "{}"',
      [event.params._itemId, event.params._thirdPartyId]
    )
    return
  }
  thirdParty.totalItems = thirdParty.totalItems.plus(BigInt.fromI32(1))

  let itemId = buildItemId(event.params._thirdPartyId, event.params._itemId)

  let item = Item.load(itemId)
  if (item == null) {
    item = new Item(itemId)
  }

  item.blockchainItemId = event.params._itemId
  item.rawMetadata = event.params._metadata
  item.thirdParty = event.params._thirdPartyId
  item.createdAt = event.block.timestamp
  item.updatedAt = event.block.timestamp
  item.reviewedAt = event.block.timestamp
  item.isApproved = false

  // As of today, the URN is the same as the item entity id
  item.urn = itemId

  let metadata = buildMetadata(item.id, item.rawMetadata)
  item.metadata = metadata.id

  item = setItemSearchFields(item)

  thirdParty.save()
  item.save()

  let metric = buildCountFromItem()
  metric.save()
}

export function handleItemReviewed(event: ItemReviewed): void {
  if (!isBlockchainIdValid(event.params._itemId)) {
    log.error(
      'An item was reviewed in the TPR "{}" with an incorrect id "{}"',
      [event.params._thirdPartyId, event.params._itemId]
    )
    return
  }

  let itemId = buildItemId(event.params._thirdPartyId, event.params._itemId)

  let item = Item.load(itemId)
  if (item == null) {
    log.error(
      'Tried to review inexistent item with id "{}" for TPR with id "{}"',
      [event.params._itemId, event.params._thirdPartyId]
    )
    return
  }

  item.isApproved = event.params._value
  item.contentHash = event.params._contentHash
  item.rawMetadata = event.params._metadata
  item.updatedAt = event.block.timestamp
  item.reviewedAt = event.block.timestamp

  let metadata = buildMetadata(item.id, item.rawMetadata)
  item.metadata = metadata.id

  item.save()
}

export function handleItemSlotsConsumed(event: ItemSlotsConsumed): void {
  // Update Third Party

  const thirdPartyId = event.params._thirdPartyId

  const thirdParty = ThirdParty.load(thirdPartyId)

  if (thirdParty == null) {
    log.error(
      'Tried to consume slots for unregistered third party with id {}',
      [thirdPartyId]
    )
    return
  }

  thirdParty.consumedSlots = thirdParty.consumedSlots.plus(event.params._qty)

  thirdParty.save()

  // Update or create Curation

  const curatorAddress = event.params._sender.toHexString()

  let curation = Curation.load(curatorAddress)

  if (curation == null) {
    curation = new Curation(curatorAddress)
    const metric = buildCountFromCuration()
    metric.save()
  }

  const qty = event.params._qty

  curation.qty = curation.qty.plus(qty)

  curation.save()

  // Create Receipt

  const metric = buildCountFromReceipt()
  metric.save()

  const receipt = new Receipt(metric.receiptTotal.toString())

  receipt.qty = qty
  receipt.thirdParty = thirdPartyId
  receipt.curation = curation.id
  receipt.signer = event.params._signer.toHexString()

  receipt.save()
}
