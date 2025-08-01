import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      // updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      coverImage: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
    }),
})

const projectsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      venue: z.string().optional(),
      authors: z.string(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      links: z.object({
        pdf: z.string().optional(),
        code: z.string().optional(),
        video: z.string().optional(),
        slides: z.string().optional(),
        website: z.string().optional(),
      }).optional(),
      featured: z.boolean().optional().default(false),
      thumbnail: z.string().optional(),
      coverImage: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: () =>
    z.object({
      avatarImage: z
        .object({
          src: z.string(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      githubCalendar: z.string().optional(), // GitHub username for calendar
    }),
})


export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
  home: homeCollection,
}
