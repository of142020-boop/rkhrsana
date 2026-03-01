import fs from 'fs';
import path from 'path';

const pages = [
    'core-drilling',
    'saw-cutting',
    'wire-sawing',
    'rebar-planting'
];

const imgDir = path.join('public', 'images');

for (const page of pages) {
    const targetDir = path.join(imgDir, page);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Move files
    const files = fs.readdirSync(imgDir);
    for (const file of files) {
        if (file.startsWith(page) && file.endsWith('.webp')) {
            const oldPath = path.join(imgDir, file);
            const newPath = path.join(targetDir, file);
            if (fs.statSync(oldPath).isFile()) {
                fs.renameSync(oldPath, newPath);
            }
        }
    }

    // Update references in Astro files
    const astroFile = path.join('src', 'pages', `${page}.astro`);
    if (fs.existsSync(astroFile)) {
        let content = fs.readFileSync(astroFile, 'utf8');
        // regex to replace `/images/PREFIX-` to `/images/PREFIX/PREFIX-`
        const regex = new RegExp(`/images/${page}-`, 'g');
        content = content.replace(regex, `/images/${page}/${page}-`);
        fs.writeFileSync(astroFile, content);
    }
}

console.log('Images organized and references updated successfully.');
