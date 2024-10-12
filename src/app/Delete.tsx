'use client'

import React from 'react'

interface DeleteBtnProps {
  id: string | number;
}

function DeleteBtn({ id }: DeleteBtnProps) {

    const handleDelete = async (id: string | number) => {
        const confirmed = confirm("Are you sure??")

        if (confirmed) {
            const response = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                alert("Post deleted")
                window.location.reload(); //refresh
            }
        }
    }

  return (
    <a onClick={() => handleDelete(id)} className='bg-red-500 text-white border py-2 px-2 rounded-md text-lg '>delete</a>
  )
}

export default DeleteBtn






/*
//jsx:
'use client'

import React from 'react'

function DeleteBtn({ id }) {

    const handleDelete = async (id) => {
        const confirmed = confirm("Are you sure??")

        if (confirmed) {
            const response = await fetch(`http://localhost:3000/api/post?id=${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                alert("Post deleted")
                window.location.reload();
            }
        }
    }
  return (
    <a onClick={handleDelete} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg '></a>
  )
}

export default DeleteBtn
*/