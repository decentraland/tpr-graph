# Decentraland TPR graph

- Matic: https://thegraph.com/hosted-service/subgraph/decentraland/tpr-matic-mainnet
- Mumbai: https://thegraph.com/hosted-service/subgraph/decentraland/tpr-matic-mumbai

### Install

```bash
npm run install
```

### Deploy

```bash
npm run deploy:{network}
```

### Queries

The item's `id` is the URN.

Ethereum addresses should be passed lowercased:

- `0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8` ❌
- `0xb549b2442b2bd0a53795bc5cdcbfe0caf7aca9f8` ✅

#### Get an item by URN

```typescript
{
  items(where:{ id: "urn:decentraland:mumbai:collections-thirdparty:thirdparty"}) {
    id
  }
}

{
  items(where:{ urn: "urn:decentraland:mumbai:collections-thirdparty:thirdparty"}) {
    id
  }
}
```

#### Get totals

```typescript
{
  counts {
    tierTotal
    thirdPartyTotal
    itemTotal
  }
}
```