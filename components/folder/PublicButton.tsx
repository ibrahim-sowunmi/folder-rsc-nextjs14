import React from 'react'
import { isPublic } from '@prisma/client'

const PublicButton = ({ isPublic: isPublic }) => {
  return (
      <button disabled className='btn btn-xs'>
        {isPublic}
      </button>
  )
}

export default PublicButton