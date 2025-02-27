'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getDbUserId } from './user.actions'

export async function createPost(content: string, image: string) {
  try {
    const userId = await getDbUserId()

    if (!userId) return

    const post = await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    })

    revalidatePath('/') // purge the cache for the home page
    return { success: true, post }
  } catch (error) {
    console.error('Failed to create post:', error)
    return { success: false, error: 'Failed to create post' }
  }
}
