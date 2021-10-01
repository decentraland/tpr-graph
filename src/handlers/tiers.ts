import { Tier } from '../entities/schema'
import { TierAdded } from '../entities/Tier/Tier'
import { buildCount, buildCountFromTier } from '../modules/Count'

export function handleTierAdded(event: TierAdded): void {
  let metric = buildCount()


  let id = metric.tierTotal.toString()
  let tier = new Tier(id)

  tier.value = event.params._tier.value
  tier.price = event.params._tier.price

  tier.save()

  metric = buildCountFromTier()
  metric.save()
}