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
        // Replace the problematic tailwind class with a safe inline style
        content = content.replace(/class="w-full aspect-\[4\/3\] object-cover bg-slate-200"/g, 'class="w-full object-cover bg-slate-200" style="aspect-ratio: 4/3;"');
        fs.writeFileSync(file, content);
    }
}
console.log('Aspect ratios updated to inline styles successfully.');
