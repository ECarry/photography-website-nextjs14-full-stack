'use client'

import Link from "next/link";
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

import DeleteAction from "@/app/(dashboard)/_components/DeleteAction";

interface PhotoCardProps {
  title: string;
  id: string;
  description: string | null;
  imageUrl: string;
}

const PhotoCard = ({
  title,
  id,
  description,
  imageUrl
}: PhotoCardProps) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="border-muted-foreground border rounded-xl overflow-hidden">
      {/* IMAGE  */}
      <div 
        className="
          aspect-w-16
          aspect-h-10
          w-full
          overflow-hidden
          rounded-xl
          bg-muted
        ">
          <Image 
            src={imageUrl}
            alt="blur"
            fill
            sizes="(min-width: 1280px) 288px, (min-width: 1040px) calc(33.18vw - 25px), (min-width: 640px) calc(50vw - 28px), calc(100vw - 32px)"
            className={cn("rounded-xl group-hover:opacity-75 object-cover duration-700 ease-in-out hover:scale-105 hover:brightness-110",
            isLoading
              ? 'grayscale blur-xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
            )}
            onLoad={() => setLoading(false)}
          />
      </div>

      {/* FOOTER  */}
      <div className="p-4 flex justify-between gap-8">

        <div className="flex flex-col gap-4">
          <Link href={`/gallery/photos/${id}/`}>
            <h1 className="md:text-lg line-clamp-2 text-primary hover:underline underline-offset-4">
              {title}
            </h1>
          </Link>

          <p className="text-muted-foreground line-clamp-2 text-sm md:text-md">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-end justify-between gap-10">
          <div className="flex gap-2">
            <DeleteAction id={id} title={title} />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default PhotoCard
