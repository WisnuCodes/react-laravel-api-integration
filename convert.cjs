const sharp = require('sharp');

sharp('public/favicon.svg')
  .resize(1200, 630, { 
    fit: 'contain', 
    background: '#0a0a0a', 
    padding: 200 
  })
  .png()
  .toFile('public/favicon-og.png')
  .then(() => console.log('Successfully converted favicon.svg to favicon-og.png'))
  .catch(err => console.error('Error converting:', err));
