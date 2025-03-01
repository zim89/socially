import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

export function NotificationsSkeleton() {
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader className='border-b'>
          <div className='flex items-center justify-between'>
            <CardTitle>Notifications</CardTitle>
            <Skeleton className='h-4 w-20' />
          </div>
        </CardHeader>
        <CardContent className='p-0'>
          <ScrollArea className='h-[calc(100vh-12rem)]'>
            {skeletonItems.map(index => (
              <div key={index} className='flex items-start gap-4 border-b p-4'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-40' />
                  </div>
                  <div className='space-y-2 pl-6'>
                    <Skeleton className='h-20 w-full' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
