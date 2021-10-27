/**
 * Checks if the string id is a valid third party URN
 * It should look like this: urn:decentraland:{network}:collections-thirdparty:{third-party-name}
 *
 * @param urn - The URN to check
 */
export function isURNValid(urn: string): boolean {
  let parts = urn.split(':')

  return (
    parts.length == 5 &&
    parts[0] == 'urn' &&
    parts[1] == 'decentraland' &&
    parts[3] == 'collections-thirdparty'
  )
}
