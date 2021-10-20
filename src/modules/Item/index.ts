/**
 * Gets the the item id from a blockchain item id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param blockchainItemId - The blockchain id for the item, containing the item id and the collection id.
 */
export function getCollectionId(blockchainItemId: string): string | null {
  let values = blockchainItemId.split(':')

  if (values.length != 2) {
    return null
  }

  return values[0]
}

/**
 * Gets the the item id from a blockchain item id.
 * The blockchain item id is formatted as collectionId:itemId.
 *
 * @param blockchainItemId - The blockchain id for the item, containing the item id and the collection id.
 */
export function getItemId(blockchainItemId: string): string | null {
  let values = blockchainItemId.split(':')

  if (values.length != 2) {
    return null
  }

  return values[1]
}

/**
 * Checks if a blockchain item id is valid or not.
 *
 * @param blockchainItemId - The blockchain id for the item, containing the item id and the collection id.
 */
export function isBlockchainIdValid(blockchainItemId: string): boolean {
  let values = blockchainItemId.split(':')

  if (values.length != 2) {
    return false
  }

  return true
}

/**
 * Builds the Item entity id by combining the third party id and the blockchain id of the item.
 *
 * @param thirdPartyId - The blockchain id for the third party.
 * @param blockchainItemId - The blockchain id for the item, containing the item id and the collection id.
 */
export function buildItemEntityId(
  thirdPartyId: string,
  blockchainItemId: string
): string {
  return thirdPartyId + ':' + blockchainItemId
}
