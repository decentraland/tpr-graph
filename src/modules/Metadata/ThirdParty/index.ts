import { ThirdParty, ThirdPartyMetadata } from "../../../entities/schema";
import { toLowerCase } from "../../../utils";

/**
 * @dev We expect that the metadata has the following shape type:version:name:description. i.e: tp:1:third party 1:the third party 1 description.
 * @param thirdParty
 */
export function buildThirdPartyMetadata(
  id: string,
  rawMetadata: string
): ThirdPartyMetadata | null {
  let data = rawMetadata.split(":");

  if (data.length == 4) {
    let thirdPartyMetadata = ThirdPartyMetadata.load(id);

    if (thirdPartyMetadata == null) {
      thirdPartyMetadata = new ThirdPartyMetadata(id);
    }

    thirdPartyMetadata.name = data[2];
    thirdPartyMetadata.description = data[3];
    thirdPartyMetadata.save();

    return thirdPartyMetadata;
  }

  return null;
}

export function setThirdPartySearchFields(thirdParty: ThirdParty): ThirdParty {
  let metadata = ThirdPartyMetadata.load(thirdParty.id);
  if (metadata) {
    thirdParty.searchName = metadata.name;
    thirdParty.searchDescription = metadata.description;
    thirdParty.searchText = toLowerCase(
      metadata.name + " " + metadata.description
    );
  }

  return thirdParty;
}
