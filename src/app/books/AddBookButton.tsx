'use client'

import { useState } from 'react'
import AddBookForm from './AddBookForm'

export default function AddBookButton() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Add New Book
      </button>

      {showForm && <AddBookForm onClose={() => setShowForm(false)} />}
    </>
  )
} 