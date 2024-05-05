import React from 'react'
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth-helper';
import { getAllFoldersForUser, updateFolderName, deleteFolder } from '@/lib/actions/folder';
import DeleteButton from '../DeleteButton';
import PublicButton from './PublicButton';
import EditField from '../EditField';

import { Folder } from '@prisma/client';


const FolderList = async ({ params }) => {
  let folders;
  const user = await getSessionUser()

  if (!user) {
    return <p>Please log in</p>;
  }

  if (params) {
    folders = await getAllFoldersForUser(user.id, params.id)
  } else {
    folders = await getAllFoldersForUser(user.id)
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
                <PublicButton isPublic={folder.isPublic} />
                {
                  params ?
                    <Link href={`${folder.id}`} className='btn btn-accent btn-xs' >
                      edit
                    </Link> :
                    <Link href={`studio/${folder.id}`} className='btn btn-accent btn-xs' >
                      edit
                    </Link>
                }
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