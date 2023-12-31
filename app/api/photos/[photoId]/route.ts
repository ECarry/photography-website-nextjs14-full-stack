import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
  try {
    const user = await currentUser()
    const data = await req.json()

    const { id } = data

    if (!id) {
      return new NextResponse('ID is missing', { status: 400 })
    }

    const photo = await db.photo.findUnique({
      where: {
        id
      }
    })

    if (!photo) {
      return new NextResponse('Photo not found', { status: 404 })
    }

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const deletePhoto = await db.photo.delete({
      where: {
        id
      }
    })

    return NextResponse.json(deletePhoto)
  } catch (error) {
    console.log('[PHOTO_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentUser()
    const reqData = await req.json()

    const { id, data } = reqData

    if (!id) {
      return new NextResponse('ID is missing', { status: 400 })
    }

    const photo = await db.photo.findUnique({
      where: {
        id
      }
    })

    if (!photo) {
      return new NextResponse('Photo not found', { status: 404 })
    }

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatePhoto = await db.photo.update({
      where: {
        id
      },
      data
    })

    return NextResponse.json(updatePhoto)
  } catch (error) {
    console.log('[PHOTO_POST]', error);
    return new NextResponse('Internal Error', { status: 500 })
  }
}
