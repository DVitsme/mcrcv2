// src/seed.ts

import path from 'path'
import { fileURLToPath } from 'url' // Import for ES Module path resolution
import dotenv from 'dotenv'
import payload from 'payload'
import type { User } from './payload-types'
import payloadConfig from './payload.config'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

dotenv.config({
  path: path.resolve(dirname, '../.env'),
})

/**
 * The seed function. It creates a default user, uploads media, and creates sample posts and events.
 */
export const seed = async () => {
  console.log('Seeding database...')

  // Initialize Payload
  await payload.init({
    config: payloadConfig,
  })

  // --- 1. Find or Create a Default Admin User ---
  console.log('Finding or creating default admin user...')
  let adminUser: User | undefined

  try {
    const { docs } = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'dvalentine2012@gmail.com',
        },
      },
      limit: 1,
    })

    if (docs.length > 0) {
      adminUser = docs[0]
      console.log('✅ Found existing admin user.')
    } else {
      console.log('No admin user found. Creating one...')
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'dvalentine2012@gmail.com',
          password: 'password', // This will be hashed automatically
          name: 'Derrick',
          role: 'admin',
        },
      })
      console.log('✅ Default admin user created.')
    }
  } catch (e: unknown) {
    console.error(`Error finding or creating admin user: ${e}`)
  }

  if (!adminUser) {
    console.error('Could not create or find an admin user. Aborting seed.')
    process.exit(1)
  }

  // --- 2. Upload Placeholder Media ---
  console.log('Uploading placeholder media...')
  try {
    const [eventImage, postImage1] = await Promise.all([
      payload.create({
        collection: 'media',
        data: { alt: 'Placeholder for events' },
        filePath: path.resolve(dirname, 'seed-media/event-placeholder.jpg'), // Use 'dirname'
      }),
      payload.create({
        collection: 'media',
        data: { alt: 'Placeholder for blog posts' },
        filePath: path.resolve(dirname, 'seed-media/post-placeholder-1.jpg'), // Use 'dirname'
      }),
    ])
    console.log('✅ Placeholder media uploaded.')

    // --- 3. Create Sample Blog Posts ---
    console.log('Creating sample blog posts...')
    await payload.create({
      collection: 'posts',
      data: {
        title: 'Our First Blog Post',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [{ text: 'This is the content of our first seeded blog post. Welcome!' }],
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        authors: [adminUser.id],
        heroImage: postImage1.id,
        _status: 'published',
      },
    })
    console.log('✅ Sample blog posts created.')

    // --- 4. Create Sample Events ---
    console.log('Creating sample events...')
    await payload.create({
      collection: 'events',
      data: {
        name: 'Community Peace Circle',
        slug: 'community-peace-circle-seed',
        status: 'published',
        eventType: 'Community Meeting',
        summary:
          'Join us for a monthly peace circle to discuss community issues and build connections.',
        description: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'An open and inclusive space for community members to share perspectives and foster understanding. All are welcome.',
                  },
                ],
                version: 1,
              },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        eventStartTime: new Date('2025-07-15T18:00:00.000Z').toISOString(),
        eventEndTime: new Date('2025-07-15T20:00:00.000Z').toISOString(),
        modality: 'in_person',
        location: {
          venueName: 'Columbia Public Library',
          address: '10375 Little Patuxent Pkwy, Columbia, MD',
        },
        isFree: true,
        isRegistrationRequired: false,
        createdBy: adminUser.id,
        featuredImage: eventImage.id,
      },
    })
    console.log('✅ Sample events created.')
  } catch (err) {
    console.error('Error during seeding:', err)
  }

  console.log('--- Seeding complete! ---')
  process.exit(0)
}

// Execute the seed function
seed()
