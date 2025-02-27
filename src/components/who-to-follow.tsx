import Link from 'next/link'
import { getRandomUsers } from '@/actions/user.actions'
import { FollowButton } from './follow-button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export async function WhoToFollow() {
  const users = await getRandomUsers()

  if (users.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {users.map(user => (
            <div
              key={user.id}
              className='flex items-center justify-between gap-2'
            >
              <div className='flex items-center gap-1'>
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? '/avatar.png'} />
                  </Avatar>
                </Link>
                <div className='text-xs'>
                  <Link
                    href={`/profile/${user.username}`}
                    className='cursor-pointer font-medium'
                  >
                    {user.name}
                  </Link>
                  <p className='text-muted-foreground'>@{user.username}</p>
                  <p className='text-muted-foreground'>
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
