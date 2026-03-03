import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string().optional(),
        image: z.string().optional(),
        draft: z.boolean().optional(),
        seo: z.object({
            focusKeyword: z.string().optional(),
            customSlug: z.string().optional(),
            seoTitle: z.string().optional(),
            seoDescription: z.string().optional(),
            noindex: z.boolean().optional(),
            nofollow: z.boolean().optional(),
        }).optional(),
    }),
});

export const collections = {
    'blog': blogCollection,
};
