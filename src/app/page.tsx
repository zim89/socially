import { currentUser } from '@clerk/nextjs/server'
import { CreatePost } from '@/components/create-post'

export default async function Home() {
  const user = await currentUser()

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-10'>
      <div className='lg:col-span-6'>
        {user ? <CreatePost /> : null}

        {/* <div className='space-y-6'>
          {posts.map(post => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div> */}
      </div>

      <div className='sticky top-20 hidden lg:col-span-4 lg:block'>
        WhoToFollow
      </div>
    </div>
  )
}
