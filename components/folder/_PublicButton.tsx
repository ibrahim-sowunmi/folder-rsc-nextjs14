import { togglePublic } from '@/lib/action'
import React from 'react'

const PublicButton = ({ id, isPublic }) => {
  return (
    <form action={togglePublic}>
      <input type='hidden' name='id' value={id} />
      <input type='hidden' name='isPublic' value={isPublic} />
      <button>
        {isPublic ? 'public' : 'private'}
      </button>
    </form>
  )
}

export default PublicButton