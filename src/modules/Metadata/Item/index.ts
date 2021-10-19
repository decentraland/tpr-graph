import { ItemWearableMetadata } from "../../../entities/schema";
import { toLowerCase } from "../../../utils";
import { Categories, BodyShapes } from "./constants";

export function buildWearableMetadata(
  id: string,
  metadataValues: string[]
): ItemWearableMetadata | null {
  if (metadataValues.length < 1) {
    return null;
  }

  if (metadataValues[1] == "1") {
    return buildWearableMetadataV1(id, metadataValues);
  }

  return null;
}

function buildWearableMetadataV1(
  id: string,
  metadataValues: string[]
): ItemWearableMetadata | null {
  if (metadataValues.length !== 6) {
    return null;
  }

  let itemMetadata = ItemWearableMetadata.load(id);
  if (itemMetadata == null) {
    itemMetadata = new ItemWearableMetadata(id);
  }

  itemMetadata.name = metadataValues[2];
  itemMetadata.description = metadataValues[3];
  itemMetadata.category = buildWearableCategory(metadataValues[4]);
  itemMetadata.bodyShapes = buildWearableBodyShapes(metadataValues[5]);

  itemMetadata.save();

  return itemMetadata;
}

function buildWearableCategory(metadataCategory: string): string | null {
  let lowerCasedMetadataCategory = toLowerCase(metadataCategory);
  if (Categories.indexOf(lowerCasedMetadataCategory) !== 1) {
    return lowerCasedMetadataCategory;
  }

  return null;
}

function buildWearableBodyShapes(metadataBodyShapes: string): string[] {
  let splittedBodyShapes = metadataBodyShapes.split(",");
  return splittedBodyShapes.filter(
    (splittedBodyShape) => BodyShapes.indexOf(splittedBodyShape) !== -1
  );
}
