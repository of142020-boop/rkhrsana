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
                const sitemapEntries = [];
                const today = new Date().toISOString().split('T')[0];

                // Specific image mappings based on project structure
                const pageImageMap = {
                    '/': [
                        { loc: `${siteUrl}/images/hero-bg.webp`, title: "رواد الخرسانة للصفحة الرئيسية" }
                    ],
                    '/contact/': [
                        { loc: `${siteUrl}/images/contact-hero.webp`, title: "تواصل معنا - رواد الخرسانة" }
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
                for (const route of routes) {
                    // ignore 404 page
                    if (route.route === '/404') continue;

                    let routePath = route.route === '/' ? '/' : `${route.route}/`;

                    const images = pageImageMap[routePath] || [];

                    let priority = routePath === '/' ? '1.0' : '0.8';
                    let changefreq = 'weekly';

                    let urlEntry = `  <url>\n    <loc>${siteUrl}${routePath === '/' ? '' : routePath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n`;

                    images.forEach(img => {
                        urlEntry += `    <image:image>\n      <image:loc>${img.loc}</image:loc>\n      <image:title>${img.title}</image:title>\n    </image:image>\n`;
                    });

                    urlEntry += `  </url>`;
                    sitemapEntries.push(urlEntry);
                }

                const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries.join('\n')}
</urlset>
`;

                const sitemapPath = join(outDir, 'sitemap.xml');
                await writeFile(sitemapPath, sitemapContent, 'utf-8');
                console.log(`✅ Generated Unified Sitemap: ${sitemapPath}`);

                // Update robots.txt to point to new image sitemap
                try {
                    const robotsPath = join(outDir, 'robots.txt');
                    const robotsContent = await readFile(robotsPath, 'utf-8');
                    let updatedRobots = robotsContent.replace(/Sitemap: .*/g, '').trim();
                    updatedRobots += `\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
                    await writeFile(robotsPath, updatedRobots, 'utf-8');
                    console.log(`✅ Updated robots.txt with Unified Sitemap link.`);
                } catch (e) {
                    console.warn("Could not handle robots.txt automatic update:", e.message);
                }
            },
        },
    };
}
