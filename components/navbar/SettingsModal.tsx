'use client'

import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { cookies } from 'next/headers';

const SettingsModal = () => {
  const [accountName, setAccountName] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    Cookies.set(accountName, { publicKey, privateKey });

    // Optionally, clear the form fields or give some user feedback
    setAccountName('');
    setPublicKey('');
    setPrivateKey('');

    // Close the modal
    document.getElementById('my_modal_2')?.close();
  }

  return (
    <>
      <span className="btn" onClick={() => document.getElementById('my_modal_2')?.showModal()}>
        Settings
      </span>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-2/5 max-w-5xl">
          <h3 className="font-bold text-lg">Settings</h3>
          <div className="divider" />
          <form onSubmit={handleFormSubmit}>
            <label className="input input-bordered flex items-center gap-2 w-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a2 2 0 104 0 2 2 0 00-4 0zM6 12a4 4 0 018 0H6z" clipRule="evenodd" />
              </svg>
              <input type="text" placeholder="Account Name" className="grow" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 18a1 1 0 100-2h12a1 1 0 100-2H4a1 1 0 110-2h12a1 1 0 110 2H4a1 1 0 000 2h12a1 1 0 110 2H4z" clipRule="evenodd" />
              </svg>
              <input type="password" placeholder="Public Key" className="grow" value={publicKey} onChange={(e) => setPublicKey(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M5 4a3 3 0 013-3h4a3 3 0 013 3v3h-2V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3H5V4zm11 8v-2a1 1 0 112 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h2v2H4v5h16v-5h-2v-2h2zm-7 2a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
              </svg>
              <input type="password" placeholder="Private Key" className="grow" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} />
            </label>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button className='ml-4 btn'
              onClick={(e) => {
                e.preventDefault()
                console.log(Cookies.get())
              }}
            >Print</button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>

        </form>
      </dialog>
    </>
  )
}

export default SettingsModal
