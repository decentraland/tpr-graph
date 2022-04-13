import { BigInt, Address, log } from '@graphprotocol/graph-ts'
import { Curation, Receipt, ThirdParty } from '../entities/schema'
import {
  ItemSlotsConsumed,
  ThirdPartyAdded,
  ThirdPartyItemSlotsBought,
  ThirdPartyReviewed,
  ThirdPartyReviewedWithRoot,
  ThirdPartyUpdated
} from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import {
  buildCountFromCuration,
  buildCountFromReceipt,
  buildCountFromThirdParty
} from '../modules/Count'
import { isURNValid } from '../modules/ThirdParty'
import { buildMetadata } from '../modules/Metadata'
import { setThirdPartySearchFields } from '../modules/Metadata/ThirdParty'

export function handleThirdPartyAdded(event: ThirdPartyAdded): void {
  if (!isURNValid(event.params._thirdPartyId)) {
    log.error('A third party was added with an invalid URN as an id "{}"', [
      event.params._thirdPartyId
    ])
    return
  }

  const isApproved = event.params._isApproved

  let thirdParty = new ThirdParty(event.params._thirdPartyId)

  thirdParty.resolver = event.params._resolver
  thirdParty.rawMetadata = event.params._metadata
  thirdParty.maxItems = event.params._itemSlots
  thirdParty.isApproved = isApproved && !!thirdParty.root

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
  const isApproved = event.params._isApproved

  const thirdParty = ThirdParty.load(thirdPartyId)

  if (thirdParty == null) {
    log.error(
      'Attempted to review with root using an unregistered third party with id {}',
      [thirdPartyId]
    )
    return
  }

  thirdParty.root = event.params._root.toHexString()
  thirdParty.isApproved = isApproved && !!thirdParty.root

  thirdParty.save()
}

export function handleThirdPartyReviewed(event: ThirdPartyReviewed): void {
  const thirdPartyId = event.params._thirdPartyId
  const isApproved = event.params._value

  const thirdParty = ThirdParty.load(thirdPartyId)

  if (thirdParty == null) {
    log.error(
      'Attempted to review an unregistered third party with id {}',
      [thirdPartyId]
    )
    return
  }

  thirdParty.isApproved = isApproved && !!thirdParty.root

  thirdParty.save()
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

  const receipt = new Receipt(event.params._messageHash.toHexString())

  receipt.qty = qty
  receipt.thirdParty = thirdPartyId
  receipt.curation = curation.id
  receipt.signer = event.params._signer.toHexString()
  receipt.createdAt = event.block.timestamp

  receipt.save()
}
