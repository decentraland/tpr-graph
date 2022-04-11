import { BigInt } from '@graphprotocol/graph-ts'
import { Count } from '../../entities/schema'

export const DEFAULT_ID = 'all'

export function buildCount(): Count {
  let count = Count.load(DEFAULT_ID)

  if (count == null) {
    count = new Count(DEFAULT_ID)
    count.thirdPartyTotal = BigInt.fromI32(0)
    count.curationTotal = BigInt.fromI32(0)
    count.receiptTotal = BigInt.fromI32(0)
  }

  return count as Count
}

export function buildCountFromThirdParty(): Count {
  let count = buildCount()

  count.thirdPartyTotal = count.thirdPartyTotal.plus(BigInt.fromI32(1))

  return count
}

export function buildCountFromCuration(): Count {
  let count = buildCount()

  count.curationTotal = count.curationTotal.plus(BigInt.fromI32(1))

  return count
}

export function buildCountFromReceipt(): Count {
  let count = buildCount()

  count.receiptTotal = count.receiptTotal.plus(BigInt.fromI32(1))

  return count
}
