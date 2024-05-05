import React from 'react'
import prisma from '@/lib/db';
import Link from 'next/link';

const Breadcrumbs = async ({ params = {} }) => {

  if (!params) {
    return (
      <div className='py-4'>
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href={'/studio'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                <span>Studio</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const { id } = params

  async function findAllParentFolders(id) {
    let currentFolderId = id;
    const parentFolders = [];
  
    while (currentFolderId) {
      const folder = await prisma.folder.findUnique({
        where: {
          id: currentFolderId,
        },
        select: {
          id: true,
          name: true,
          parentId: true,  // Continue selecting parentId to find the next parent in the next iteration
        }
      });
  
      if (!folder) break;  
      parentFolders.push(folder);

      if (!folder.parentId) break; 
      currentFolderId = folder.parentId; 
    }
  
    return parentFolders;
  }

  const parentFolders = await (await findAllParentFolders(id)).reverse();
  
  return (
    <div className='py-4'>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href={'/studio'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              <span>Studio</span>
            </Link>
          </li>
          {
            parentFolders.map((folder) => (
              <li key={folder.id}>
                <Link href={`${folder.id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                  <span>{folder.name}</span>
                </Link>
              </li>
            ))
          }
          <li>
            <span className="inline-flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Add Canvas
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumbs