import { GmoCoinApi } from './src/http-client';

(async function main() {
  const client = new GmoCoinApi({});

  try {
    const { data } = await client.getStatus();
    console.log(data.status);
  } catch (e) {
    console.log(e);
  }
})();
