'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface History {
  version: number;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

interface PostHistory {
  _id: string;
  title: string;
  history: History[];
}

interface Props {
  params: {
    id: string;
  };
}

const HistoryPage = ({ params }: Props) => {
  const { id } = params;
  const [historyData, setHistoryData] = useState<History[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}/history`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Error fetching history data');
      }

      const data: PostHistory = await response.json();
      setHistoryData(data.history);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  }, [id]); 

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]); 

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className='container mx-auto py-10'>
      <h3 className='text-3xl font-bold'>Edit History for "{historyData.length > 0 ? historyData[0].title : 'Note'}"</h3>
      <hr className='my-3' />
      <button onClick={() => router.back()} className='bg-gray-500 text-white border py-2 px-3 rounded my-2'>
        Back
      </button>

      <div className='history-list mt-5'>
        {historyData.length > 0 ? (
          historyData.map((history, index) => (
            <div key={index} className='border p-4 mb-4 rounded'>
              <p className='text-lg font-bold'>Version {history.version}</p>
              <p><strong>Title:</strong> {history.title}</p>
              <p><strong>Category:</strong> {history.category}</p>
              <p><strong>Content:</strong> {history.content}</p>
              <p><strong>Updated At:</strong> {new Date(history.updatedAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No edit history available.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;

