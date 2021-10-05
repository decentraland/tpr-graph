import { Metadata, ThirdParty } from "../../entities/schema"
import { buildThirdPartyMetadata } from './ThirdParty'
import * as MetadataTypes from './types'

export function buildMetadata(thirdParty: ThirdParty): Metadata {
  let id = thirdParty.id
  let metadata = Metadata.load(id)

  if (metadata == null) {
    metadata = new Metadata(id)
  }

  let data = thirdParty.rawMetadata.split(':')

  if (data.length >= 2) {
    let type = data[0]
    if (type == MetadataTypes.THIRD_PARTY_TYPE_SHORT) {
      let thirdPartyMetadata = buildThirdPartyMetadata(thirdParty)
      if (thirdPartyMetadata != null) {
        metadata.thirdParty = thirdPartyMetadata.id
        metadata.type = MetadataTypes.THIRD_PARTY_V1
      } else {
        metadata.type = MetadataTypes.UNDEFINED
      }
    } else {
      metadata.type = MetadataTypes.UNDEFINED
    }
  } else {
    metadata.type = MetadataTypes.UNDEFINED
  }

  metadata.save()

  return metadata!
}