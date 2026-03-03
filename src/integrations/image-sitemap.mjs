import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * A simple Astro integration to generate an XML sitemap that includes
 * image tags according to Google's Image Sitemap guidelines.
 * 
 * It reads all generated HTML files, extracts Open Graph images and
 * main content images, and compiles them into a single `sitemap-images.xml`.
 */
export default function imageSitemap() {
    return {
        name: 'rkhrsana-sitemap',
        hooks: {
            'astro:build:done': async ({ dir, routes, pages }) => {
                const outDir = fileURLToPath(dir);

                // Define site URL
                const siteUrl = 'https://rkhrsana.com';

                // Map pages
                const pageEntries = [];
                const imageEntries = [];
                const today = new Date().toISOString().split('T')[0];

                // Specific image mappings based on project structure
                const pageImageMap = {
                    '/': [
                        { loc: `${siteUrl}/images/hero-bg.webp`, title: "رواد الخرسانة للصفحة الرئيسية" },
                        { loc: `${siteUrl}/images/gallery-core.webp`, title: "تخريم الخرسانة بالكور" },
                        { loc: `${siteUrl}/images/gallery-saw.webp`, title: "قص الخرسانة بالمنشار" },
                        { loc: `${siteUrl}/images/gallery-wire.webp`, title: "قص الخرسانة بالواير" },
                        { loc: `${siteUrl}/images/gallery-rebar.webp`, title: "تزريع الأشاير" },
                        { loc: `${siteUrl}/images/gallery-ceiling.webp`, title: "أعمال تخريم السقف" },
                        { loc: `${siteUrl}/images/gallery-industrial.webp`, title: "أعمال خرسانة صناعية متكاملة" }
                    ],
                    '/contact/': [
                        { loc: `${siteUrl}/images/contact-hero.webp`, title: "تواصل معنا - رواد الخرسانة" }
                    ],
                    '/about/': [
                        { loc: `${siteUrl}/images/contact-hero.webp`, title: "من نحن - رواد الخرسانة" },
                        { loc: `${siteUrl}/images/wire-sawing-hero.webp`, title: "رؤية ورسالة شركة رواد الخرسانة" }
                    ],
                    '/core-drilling/': [
                        { loc: `${siteUrl}/images/core-drilling-hero.webp`, title: "تخريم الخرسانة بالكور" },
                        { loc: `${siteUrl}/images/core-drilling-1.webp`, title: "عمل فتحات في الخرسانة للسباكة والتكييف" },
                        { loc: `${siteUrl}/images/core-drilling-2.webp`, title: "عمل فتحات الغاز الطبيعي بالكور" },
                        { loc: `${siteUrl}/images/core-drilling-3.webp`, title: "عمل فتحة مدخنة السخان الغاز" },
                        { loc: `${siteUrl}/images/core-drilling-4.webp`, title: "تخريم السقف بالكور دريل" },
                        { loc: `${siteUrl}/images/core-drilling-5.webp`, title: "فتح كور في الكمر بحذر" }
                    ],
                    '/saw-cutting/': [
                        { loc: `${siteUrl}/images/saw-cutting-hero.webp`, title: "قص الخرسانة بالمنشار" },
                        { loc: `${siteUrl}/images/saw-cutting-1.webp`, title: "قص جدار بالمنشار لعمل أبواب وشبابيك" },
                        { loc: `${siteUrl}/images/saw-cutting-2.webp`, title: "قص خرسانة السقف لفتحات السلم والمصعد" },
                        { loc: `${siteUrl}/images/saw-cutting-3.webp`, title: "قص أرضيات خرسانية وفواصل تمدد" },
                        { loc: `${siteUrl}/images/saw-cutting-4.webp`, title: "سلامة قص الخرسانة بالمنشار" }
                    ],
                    '/wire-sawing/': [
                        { loc: `${siteUrl}/images/wire-sawing-hero.webp`, title: "قص الخرسانة بالواير" },
                        { loc: `${siteUrl}/images/wire-sawing-1.webp`, title: "قص القواعد واللبشات بالواير" },
                        { loc: `${siteUrl}/images/wire-sawing-2.webp`, title: "قص الكمرات والأعمدة بالواير" },
                        { loc: `${siteUrl}/images/wire-sawing-3.webp`, title: "قص الخوازيق بالواير" },
                        { loc: `${siteUrl}/images/wire-sawing-4.webp`, title: "سلامة قص الخرسانة بالواير" }
                    ],
                    '/rebar-planting/': [
                        { loc: `${siteUrl}/images/rebar-planting-hero.webp`, title: "تزريع الأشاير" },
                        { loc: `${siteUrl}/images/rebar-planting-1.webp`, title: "تزريع أشاير لاستكمال الأعمدة والتعلية" },
                        { loc: `${siteUrl}/images/rebar-planting-2.webp`, title: "تزريع أشاير للسلالم وربطها بالخرسانة" },
                        { loc: `${siteUrl}/images/rebar-planting-3.webp`, title: "تثبيت أنكر كيميائي" }
                    ]
                };

                // Go through routes to generate sitemap
                let hasImages = false;

                for (const route of routes) {
                    // ignore 404 page
                    if (route.route === '/404') continue;

                    let routePath = route.route === '/' ? '/' : `${route.route}/`;
                    const fullUrl = `${siteUrl}${routePath === '/' ? '' : routePath}`;
                    const priority = routePath === '/' ? '1.0' : '0.8';
                    const changefreq = 'weekly';

                    // 1) Page Entry (No images)
                    const pageEntry = `  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
                    pageEntries.push(pageEntry);

                    // 2) Image Entry
                    const images = pageImageMap[routePath] || [];
                    if (images.length > 0) {
                        hasImages = true;
                        let imgEntry = `  <url>\n    <loc>${fullUrl}</loc>\n`;
                        images.forEach(img => {
                            imgEntry += `    <image:image>\n      <image:loc>${img.loc}</image:loc>\n      <image:title>${img.title}</image:title>\n    </image:image>\n`;
                        });
                        imgEntry += `  </url>`;
                        imageEntries.push(imgEntry);
                    }
                }

                // --- 1. Generate Pages Sitemap ---
                const pagesContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageEntries.join('\n')}
</urlset>
`;
                await writeFile(join(outDir, 'sitemap-pages.xml'), pagesContent, 'utf-8');
                console.log(`✅ Generated Pages Sitemap: sitemap-pages.xml`);

                // --- 2. Generate Images Sitemap ---
                const imagesContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries.join('\n')}
</urlset>
`;
                await writeFile(join(outDir, 'sitemap-images.xml'), imagesContent, 'utf-8');
                console.log(`✅ Generated Images Sitemap: sitemap-images.xml`);

                // --- 3. Generate Index Sitemap ---
                const indexContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
                await writeFile(join(outDir, 'sitemap-index.xml'), indexContent, 'utf-8');
                console.log(`✅ Generated Sitemap Index: sitemap-index.xml`);

                // --- 4. Update Robots.txt ---
                try {
                    const robotsPath = join(outDir, 'robots.txt');
                    const robotsContent = await readFile(robotsPath, 'utf-8');
                    let updatedRobots = robotsContent.replace(/Sitemap: .*/g, '').trim();

                    // Ensure /admin is blocked
                    if (!updatedRobots.includes('Disallow: /admin')) {
                        updatedRobots = updatedRobots.replace('User-agent: *', 'User-agent: *\nDisallow: /admin');
                    }

                    updatedRobots += `\n\nSitemap: ${siteUrl}/sitemap-index.xml\n`;
                    await writeFile(robotsPath, updatedRobots, 'utf-8');
                    console.log(`✅ Updated robots.txt with sitemap-index.xml link and blocked /admin.`);
                } catch (e) {
                    console.warn("Could not handle robots.txt automatic update:", e.message);
                }
            },
        },
    };
}
