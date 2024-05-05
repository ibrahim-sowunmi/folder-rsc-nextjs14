'use server'

import prisma from "@/lib/db";
import { getSessionUser } from "@/lib/auth-helper";
import { revalidatePath } from "next/cache";

export const deleteCanvas = async (formData: { get: (arg0: string) => void; }) => {
  const id = formData.get("id")
  await prisma.canvas.delete({
    where: { id }
  })
  revalidatePath('/studio')

}


export async function updateCanvasName(formData: { get: (arg0: string) => void; }) {
  const id = formData.get("id")
  const name = formData.get("name")

  await prisma.canvas.update({
    where: {
      id: id
    },
    data: {
      name: name
    }
  })

  revalidatePath('/studio')
}


export async function getCanvasesForFolder(folderId: String) {
  const canvases = await prisma.canvas.findMany({
    where: {
      FolderId: folderId
    },
    select: {
      id: true,
      UserId: true,
      FolderId: true,
      name: true,
      isPublic: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return canvases
}

export async function getLooseCanvasForUser(id: String) {
  try {
    const canvases = await prisma.canvas.findMany({
      where: {
        UserId: id,
        FolderId: null
      },
    });


    revalidatePath('/studio')
    return canvases;
  } catch (error) {
    console.error('Error fetching folder:', error);
    return [];
  }

}