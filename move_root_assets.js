import fs from 'fs';
import path from 'path';

const brandDir = path.join('public', 'images', 'brand');
const publicDir = 'public';

if (!fs.existsSync(brandDir)) {
    console.log("No brand directory found.");
    process.exit(0);
}

const files = fs.readdirSync(brandDir);

const rootFilesPattern = /^(favicon|apple-touch-icon|android-chrome|maskable|site\.webmanifest|browserconfig\.xml)/i;

for (const file of files) {
    if (rootFilesPattern.test(file)) {
        const oldPath = path.join(brandDir, file);
        const newPath = path.join(publicDir, file);
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${file} to public/`);
    }
}
console.log('Finished moving root assets.');
