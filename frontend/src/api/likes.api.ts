import { BaseAPI } from './https';

interface LikeResponse {
  id: number;
  book_id: number;
  user_id: number;
}

class LikesAPI extends BaseAPI {
  async likeBook(bookId: number): Promise<LikeResponse> {
    return this.post<LikeResponse>(`/likes/${bookId}`);
  }

  async unlikeBook(bookId: number): Promise<void> {
    return this.delete<void>(`/likes/${bookId}`);
  }
}

export const likesAPI = new LikesAPI();
