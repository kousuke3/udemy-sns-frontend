import React, { useEffect, useState } from 'react';
import Post from './Post';
import apiClient from '@/lib/apiClient';
import { postType } from '@/types/types';

const Timeline = () => {
  const [content, setContent] = useState('');
  const [latestPosts, setLatestPosts] = useState<postType[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get('/posts/get_latest_posts');
        if (response.status === 200) {
          setLatestPosts(response.data);
        } else {
          throw new Error('最新の投稿の取得に失敗しました。');
        }
      } catch (error) {
        console.error('最新の投稿の取得中にエラーが発生しました:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) {
      alert('内容を入力してください。');
      return;
    }

    try {
      const response = await apiClient.post('/posts/post', {
        content,
      });
      console.log(response);

      if (response.status !== 201) {
        throw new Error('投稿に失敗しました。');
      }

      const postData = response.data;
      console.log('投稿成功:', postData);
      setLatestPosts((prevPosts) => [postData, ...prevPosts]); // 最新の投稿を配列に追加
      console.log('latestpost:', latestPosts);
      setContent(''); // content stateをクリア
    } catch (error: any) {
      console.error('エラーが発生しました:', error);
      if (error.response && error.response.status === 401) {
        alert('ログインが必要です。');
      } else {
        alert('エラーが発生しました。');
      }
      setContent(''); // エラー時にもcontentをリセット
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
