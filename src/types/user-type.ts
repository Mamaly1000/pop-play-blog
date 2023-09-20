import { postType } from "./Post-type";
export type userType = {
  _id: string;
  isAdmin: boolean;
  biography: string;
  bookmarkedPosts: postType[];
  likedPosts: postType[];
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
