export type commentType = {
  status: number;
  _id: string;
  writer: {
    _id: string;
    name: string;
  };
  postId: string;
  responseTo: null | string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
