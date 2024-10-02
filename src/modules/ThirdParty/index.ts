import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ThirdParty } from '../../entities/schema'
import { buildCountFromThirdParty } from '../Count'
import { buildMetadata } from '../Metadata'
import { setThirdPartySearchFields } from '../Metadata/ThirdParty'

/**
 * Checks if the string id is a valid third party URN
 * It should look like this: urn:decentraland:{network}:collections-thirdparty:{third-party-name}
 *
 * @param urn - The URN to check
 */
export function isURNValid(urn: string): boolean {
  let parts = urn.split(':')

  return (
    parts.length == 5 &&
    parts[0] == 'urn' &&
    parts[1] == 'decentraland' &&
    (parts[3] == 'collections-thirdparty' ||
      parts[3] == 'collections-linked-wearables')
  )
}

export function addThirdParty(
  thirdPartyId: string,
  isApproved: boolean,
  isProgrammatic: boolean,
  resolver: string,
  rawMetadata: string,
  itemSlots: BigInt,
  providerManagers: Array<Address>
): void {
  let thirdParty = new ThirdParty(thirdPartyId)

  // Set Default values
  thirdParty.root = ''
  thirdParty.consumedSlots = BigInt.zero()
  thirdParty.isProgrammatic = isProgrammatic

  if (resolver.startsWith('https://') || resolver.startsWith('http://')) {
    thirdParty.resolver = resolver
  } else {
    thirdParty.resolver = null
  }
  thirdParty.rawMetadata = rawMetadata
  thirdParty.maxItems = itemSlots
  thirdParty.isApproved = isApproved && !!thirdParty.root

  let managers = new Array<string>()
  let eventManagers = providerManagers
  let eventManagersLength = providerManagers.length

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
