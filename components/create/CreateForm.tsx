import React from 'react'
import CreateFolder from './CreateFolder'
import CreateCanvas from './CreateCanvas'


const CreateForm = async ({ params }) => {
  console.log(params)
  return (
    <div className='flex py-4 space-x-4'>
      <div>
        <CreateFolder params={params} />
      </div>
      <div>
        <CreateCanvas params={params}/>
      </div>
    </div>
  )
}

export default CreateForm
