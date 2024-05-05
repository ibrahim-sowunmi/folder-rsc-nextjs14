import React from 'react'
import CreateFolder from './CreateFolder'
import CreateCanvas from './CreateCanvas'

const CreateForm = async () => {
  return (
    <div className='flex py-4 space-x-4'>
      <div>
        <CreateFolder />
      </div>
      <div>
        <CreateCanvas />
      </div>
    </div>
  )
}

export default CreateForm
