// src/seed.ts

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import payload from 'payload'
import type { User, Media, Post, Event, Form } from './payload-types'
import payloadConfig from './payload.config'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

dotenv.config({
  path: path.resolve(dirname, '../.env'),
})

/**
 * The seed function. It creates a default user, uploads media, and creates sample data.
 */
export const seed = async () => {
  console.log('Seeding database...')

  // Initialize Payload
  try {
    await payload.init({
      config: payloadConfig,
    })
  } catch (e) {
    console.error('Error initializing Payload:', e)
    process.exit(1)
  }

  // --- 1. Find or Create a Default Admin User ---
  console.log('--- Finding or creating default admin user... ---')
  let adminUser: User | undefined
  try {
    const { docs } = await payload.find({
      collection: 'users',
      where: { email: { equals: 'dev@mcrc.org' } },
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
          email: 'dev@mcrc.org',
          password: 'password',
          name: 'Dev Admin',
          role: 'admin',
        },
      })
      console.log('✅ Default admin user created.')
    }
  } catch (e: unknown) {
    console.error(`Error finding or creating admin user: ${e}`)
  }

  if (!adminUser) {
    console.error('Could not create or find an admin user. Aborting further seeding.')
    process.exit(1)
  }

  // --- 2. Upload Placeholder Media ---
  console.log('\n--- Uploading placeholder media... ---')
  let eventImage: Media | undefined
  let postImage1: Media | undefined
  try {
    ;[eventImage, postImage1] = await Promise.all([
      payload.create({
        collection: 'media',
        data: { alt: 'Placeholder for events' },
        filePath: path.resolve(dirname, 'seed-media/event-placeholder.jpg'),
      }),
      payload.create({
        collection: 'media',
        data: { alt: 'Placeholder for blog posts' },
        filePath: path.resolve(dirname, 'seed-media/post-placeholder-1.jpg'),
      }),
    ])
    console.log('✅ Placeholder media uploaded.')
  } catch (err) {
    console.error('Error uploading media:', err)
  }

  // --- 3. Create Sample Blog Posts ---
  console.log('\n--- Creating sample blog posts... ---')
  try {
    if (adminUser && postImage1) {
      await payload.create({
        collection: 'posts',
        data: {
          title: 'Our First Blog Post',
          content: {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [
                    { text: 'This is the content of our first seeded blog post. Welcome!' },
                  ],
                },
              ],
            } as any,
          },
          authors: [adminUser.id],
          heroImage: postImage1.id,
          _status: 'published',
        },
      })
      console.log('✅ Sample blog posts created.')
    } else {
      console.log('Skipping blog post creation due to missing admin user or image.')
    }
  } catch (err) {
    console.error('Error creating blog posts:', err)
  }

  // --- 4. Create Sample Events ---
  console.log('\n--- Creating sample events... ---')
  try {
    if (adminUser && eventImage) {
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
                },
              ],
            } as any,
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
    } else {
      console.log('Skipping event creation due to missing admin user or image.')
    }
  } catch (err) {
    console.error('Error creating events:', err)
  }

  // --- 5. Create Intake Form ---
  console.log('\n--- Creating intake form... ---')
  try {
    await payload.create({
      collection: 'forms',
      data: {
        title: 'Conflict Resolution Intake Form',
        submitButtonLabel: 'Submit Inquiry',
        confirmationType: 'message',
        confirmationMessage: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Thank you! Your intake form has been submitted successfully. A coordinator will be in touch with you shortly.',
                  },
                ],
              },
            ],
          },
        } as any,
        fields: [
          { blockType: 'text', name: 'fullName', label: 'Full Name', required: true },
          { blockType: 'text', name: 'phoneNumber', label: 'Phone Number', required: true },
          { blockType: 'email', name: 'emailAddress', label: 'Email Address', required: false },
        ],
      },
    })
    console.log('✅ Intake form created.')
  } catch (err) {
    console.error('Error creating intake form:', err)
  }

  console.log('\n--- Seeding complete! ---')
  process.exit(0)
}

// Execute the seed function
seed()
