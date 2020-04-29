# gmocoin-api-node

API wrapper for the [GMO Coin](https://coin.z.com/jp/)

## Installation

```bash
yarn add gmocoin-api-node
```

## Getting started

Import the module and create a new client instance.
Passing api keys is optional only if you don't plan on doing authenticated calls.

```ts
import { GmoCoinApi } from 'gmocoin-api-node';

(async function main() {
  const client = new GmoCoinApi({});

  try {
    const { data } = await client.getStatus();
    console.log(data.status);
  } catch (e) {
    console.log(e);
  }
})();
```

## TODO

- Support Private API
- Support Public WebSocket API
- Support Private WebSocket API