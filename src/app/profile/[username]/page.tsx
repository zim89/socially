import { notFound } from 'next/navigation'
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/actions/profile.actions'
import { ProfileDetails } from './profile-details'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username
  const user = await getProfileByUsername(username)
  if (!user) return

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  }
}

export default async function ProfilePageServer({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username
  const user = await getProfileByUsername(username)

  if (!user) notFound()

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ])

  return (
    <ProfileDetails
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  )
}
