'use client'

import { redirect } from "next/navigation"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const DeleteEventButton = ({ slug }: { slug: string }) => {
  const handleDelete = async () => {
    await fetch(`${BASE_URL}/api/events/${slug}` , {
      method: "DELETE",
      body: slug
    })
    redirect('/')
  }
  return (
    <button 
      className="bg-red-500 p-4 rounded-sm text-white"
      onClick={handleDelete}
    >
      Delete
    </button>
  )
}

export default DeleteEventButton