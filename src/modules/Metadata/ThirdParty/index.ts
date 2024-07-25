import { log } from '@graphprotocol/graph-ts'
import {
  LinkedContracts,
  ThirdParty,
  ThirdPartyMetadata
} from '../../../entities/schema'
import { toLowerCase } from '../../../utils'

/**
 * @dev We expect that the metadata has the following shape type:version:name:description. i.e: tp:1:third party 1:the third party 1 description.
 * @param thirdParty
 */
export function buildThirdPartyMetadata(
  id: string,
  rawMetadata: string
): ThirdPartyMetadata | null {
  let data = rawMetadata.split(':')

  if (data.length > 5 || data.length < 4) {
    log.error(
      'The third party metadata with id "{}" is not correctly formatted "{}"',
      [id, rawMetadata]
    )

    return null
  }

  let thirdPartyMetadata = ThirdPartyMetadata.load(id)

  if (thirdPartyMetadata == null) {
    thirdPartyMetadata = new ThirdPartyMetadata(id)
  }

  thirdPartyMetadata.name = data[2]
  thirdPartyMetadata.description = data[3]

  if (data.length == 5) {
    thirdPartyMetadata.contracts = buildThirdPartyLinkedContractsMetadata(
      data[4]
    )
  }

  thirdPartyMetadata.save()

  return thirdPartyMetadata
}

function buildThirdPartyLinkedContractsMetadata(
  contractsMetadata: string
): string[] {
  let contracts = contractsMetadata.split(';')
  let linkedContracts: LinkedContracts[] = []

  for (let i = 0; i < contracts.length; i++) {
    let contract = contracts[i].split('-')

    if (contract.length === 2) {
      const linkedContractId = toLowerCase(contract[0] + '-' + contract[1])
      let linkedContract = LinkedContracts.load(linkedContractId)
      if (!linkedContract) {
        linkedContract = new LinkedContracts(linkedContractId)
        linkedContract.network = toLowerCase(contract[0])
        linkedContract.address = toLowerCase(contract[1])
        linkedContract.save()
      }

      linkedContracts.push(linkedContract)
    } else {
      log.error(
        'The linked contract metadata with id "{}" is not correctly formatted "{}"',
        [contractsMetadata, contracts[i]]
      )
    }
  }

  return linkedContracts.map<string>((contract) => contract.id)
}

export function setThirdPartySearchFields(thirdParty: ThirdParty): ThirdParty {
  let metadata = ThirdPartyMetadata.load(thirdParty.id)
  if (metadata) {
    thirdParty.searchName = metadata.name
    thirdParty.searchDescription = metadata.description
    thirdParty.searchText = toLowerCase(
      metadata.name + ' ' + metadata.description
    )
  }

  return thirdParty
}
