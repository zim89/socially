'use client'

import { useState } from 'react'
import { toggleFollow } from '@/actions/user.actions'
import { Loader2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from './ui/button'

export function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)

    try {
      await toggleFollow(userId)
      toast.success('User followed successfully')
    } catch (error) {
      console.error('[Error following user]: ', error)
      toast.error('Error following user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      size={'sm'}
      variant={'secondary'}
      onClick={handleFollow}
      disabled={isLoading}
      className='w-20'
    >
      {isLoading ? <Loader2Icon className='size-4 animate-spin' /> : 'Follow'}
    </Button>
  )
}
