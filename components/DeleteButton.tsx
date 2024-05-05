import React from 'react'

const DeleteButton = ({ id, action }) => {
  return (
    <form action={action}>
      <input type='hidden' name='id' value={id} />
        <button className='btn btn-xs btn-error'>
          Delete
        </button>
    </form>)
}

export default DeleteButton