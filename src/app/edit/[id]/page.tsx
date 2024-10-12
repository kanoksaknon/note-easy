/*
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Post {
  _id: string;
  name: string;
  title: string;
  Date: Date;
  content: string;
  catagory: string;
}

interface Props {
  params: {
    id: string;
  };
}

function EditPostPage({ params }: Props) {
  const { id } = params;

  const [postData, setPostData] = useState<Post | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCatagory, setNewCatagory] = useState('')

  const router = useRouter();

  const getPostById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Error fetching data')
      }

      const data = await response.json();
      console.log("edit post", data)
      setPostData(data.post)

    } catch (error) {
      console.error("Error fetching post:", error)
    }
  }

  useEffect(() => {
    getPostById(id)
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the current date and time
    const currentDate = new Date();

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newTitle, currentDate, newContent, newCatagory })
      })

      if (!response.ok) {
        throw new Error('Error updating post')
      }

      router.refresh();
      router.push('/dashboard');

    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  if (!postData) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto py-10'>
      <h3 className='text-3xl font-bold'>Edit Note</h3>
      <hr className='my-3' />
      <Link href='/' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Back to Home</Link>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg text-black my-2'
          placeholder={postData.title}
          value={newTitle}
        />

        <select
          onChange={(e) => setNewCatagory(e.target.value)}
          className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg text-black my-2'
          value={newCatagory}
        >
          <option value="normal">ทั่วไป</option>
          <option value="news">ข่าว</option>
          <option value="mutalu">ดูดวง</option>
          <option value="event">กิจกรรม</option>
        </select>

        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-black text-lg my-2'
          placeholder={postData.content}
          value={newContent}
          rows={10}
        />

        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>Update Note</button>
      </form>
    </div>
  )
}

export default EditPostPage 
*/


//เอาไอดีมาจากparam เพื่อทำการดึงข้อมูล และแก้ไข จาก edit

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  name: string;
  title: string;
  Date: Date;
  content: string;
  catagory: string;
  history: {
    version: number;
    title: string;
    content: string;
    category: string;
    updatedAt: Date;
  }[];
}

interface Props {
  params: {
    id: string;
  };
}

function EditPostPage({ params }: Props) {
  const { id } = params;

  const [postData, setPostData] = useState<Post | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const router = useRouter();

  const getPostById = async (id: string) => {

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setPostData(data.post);
    } catch (error) {
      console.error('Error fetching post:', error);

    }
  };

  useEffect(() => {
    getPostById(id);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the current date and time
    const currentDate = new Date();

    // ตรวจสอบและกำหนดค่าเวอร์ชันของประวัติการแก้ไข
    const version = (postData?.history?.length || 0) + 1;

    // Prepare the updated data and history entry
    const updatedPost = {
      name: postData?.name,
      newTitle: newTitle || postData?.title, // ถ้าไม่ได้แก้ไขจะใช้ชื่อเดิม
      newContent: newContent || postData?.content, // ถ้าไม่ได้แก้ไขจะใช้เนื้อหาเดิม
      newCategory: newCategory || postData?.catagory, // ถ้าไม่ได้แก้ไขจะใช้หมวดหมู่เดิม
      currentDate,
      previousTitle: postData?.title,
      previousContent: postData?.content,
      previousCategory: postData?.catagory,
      version, // ใช้ค่าที่กำหนดเวอร์ชัน
    };

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error('Error updating post');
      }

      router.refresh();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  return (
    <div className='container mx-auto py-10'>
      <h3 className='text-3xl font-bold'>Edit Note</h3>
      <hr className='my-3' />
      <Link href='/dashboard' className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2 border-2 border-slate-700'>
        Back to Home
      </Link>

      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            type='text'
            className='w-[500px] lg:w-[1000px] block bg-gray-200 py-2 px-3 rounded text-lg text-black my-2 border-2 border-slate-700'
            placeholder={postData?.title || 'Note Title'}
            value={newTitle}
          />

          <select
            onChange={(e) => setNewCategory(e.target.value)}
            className='w-[500px] lg:w-[1000px] block bg-gray-200 py-2 px-3 rounded text-lg text-black my-2 border-2 border-slate-700'
            value={newCategory}
          >
            <option value="">-- กรุณาเลือกหมวดหมู่ --</option>
            <option value='normal'>ทั่วไป</option>
            <option value='news'>ข่าว</option>
            <option value='mutalu'>ดูดวง</option>
            <option value='event'>กิจกรรม</option>
            <option value="sport">กีฬา</option>
          </select>

          <textarea
            onChange={(e) => setNewContent(e.target.value)}
            className='w-[500px] lg:w-[1000px] block bg-gray-200 border py-2 px-3 rounded text-black text-lg my-2'
            placeholder={postData?.content || 'Note Content'}
            value={newContent}
            rows={10}
          />

          <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;

