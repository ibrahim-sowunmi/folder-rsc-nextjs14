import React from 'react'
import { getSessionUser } from '@/lib/auth-helper'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createFolderV2 } from '@/lib/actions/folder'

const CreateFolder = async ({ params }) => {
  return (
    <form action={createFolderV2}>
      {
        params ? <input type='hidden' name='id' value={params.id}/> : <input type='hidden' name='id'/>
      }
      <button type='submit' className='btn'>New Folder</button>
    </form>
  )
}


export default CreateFolder