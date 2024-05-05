import { createCanvas } from '@/lib/actions/canvas'
import React from 'react'

const CreateCanvas = async ({ params }) => {

  return (
    <form action={createCanvas}>
      {
        params ? <input type='hidden' name='id' value={params.id}/> : <input type='hidden' name='id'/>
      }
      <button type='submit' className='btn'>New Canvas</button>
    </form>
  )
}

export default CreateCanvas