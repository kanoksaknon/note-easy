'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import DeleteBtn from '../Delete';
import Image from 'next/image';

interface Post {
  _id: string;
  name: string;
  title: string;
  Date: Date;
  content: string;
  catagory: string;
}

export default function Home() {
  //posts
  const [posts, setPosts] = useState<Post[]>([]);

  //set router
  const router = useRouter();

  //set sort
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  //sort function
  const sortPosts = (postsArray: Post[]): Post[] => {
    return [...postsArray].sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  };

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data: Post[] = await response.json();
      setPosts(sortPosts(data));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    setPosts(prevPosts => sortPosts(prevPosts));
    router.refresh();
  }, [sortOrder]);

  return (
    <main className='container mx-auto my-3 p-3 '>
      <div className='flex'>
        <h1>APP NOTE-EASY </h1>
        <Image src="/images/note-icon.png" width={30} height={30} alt="" />
      </div>

      <hr className="my-3" />

      <Link href='/create' className='bg-green-500 p-3 text-white rounded inline-block'>Create Note</Link>

      <select
        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        value={sortOrder}
        className="ml-4 p-2 border rounded text-black"
      >
        <option value="asc">เรียงจากเวลาน้อยไปมาก</option>
        <option value="desc">เรียงจากเวลามากไปน้อย</option>
      </select>

      <Link href='/History' className='bg-red-500 p-3 ml-4 text-white rounded inline-block'>History Note</Link>



      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-3 gap-5'>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className='shadow-xl my-10 p-10 rounded-xl border-2 border-slate-700'>
              <h1 className='text-2xl'>{post.title}</h1>
              <h2>{post.name}</h2>
              <p>วันที่ : {post.Date}</p>
              <p className='text-lg'>หมวดหมู่ : {post.catagory}</p>
              <p>{post.content}</p>
              <div className='mt-5 space-x-2'>
                <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg' href={`/edit/${post._id}`}>Edit</Link>
                <DeleteBtn id={post._id} />
              </div>
            </div>
          ))
        ) : (
          <p className='bg-gray-300 p-3 mt-3 col-span-full text-black'>
            You do not have any posts yet.
          </p>
        )}
      </div>
    </main>
  );
}

//หน้า edit, delete สามารถเปลี่ยนได้
//px is padding
//mt is margin-top

//{post && post.length > 0 ? ( เอาไว้เช็คว่ามากกว่า0จริง
//You do not have any posts yet. ทำเช็คว่าไม่มีข้อมูล

//desc มากไปน้อย
//asc น้อยไปมาก