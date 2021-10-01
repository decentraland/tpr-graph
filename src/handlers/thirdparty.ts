
import { Address, BigInt, log } from '@graphprotocol/graph-ts'
import { Item, ThirdParty } from '../entities/schema'
import { ThirdPartyAdded, ItemAdded } from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'

export function handleThirdPartyAdded(event: ThirdPartyAdded): void {

  let thirdParty = new ThirdParty(event.params._thirdPartyId)

  log.info('Adding the tpr with id {}', [event.params._thirdPartyId])
  thirdParty.resolver = event.params._resolver
  thirdParty.metadata = event.params._metadata
  thirdParty.maxItems = BigInt.fromI32(0)
  thirdParty.totalItems = BigInt.fromI32(0)
  thirdParty.isApproved = event.params._isApproved
  thirdParty.managers = []

  let managers = thirdParty.managers

  for (let i = 0; i < event.params._managers.length; i++) {
    let m = event.params._managers.pop()
    managers.push((m as Address).toHexString())
  }

  thirdParty.managers = managers

  thirdParty.save()
}

export function handleItemAdded(event: ItemAdded): void {
  let item = new Item(event.params._itemId)

  item.metadata = event.params._metadata
}