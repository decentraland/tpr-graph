/**
 * Gets from a blockchain item id, the collection id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param collectionAndItemIds - The blockchain id for the item, containing the item id and the collection id.
 */
export function getCollectionId(collectionAndItemIds: string): string | null {
  let values = collectionAndItemIds.split(':')

  if (values.length != 2) {
    return null
  }

  return values[0]
}

/**
 * Gets from a blockchain item id, the item id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param collectionAndItemIds - The blockchain id for the item, containing the item id and the collection id.
 */
export function getItemId(collectionAndItemIds: string): string | null {
  let values = collectionAndItemIds.split(':')

  if (values.length != 2) {
    return null
  }

  return values[1]
}

/**
 * Builds the Item entity id by combining the third party id and the blockchain id of the item.
 *
 * @param thirdPartyId - The blockchain id for the third party.
 * @param collectionAndItemIds - The blockchain id for the item, containing the item id and the collection id.
 */
export function buildItemEntityId(
  thirdPartyId: string,
  collectionAndItemIds: string
): string {
  return thirdPartyId + '-' + collectionAndItemIds
}
