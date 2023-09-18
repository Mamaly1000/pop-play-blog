import { postType } from "./Post-type";

export type mainPostType = {
  data: {
    docs: postType[];
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    page: number | null;
    pagingCounter: number | null;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
};
