import { BigInt } from '@graphprotocol/graph-ts'
import { Count } from '../../entities/schema'

export const DEFAULT_ID = 'all'

export function buildCount(): Count {
  let count = Count.load(DEFAULT_ID)

  if (count == null) {
    count = new Count(DEFAULT_ID)
    count.thirdPartyTotal = BigInt.fromI32(0)
    count.itemTotal = BigInt.fromI32(0)
    count.tierTotal = BigInt.fromI32(0)
  }

  return count as Count
}

export function buildCountFromTier(): Count {
  let count = buildCount()

  count.tierTotal = count.tierTotal.plus(BigInt.fromI32(1))

  return count
}

export function buildCountFromThirdParty(): Count {
  let count = buildCount()

  count.thirdPartyTotal = count.thirdPartyTotal.plus(BigInt.fromI32(1))

  return count
}

export function buildCountFromItem(): Count {
  let count = buildCount()

  count.itemTotal = count.itemTotal.plus(BigInt.fromI32(1))

  return count
}
