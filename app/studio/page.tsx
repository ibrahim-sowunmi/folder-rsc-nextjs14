import React from 'react'
import FolderList from '@/components/folder/FolderList'
import FolderForm from '@/components/folder/FolderForm'
import { getSessionUser } from '@/lib/auth-helper';
import CreateForm from '@/components/create/CreateForm';
import LooseCanvasList from '@/components/canvas/LooseCanvasList';


const Studio = async () => {
  const user = await getSessionUser()

  if (!user) {
    return <p className='flex h-full item-center justify-center '>Please log in</p>;
  }

  return (
    <div>
      <CreateForm />
      <FolderForm />
      <FolderList />
      <LooseCanvasList />
    </div>
  )
}

export default Studio