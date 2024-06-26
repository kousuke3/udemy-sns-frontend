import React from 'react';
import { postType } from '../types/types';
import Link from 'next/link';

interface PostProps {
  post: postType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  console.log('post', post);
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.author?.id}`}>
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={
                post.author?.profile?.imageUrl || 'https://via.placeholder.com/150'
              }
              alt="User Avatar"
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.author?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString('ja-JP', {
                timeZone: 'Asia/Tokyo',
              })}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
