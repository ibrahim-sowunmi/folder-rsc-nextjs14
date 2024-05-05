import React from 'react'
import FolderList from '@/components/folder/FolderList'
import FolderForm from '@/components/folder/FolderForm'
import { getSessionUser } from '@/lib/auth-helper';
import CreateForm from '@/components/create/CreateForm';
import LooseCanvasList from '@/components/canvas/LooseCanvasList';
import Breadcrumbs from '@/components/studio/Breadcrumbs';


const Studio = async () => {
  const user = await getSessionUser()

  if (!user) {
    return <p className='flex h-full item-center justify-center '>Please log in</p>;
  }

  return (
    <div>
      <Breadcrumbs />
      <CreateForm />
      <FolderList />
      <LooseCanvasList />
    </div>
  )
}

export default Studio