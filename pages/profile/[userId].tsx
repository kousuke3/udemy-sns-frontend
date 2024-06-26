import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';
import apiClient from '@/lib/apiClient';

import { GetServerSideProps } from 'next';
import Image from 'next/image';

interface UserProfileProps {
  profile: {
    imageUrl: string;
    bio: string;
    user: {
      username: string;
      email: string;
    };
  };
  posts: {
    id: number;
    content: string;
    createdAt: string;
    author: {
      username: string;
      profile: {
        imageUrl: string;
      };
    };
  }[];
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, posts }) => {
  const { user, imageUrl, bio } = profile;
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        {user && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <Image
                className="w-16 h-16 rounded-full mr-4"
                src={imageUrl || 'https://via.placeholder.com/150'}
                alt="User Avatar"
                width={64}
                height={64}
              />
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <p className="text-gray-700">{bio}</p>
          </div>
        )}
        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as { userId: string };
  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    const postsResponse = await apiClient.get(`/posts/${userId}`);
    if (profileResponse.status === 200 && postsResponse.status === 200) {
      return {
        props: {
          profile: profileResponse.data,
          posts: postsResponse.data,
        },
      };
    } else {
      throw new Error('ユーザー情報の取得に失敗しました。');
    }
  } catch (error) {
    console.error('ユーザー情報の取得中にエラーが発生しました:', error);
    return {
      props: {
        profile: null,
        posts: [],
      },
    };
  }
};

export default UserProfile;