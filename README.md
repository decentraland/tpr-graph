# Decentraland TPR graph

| Network              | URL                                                                            | Current                                        | Previous                                       |
| -------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| Matic (Satsuma)      | <https://subgraph.satsuma-prod.com/decentraland/tpr-matic-mainnet/playground>  | QmPPWzZ8PStSAPgJ8bLiMyQdhxjpJD6ZiSGdBKooH2xqLh | QmVbwGkYWs8JvUoyyfQbsyfVzTBHvZA5oLkCChGPUpYU8b |
| Matic (Graph Studio) | <https://api.studio.thegraph.com/query/76933/tpr-matic-mainnet/version/latest> | QmPPWzZ8PStSAPgJ8bLiMyQdhxjpJD6ZiSGdBKooH2xqLh | QmVbwGkYWs8JvUoyyfQbsyfVzTBHvZA5oLkCChGPUpYU8b |
| Amoy (Satsuma)       | <https://subgraph.satsuma-prod.com/decentraland/tpr-matic-amoy/playground>     | QmYhcVUiNmyjHvTjQfbrq6wFv4MFLpuEssUCd7UMdaPbyF | QmSem1VkB2HGZky7S3hBzaryyisbvWvYqJpcBTjvV3jzZC |

Using [The Graph](https://thegraph.com) and [Satsuma](https://www.satsuma.xyz/)

### Install

```bash
npm run install
```

### Deploy

```bash
npm run deploy:{network}
```

### Queries

Ethereum addresses should be passed lowercased:

- `0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8` ❌
- `0xb549b2442b2bd0a53795bc5cdcbfe0caf7aca9f8` ✅

#### Get totals

```typescript
{
  counts {
    thirdPartyTotal
    curationTotal
    receiptTotal
  }
}
```
