import { fetchAlbumPhotos } from "@/data/photo";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AlbumIdPageGalleryProps {
  albumId: string;
}

const AlbumIdPageGallery = async ({
  albumId
}: AlbumIdPageGalleryProps) => {
  if (!albumId) {
    return null
  }

  const album = await fetchAlbumPhotos(albumId)

  if (!album) {
    return null
  }

  const photos = album.photos

  if (!photos) {
    return null
  }

  return (
    <div 
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
      "
    >
      {photos.map(photo => (
        <div key={photo.id}>
          <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
            <Image 
              src={photo.imageUrl} 
              alt=""
              fill
              className="object-cover cursor-pointer hover:scale-105 transition"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  )
}

export default AlbumIdPageGallery
