import React from 'react'
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth-helper';
import { getAllFoldersForUser, updateFolderName, deleteFolder } from '@/lib/actions/folder';
import DeleteButton from '../DeleteButton';
import PublicButton from './_PublicButton';
import EditField from '../EditField';

import { Folder } from '@prisma/client';


const FolderList = async () => {

  const user = await getSessionUser()

  if (!user) {
    return <p>Please log in</p>;
  }

  const folders = await getAllFoldersForUser(user.id)

  if (folders.length === 0) {
    return <h2>No folders to show</h2>
  }

  return (
    <>
      <ul>
        {folders.map((folder: Folder) => {
          return (
                <li key={folder.id} className='flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-sm'>
              <h2 className='text-lg'>        
                <EditField id={folder.id} name={folder.name} action={updateFolderName} />
              </h2>
              <div className='flex gap-6 items-center'>
                {/* <PublicButton id={folder.id} isPublic={folder.public} /> */}
                <Link href={`studio/${folder.id}`} className='btn btn-accent btn-xs' >
                  edit
                </Link>
                <DeleteButton id={folder.id} action={deleteFolder} />
              </div>
            </li>

          )
        })}
      </ul>
    </>
  )
}

export default FolderList