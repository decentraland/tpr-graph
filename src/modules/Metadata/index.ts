import { Metadata } from '../../entities/schema'
import { buildThirdPartyMetadata } from './ThirdParty'
import * as MetadataTypes from './types'

export function buildMetadata(id: string, rawMetadata: string): Metadata {
  let metadata = Metadata.load(id)

  if (metadata == null) {
    metadata = new Metadata(id)
  }

  let data = rawMetadata.split(':')

  if (data.length < 1) {
    metadata.type = MetadataTypes.UNDEFINED
    metadata.save()
    return metadata as Metadata
  }

  let type = data[0]

  if (type == MetadataTypes.THIRD_PARTY_TYPE_SHORT) {
    let thirdPartyMetadata = buildThirdPartyMetadata(id, rawMetadata)
    if (thirdPartyMetadata != null) {
      metadata.thirdParty = thirdPartyMetadata.id
      metadata.type = MetadataTypes.THIRD_PARTY_V1
    } else {
      metadata.type = MetadataTypes.UNDEFINED
    }
  } else {
    metadata.type = MetadataTypes.UNDEFINED
  }

  metadata.save()

  return metadata
}
