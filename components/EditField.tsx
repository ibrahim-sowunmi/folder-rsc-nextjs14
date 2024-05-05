'use client'

import React from 'react'
import { useState, useRef, useEffect } from 'react';


const EditField = ({ id, name, action }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [lastValidValue, setLastValidValue] = useState(name);
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDoubleClick = () => {
    setIsEdit(true);
    setInputValue(lastValidValue);
  };

  const handleBlur = () => {
    if (inputRef.current) {
      if (inputValue.trim() === '') {
        console.error("The value cannot be empty.");
        setInputValue(lastValidValue); // Reset to last valid value if input is empty
      } else {
        setLastValidValue(inputValue); // Update last valid value on successful edit
        inputRef.current.form.requestSubmit();
      }
    }
  };

  return (
    <>
      {isEdit ?
        <form onSubmit={() => {setIsEdit(!isEdit)}} action={action}>
          <input
            type="hidden"
            name="id"
            value={id}
          />
          <input
            type="text"
            name="name"
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button className="hidden" type="submit">Submit</button>
        </form> :
        <button
          onDoubleClick={handleDoubleClick}
        >
          {name}
        </button>
      }
    </>
  )

}

export default EditField