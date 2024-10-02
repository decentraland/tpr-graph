# Decentraland TPR graph

| Network              | URL                                                                            | Current                                        | Previous                                       |
| -------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| Matic (Satsuma)      | <https://subgraph.satsuma-prod.com/decentraland/tpr-matic-mainnet/playground>  | Qmdowpo8BT4JRJTEGFTgUfr7u7ozFzV62Jc1oQmq9sxQU8 | QmPPWzZ8PStSAPgJ8bLiMyQdhxjpJD6ZiSGdBKooH2xqLh |
| Matic (Graph Studio) | <https://api.studio.thegraph.com/query/76933/tpr-matic-mainnet/version/latest> | Qmdowpo8BT4JRJTEGFTgUfr7u7ozFzV62Jc1oQmq9sxQU8 | QmPPWzZ8PStSAPgJ8bLiMyQdhxjpJD6ZiSGdBKooH2xqLh |
| Amoy (Satsuma)       | <https://subgraph.satsuma-prod.com/decentraland/tpr-matic-amoy/playground>     | QmVXbW5qUmCNQPNqdRcarpvpJJV7ae3Are92LF6vRHK88h | QmP2qWuD3CZuyCoz6CMKjKeYNrAkf4zkcXkzqc4FuxgpAb |

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
