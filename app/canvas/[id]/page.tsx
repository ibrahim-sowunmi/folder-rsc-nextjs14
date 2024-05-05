import { getSessionUser } from '@/lib/auth-helper'
import prisma from '@/lib/db';
import React from 'react'

const Canvas = async ({ params }) => {
  const user = await getSessionUser()

  if (!user || !user.id) {
    console.error("User is undefined or missing an ID.");
    return (
      <p>
        Please log in
      </p>
    )
  }

  console.log(params)
  const canvasData = await prisma.canvas.findUnique({
    where: {
      id: params.id
    }
  })

  return (
    <div>
      <h1>Canvas Data</h1>
      <div>
        <p>
          {canvasData.data}
        </p>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Canvas