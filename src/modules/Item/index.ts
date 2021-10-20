/**
 * Gets the the item id from a blockchain item id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param blockchainId - The blockchain id for the item, containing the item id and the collection id.
 */
export function getCollectionId(blockchainId: string): string | null {
  let values = blockchainId.split(':')

  if (values.length != 2) {
    return null
  }

  return values[0]
}

/**
 * Gets the the item id from a blockchain item id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param blockchainId - The blockchain id for the item, containing the item id and the collection id.
 */
export function getItemId(blockchainId: string): string | null {
  let values = blockchainId.split(':')

  if (values.length != 2) {
    return null
  }

  return values[1]
}

/**
 * Gets the the item id from a blockchain item id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param blockchainId - The blockchain id for the item, containing the item id and the collection id.
 */
export function isBlockchainIdValid(blockchainId: string): boolean {
  let values = blockchainId.split(':')

  if (values.length != 2) {
    return false
  }

  return true
}

/**
 * Builds the Item entity id by combining the third party id and the blockchain id of the item.
 *
 * @param thirdPartyId - The blockchain id for the third party.
 * @param blockchainId - The blockchain id for the item, containing the item id and the collection id.
 */
export function buildItemEntityId(
  thirdPartyId: string,
  blockchainId: string
): string {
  return thirdPartyId + ':' + blockchainId
}
