import type { Metadata } from 'next'

import PageHeader from '@/app/(dashboard)/_components/PageHeader'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Gallery - ECarry Photography',
  description: 'Dashboard',
}


const GalleryPage = () => {
  return (
    <div>
      <div className="">
        <PageHeader
          title="All Photos"
          label='Add Photo'
          icon='Plus'
        />
      </div>
      
      <div className="mt-6 pb-6">
        <PhotoGallery />
      </div>
    </div>
  )
}

export default GalleryPage
