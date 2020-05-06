import { GmoCoinApi } from './src/http-client';
import { config } from 'dotenv';

config();

/*
 * put .env file, and write as follows.
 * GMO_API_KEY=xxxxxxxx
 * GMO_API_SECRET=yyyyyyyy
 */

(async function main() {
  const client = new GmoCoinApi({
    apiKey: process.env.GMO_API_KEY,
    secretKey: process.env.GMO_API_SECRET,
  });

  try {
    const { data } = await client.getAccountAsset();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
})();
