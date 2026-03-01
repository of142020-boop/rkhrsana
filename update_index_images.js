import fs from 'fs';
import path from 'path';

const indexFile = path.join('src', 'pages', 'index.astro');

if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, 'utf8');

    // Replace image paths in the homepage gallery and services sections
    content = content.replace(/\/images\/core-drilling-/g, '/images/core-drilling/core-drilling-');
    content = content.replace(/\/images\/saw-cutting-/g, '/images/saw-cutting/saw-cutting-');
    content = content.replace(/\/images\/wire-sawing-/g, '/images/wire-sawing/wire-sawing-');
    content = content.replace(/\/images\/rebar-planting-/g, '/images/rebar-planting/rebar-planting-');

    fs.writeFileSync(indexFile, content);
    console.log('index.astro image paths updated successfully.');
}
