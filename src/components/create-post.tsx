'use client'

import { useEffect, useState } from 'react'
import { createPost } from '@/actions/post.actions'
import { useUser } from '@clerk/nextjs'
import { ImageIcon, Loader2Icon, SendIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { ImageUpload } from './image-upload'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Textarea } from './ui/textarea'

export function CreatePost() {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return

    setIsPosting(true)

    try {
      const result = await createPost(content, imageUrl)
      if (result?.success) {
        setContent('')
        setImageUrl('')
        setShowImageUpload(false)

        toast.success('Post created successfully')
      }
    } catch (error) {
      console.error('Failed to create post:', error)
      toast.error('Failed to create post')
    } finally {
      setIsPosting(false)
    }
  }

  useEffect(() => {
    console.log('[imageUrl]: ', imageUrl)
  }, [imageUrl])

  return (
    <Card className='mb-6'>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='flex space-x-4'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={user?.imageUrl || '/avatar.png'} />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className='min-h-[100px] resize-none border-none p-0 text-base focus-visible:ring-0'
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {/* UPLOAD IMAGE */}
          {(showImageUpload || imageUrl) && (
            <div className='rounded-lg border p-4'>
              <ImageUpload
                endpoint='postImage'
                value={imageUrl}
                onChange={url => {
                  setImageUrl(url)
                  if (!url) setShowImageUpload(false)
                }}
              />
            </div>
          )}

          <div className='flex items-center justify-between border-t pt-4'>
            <div className='flex space-x-2'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='text-muted-foreground hover:text-primary'
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
              >
                <ImageIcon className='mr-2 size-4' />
                Photo
              </Button>
            </div>
            <Button
              className='flex items-center'
              onClick={handleSubmit}
              disabled={(!content.trim() && !imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className='mr-2 size-4 animate-spin' />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className='mr-2 size-4' />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
