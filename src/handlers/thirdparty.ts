import { BigInt, Address } from '@graphprotocol/graph-ts'
import { ThirdParty } from '../entities/schema'
import { ThirdPartyAdded } from '../entities/ThirdPartyRegistry/ThirdPartyRegistry'
import { buildCountFromThirdParty } from '../modules/Count'
import { buildMetadata } from '../modules/Metadata'
import { setThirdPartySearchFields } from '../modules/Metadata/ThirdParty'

export function handleThirdPartyAdded(event: ThirdPartyAdded): void {
  let thirdParty = new ThirdParty(event.params._thirdPartyId)

  thirdParty.resolver = event.params._resolver
  thirdParty.rawMetadata = event.params._metadata
  thirdParty.maxItems = BigInt.fromI32(0)
  thirdParty.totalItems = BigInt.fromI32(0)
  thirdParty.isApproved = event.params._isApproved
  thirdParty.managers = []

  let managers = thirdParty.managers
  let eventManagers = event.params._managers

  for (let i = 0; i < event.params._managers.length; i++) {
    let m = eventManagers.pop()
    managers.push((m as Address).toHexString())
  }

  thirdParty.managers = managers

  let metadata = buildMetadata(thirdParty)
  thirdParty.metadata = metadata.id

  thirdParty = setThirdPartySearchFields(thirdParty)

  thirdParty.save()

  let metric = buildCountFromThirdParty()
  metric.save()
}