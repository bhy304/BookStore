import { BaseAPI } from './https';
import type { Banner } from '@/models/banner.model';

class BannerAPI extends BaseAPI {
  async fetchBanners() {
    return this.get<Banner[]>('/banners');
  }
}

export const bannerAPI = new BannerAPI();
