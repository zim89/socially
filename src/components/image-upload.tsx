'use client'

import Image from 'next/image'
import { XIcon } from 'lucide-react'
import { UploadButton } from '@/lib/uploadthing'

interface ImageUploadProps {
  onChange: (url: string) => void
  value: string
  endpoint: 'postImage'
}

export function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className='relative size-40'>
        <Image
          src={value}
          alt='Upload'
          fill
          className='size-40 rounded-md object-cover'
        />
        <button
          onClick={() => onChange('')}
          className='absolute right-0 top-0 rounded-full bg-red-500 p-1 shadow-sm'
          type='button'
        >
          <XIcon className='h-4 w-4 text-white' />
        </button>
      </div>
    )
  }
  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.error('[UPLOAD ERROR]: ', error)
      }}
    />
  )
}
