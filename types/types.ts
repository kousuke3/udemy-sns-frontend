export type postType = {
  id: number;
  content: string;
  createdAt: Date;
  authorId: number;
  author: userType;
};

export type userType = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: postType[];
  profile: profileType;
};

export type profileType = {
  userId: number;
  biography: string;
  imageUrl: string;
};
