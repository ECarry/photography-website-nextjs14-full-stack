import 'server-only'

import { db } from "@/lib/db";

export async function fetchECarryPhotos(page: number, limit: number) {
  const skip = (page - 1) * limit
  const take = limit
  try {
    const data = await db.photo.findMany({
      where: {
        category: {
          title: 'ecarry'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take,
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ECarry data.');
  }
}

export async function fetchPhotoInfo(id: string) {
  try {
    const data = await db.photo.findFirst({
      where: {
        id
      }
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch photo data.');
  }
}

export async function fetchAlbum() {
  try {
    const data = await db.album.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        photos: true
      }
    })

    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch album data.');
  }
}

export async function fetchAlbumPhotos(id: string) {
  try {
    const data = await db.album.findFirst({
      where: {
        id
      },
      include: {
        photos: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch album photos data.');
  }
}
