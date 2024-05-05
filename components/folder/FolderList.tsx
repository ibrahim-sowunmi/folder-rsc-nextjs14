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
              <h2 className='flex justify-center items-center space-x-2 text-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
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