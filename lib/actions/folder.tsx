'use server'

import prisma from "@/lib/db";
import { getSessionUser } from "@/lib/auth-helper";
import { revalidatePath } from "next/cache";

export const createFolderV2 = async (formData: { get: (arg0: string) => void; }) => {
  const user = await getSessionUser()

  const id = formData.get("id")
  console.log("the id is", id)

  if (id) {
    const newSubFolder = await prisma.folder.create({
      data: {
        name: "New Subfolder Name",
        isPublic: 'private',
        UserId: user.id,
        parentId: id 
      }
    });

    console.log("child folder created")
  } else {
    const newFolder = await prisma.folder.create({
      data: {
        name: "My New Folder",
        isPublic: 'private',
        UserId: user.id,
      }
    });

    console.log("Root folder created")
  }

  revalidatePath('/studio')

}

export const createFolder = async (formData: { get: (arg0: string) => void; }) => {
  const name = formData.get("name")
  const user = await getSessionUser()

  createFolderForUser(user.id, name, false)
  revalidatePath('/studio')

}

export const deleteFolder = async (formData: { get: (arg0: string) => void; }) => {
  const id = formData.get("id")
  await prisma.folder.delete({
    where: { id }
  })
  revalidatePath('/studio')

}


export async function getAllFoldersForUser(id: String, folderId?: String) {
  let folders;

  if (folderId) {
    folders = await prisma.folder.findMany({
      where: {
        parentId: folderId
      },
      orderBy: {
        createdAt: 'asc'
      },
    });
    console.log("folder id", folderId)
  } else {
    folders = await prisma.folder.findMany({
      where: {
        UserId: id,
        parentId: null
      },
      orderBy: {
        createdAt: 'asc'
      },
    });
  }

  return folders;
}


export async function getFolderForUser(id: String, folderId: String) {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        UserId: id,
        id: folderId,
      },
      include: {
        canvases: true
      },
    });

    return folder;
  } catch (error) {
    console.error('Error fetching folder:', error);
    return [];
  }
}

export async function createFolderForUser(id: String, folderName: String, isPublic: Boolean) {
  try {
    // Create a new folder for this user
    const newFolder = await prisma.folder.create({
      data: {
        name: folderName,
        UserId: id
      }
    });

    return newFolder;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;  // Or handle as needed
  }
}

export async function updateFolderName(formData: { get: (arg0: string) => void; }) {
  const id = formData.get("id")
  const name = formData.get("name")

  await prisma.folder.update({
    where: {
      id: id
    },
    data: {
      name: name
    }
  })

  revalidatePath('/studio')
}