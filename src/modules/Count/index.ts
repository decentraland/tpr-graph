import { BigInt } from '@graphprotocol/graph-ts'
import { Count } from '../../entities/schema'

export const DEFAULT_ID = 'all'

export function buildCount(): Count {
  let count = Count.load(DEFAULT_ID)

  if (count == null) {
    count = new Count(DEFAULT_ID)
    count.tierTotal = BigInt.fromI32(0)
  }

  return count as Count
}

export function buildCountFromTier(): Count {
  let count = buildCount()

  count.tierTotal = count.tierTotal.plus(BigInt.fromI32(1))

  return count
}
