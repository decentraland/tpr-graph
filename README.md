# Decentraland TPR graph

|Network|URL|Current|Previous|
|-|-|-|-|
|Matic (Hosted Services)|https://thegraph.com/hosted-service/subgraph/decentraland/tpr-matic-mainnet |QmVbwGkYWs8JvUoyyfQbsyfVzTBHvZA5oLkCChGPUpYU8b|-|
|Matic (Satsuma)|https://subgraph.satsuma-prod.com/decentraland/tpr-matic-mainnet/playground|QmVbwGkYWs8JvUoyyfQbsyfVzTBHvZA5oLkCChGPUpYU8b|-|
|Mumbai (Hosted Service)|https://thegraph.com/hosted-service/subgraph/decentraland/tpr-matic-mumbai|QmTJR2JMzxvTfUgXaGSPdEcsnb2R5sTUyKS5DuZEMhvMoq|-|

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
