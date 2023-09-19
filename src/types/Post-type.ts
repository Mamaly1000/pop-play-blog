export type postType = {
  title: string;
  titleBrief: string;
  slug: string;
  briefText: string;
  category: {
    _id: string;
    title: string;
    englishTitle: string;
  } | null;
  text: string;
  coverImage: string;
  readingTime: string;
  _id: string;
  status: number | null;
  commentsCount: number | null;
  likesCount: number | null;
  isBookmarked: false;
  isLiked: false;
  tags: unknown[];
  related: postType[];
  comments: unknown[];
  hashId: string;
  author: {
    biography: string;
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number | null;
};
