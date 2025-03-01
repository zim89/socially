'use client'

import { useState } from 'react'
import {
  getProfileByUsername,
  getUserPosts,
  updateProfile,
} from '@/actions/profile.actions'
import { toggleFollow } from '@/actions/user.actions'
import { SignInButton, useUser } from '@clerk/nextjs'
import { format } from 'date-fns'
import {
  CalendarIcon,
  EditIcon,
  FileTextIcon,
  HeartIcon,
  LinkIcon,
  MapPinIcon,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { PostCard } from '@/components/post-card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

type User = Awaited<ReturnType<typeof getProfileByUsername>>
type Posts = Awaited<ReturnType<typeof getUserPosts>>

interface ProfilePageClientProps {
  user: NonNullable<User>
  posts: Posts
  likedPosts: Posts
  isFollowing: boolean
}

export function ProfileDetails({
  isFollowing: initialIsFollowing,
  likedPosts,
  posts,
  user,
}: ProfilePageClientProps) {
  const { user: currentUser } = useUser()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false)

  const [editForm, setEditForm] = useState({
    name: user.name || '',
    bio: user.bio || '',
    location: user.location || '',
    website: user.website || '',
  })

  const handleEditSubmit = async () => {
    const formData = new FormData()
    Object.entries(editForm).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const result = await updateProfile(formData)
    if (result.success) {
      setShowEditDialog(false)
      toast.success('Profile updated successfully')
    }
  }

  const handleFollow = async () => {
    if (!currentUser) return

    try {
      setIsUpdatingFollow(true)
      await toggleFollow(user.id)
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.log('[handleFollow catch]', error)
      toast.error('Failed to update follow status')
    } finally {
      setIsUpdatingFollow(false)
    }
  }

  const isOwnProfile =
    currentUser?.username === user.username ||
    currentUser?.emailAddresses[0].emailAddress.split('@')[0] === user.username

  const formattedDate = format(new Date(user.createdAt), 'MMMM yyyy')

  return (
    <div className='mx-auto max-w-3xl'>
      <div className='grid grid-cols-1 gap-6'>
        <div className='mx-auto w-full max-w-lg'>
          <Card className='bg-card'>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center'>
                <Avatar className='h-24 w-24'>
                  <AvatarImage src={user.image ?? '/avatar.png'} />
                </Avatar>
                <h1 className='mt-4 text-2xl font-bold'>
                  {user.name ?? user.username}
                </h1>
                <p className='text-muted-foreground'>@{user.username}</p>
                <p className='mt-2 text-sm'>{user.bio}</p>

                {/* PROFILE STATS */}
                <div className='mt-6 w-full'>
                  <div className='mb-4 flex justify-between'>
                    <div>
                      <div className='font-semibold'>
                        {user._count.following.toLocaleString()}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Following
                      </div>
                    </div>
                    <Separator orientation='vertical' />
                    <div>
                      <div className='font-semibold'>
                        {user._count.followers.toLocaleString()}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        Followers
                      </div>
                    </div>
                    <Separator orientation='vertical' />
                    <div>
                      <div className='font-semibold'>
                        {user._count.posts.toLocaleString()}
                      </div>
                      <div className='text-sm text-muted-foreground'>Posts</div>
                    </div>
                  </div>
                </div>

                {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
                {!currentUser ? (
                  <SignInButton mode='modal'>
                    <Button className='mt-4 w-full'>Follow</Button>
                  </SignInButton>
                ) : isOwnProfile ? (
                  <Button
                    className='mt-4 w-full'
                    onClick={() => setShowEditDialog(true)}
                  >
                    <EditIcon className='mr-2 size-4' />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className='mt-4 w-full'
                    onClick={handleFollow}
                    disabled={isUpdatingFollow}
                    variant={isFollowing ? 'outline' : 'default'}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                )}

                {/* LOCATION & WEBSITE */}
                <div className='mt-6 w-full space-y-2 text-sm'>
                  {user.location && (
                    <div className='flex items-center text-muted-foreground'>
                      <MapPinIcon className='mr-2 size-4' />
                      {user.location}
                    </div>
                  )}
                  {user.website && (
                    <div className='flex items-center text-muted-foreground'>
                      <LinkIcon className='mr-2 size-4' />
                      <a
                        href={
                          user.website.startsWith('http')
                            ? user.website
                            : `https://${user.website}`
                        }
                        className='hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                  <div className='flex items-center text-muted-foreground'>
                    <CalendarIcon className='mr-2 size-4' />
                    Joined {formattedDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue='posts' className='w-full'>
          <TabsList className='h-auto w-full justify-start rounded-none border-b bg-transparent p-0'>
            <TabsTrigger
              value='posts'
              className='flex items-center gap-2 rounded-none px-6 font-semibold data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent'
            >
              <FileTextIcon className='size-4' />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value='likes'
              className='flex items-center gap-2 rounded-none px-6 font-semibold data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent'
            >
              <HeartIcon className='size-4' />
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value='posts' className='mt-6'>
            <div className='space-y-6'>
              {posts.length > 0 ? (
                posts.map(post => (
                  <PostCard key={post.id} post={post} dbUserId={user.id} />
                ))
              ) : (
                <div className='py-8 text-center text-muted-foreground'>
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value='likes' className='mt-6'>
            <div className='space-y-6'>
              {likedPosts.length > 0 ? (
                likedPosts.map(post => (
                  <PostCard key={post.id} post={post} dbUserId={user.id} />
                ))
              ) : (
                <div className='py-8 text-center text-muted-foreground'>
                  No liked posts to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className='space-y-4 py-4'>
              <div className='space-y-2'>
                <Label>Name</Label>
                <Input
                  name='name'
                  value={editForm.name}
                  onChange={e =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder='Your name'
                />
              </div>
              <div className='space-y-2'>
                <Label>Bio</Label>
                <Textarea
                  name='bio'
                  value={editForm.bio}
                  onChange={e =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className='min-h-[100px]'
                  placeholder='Tell us about yourself'
                />
              </div>
              <div className='space-y-2'>
                <Label>Location</Label>
                <Input
                  name='location'
                  value={editForm.location}
                  onChange={e =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  placeholder='Where are you based?'
                />
              </div>
              <div className='space-y-2'>
                <Label>Website</Label>
                <Input
                  name='website'
                  value={editForm.website}
                  onChange={e =>
                    setEditForm({ ...editForm, website: e.target.value })
                  }
                  placeholder='Your personal website'
                />
              </div>
            </div>
            <div className='flex justify-end gap-3'>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
