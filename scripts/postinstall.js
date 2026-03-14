// scripts/postinstall.js
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(
    envPath,
    [
      'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/karsh"',
      'NEXTAUTH_SECRET="changeme"',
      'GITHUB_ID=""',
      'GITHUB_SECRET=""',
      'CLOUDINARY_URL=""',
    ].join('\n')
  );
  console.log('🌱  Created default .env');
} else {
  console.log('✅ .env already exists');
}