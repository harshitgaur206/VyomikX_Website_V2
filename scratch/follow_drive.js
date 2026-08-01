const https = require('https');

function follow(url) {
  https.get(url, (res) => {
    console.log('--- Status:', res.statusCode);
    console.log('Location:', res.headers.location);
    console.log('Content-Type:', res.headers['content-type']);
    if (res.headers.location && res.statusCode >= 300 && res.statusCode < 400) {
      follow(res.headers.location);
    }
  });
}

follow('https://drive.google.com/uc?id=1lEPX_927IT26BjJ0flGNWW_6CMJavZbI&export=download&confirm=t');
