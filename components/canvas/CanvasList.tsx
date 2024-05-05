import React from 'react'
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth-helper';
import { deleteCanvas, getCanvasesForFolder, updateCanvasName } from '@/lib/actions/canvas';
import EditField from '../EditField';

import { Canvas } from '@prisma/client';
import DeleteButton from '../DeleteButton';



const CanvasList = async ({ params }) => {
  const user = await getSessionUser()

  if (!user) {
    return <p>Please log in</p>;
  }


  const canvases = await getCanvasesForFolder(params.id)
  return (
    <>
      <ul>
        {canvases.map((canvas: Canvas) => {
          return (
            <li key={canvas.id} className='flex justify-between items-center px-6 py-4 mb-4 border border-base-300 rounded-lg shadow-sm'>
              <h2 className='text-lg'>
                <EditField id={canvas.id} name={canvas.name} action={updateCanvasName} />
              </h2>

              <div className='flex gap-6 items-center'>
                {/* <PublicButton id={folder.id} isPublic={folder.public} /> */}
                <Link href={`${params.id}/canvas/${canvas.id}`} className='btn btn-accent btn-xs' >
                  edit
                </Link>
                <DeleteButton id={canvas.id} action={deleteCanvas} />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default CanvasList