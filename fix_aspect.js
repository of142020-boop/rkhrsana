import fs from 'fs';

const files = [
    'src/pages/index.astro',
    'src/pages/core-drilling.astro',
    'src/pages/saw-cutting.astro',
    'src/pages/wire-sawing.astro',
    'src/pages/rebar-planting.astro'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Replace width="900" height="650" with 800x600 globally
        content = content.replace(/width="900"/g, 'width="800"');
        content = content.replace(/height="650"/g, 'height="600"');
        // Replace h-56 with aspect-[4/3]
        content = content.replace(/class="w-full h-56 object-cover bg-slate-200"/g, 'class="w-full aspect-[4/3] object-cover bg-slate-200"');
        fs.writeFileSync(file, content);
    }
}
console.log('Aspect ratios updated successfully.');
