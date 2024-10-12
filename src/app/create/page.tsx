'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';

function CreatePostPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [catagory, setCatagory] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content || !catagory) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: session?.user?.name,
          title,
          DateA: new Date().toISOString(),
          content,
          catagory
        }),

      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        throw new Error('ไม่สามารถสร้างโพสต์ได้ กรุณาลองใหม่อีกครั้ง');
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      }
      console.error("Error creating post:", error);
    }
  }

  return (
    <div className='container mx-auto py-10'>
      <h3 className='text-3xl font-bold not-italic'>Create Note</h3>
      <hr className='my-4' />
      <Link href='/dashboard' className='bg-gray-500 inline-block text-white border py-2 px-4 rounded my-2'>กลับหน้าหลัก</Link>
      {error && <p className="text-red-500 my-2">{error}</p>}

      <div className='flex justify-center'>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className='w-[500px] lg:w-[1000px] block bg-gray-200  py-2 px-3 rounded text-lg text-black my-2 border-2 border-slate-700'
            placeholder='หัวข้อโพสต์'
            value={title}
          />

          <select
            onChange={(e) => setCatagory(e.target.value)}
            className='w-[500px] lg:w-[1000px]  block bg-gray-200 py-2 px-3 rounded text-lg text-black my-2 border-2 border-slate-700'
            value={catagory}
          >
            <option value="">-- กรุณาเลือกหมวดหมู่ --</option>
            <option value="normal">ทั่วไป</option>
            <option value="news">ข่าว</option>
            <option value="mutalu">ดูดวง</option>
            <option value="event">กิจกรรม</option>
            <option value="sport">กีฬา</option>
           </select>

          <textarea
            onChange={(e) => setContent(e.target.value)}
            className='w-[500px] lg:w-[1000px] block bg-gray-200 py-2 px-3 rounded text-lg text-black my-2 border-2 border-slate-700'
            placeholder='เนื้อหาโพสต์'
            value={content}
            rows={10}
          />
          <button type='submit' className='bg-green-500 text-black-200 border py-2 px-3 rounded text-lg my-2'>
            สร้างโน้ต
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
