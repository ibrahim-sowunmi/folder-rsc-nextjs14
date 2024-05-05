import CanvasList from '@/components/canvas/CanvasList';
import CreateForm from '@/components/create/CreateForm';
import FolderList from '@/components/folder/FolderList';
import { getSessionUser } from '@/lib/auth-helper'
import React from 'react'

const Folder = async ({ params }) => {
  const user = await getSessionUser()

  if (!user || !user.id) {
    console.error("User is undefined or missing an ID.");
    return (
      <p>
        Please log in
      </p>
    )
  }

  return (
    <div>
      <div>        
        <CreateForm params={params} />
        <FolderList params={params} />
        <CanvasList params={params} />
      </div>
    </div>
  )
}

export default Folder