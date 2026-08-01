const https = require('https');

const id = '1lEPX_927IT26BjJ0flGNWW_6CMJavZbI';
const url = `https://docs.google.com/uc?export=download&id=${id}`;

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
});
