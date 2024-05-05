import React from 'react'
import { createFolder } from '@/lib/actions/folder'

const FolderForm = async () => {
  return (
    <form action={createFolder}>
      <div className='join w-full mb-8'>
        <input
          type='text'
          className='input input-bordered join-item w-full'
          placeholder='File Name'
          name="name"
          required
        />
        <button type='submit' className='btn btn-primary join-item'>New Folder</button>
      </div>
    </form>
  )
}

export default FolderForm