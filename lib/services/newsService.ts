import type { INews } from "@/types";
import { Service } from "./Service";

class NewsService extends Service<INews> {
  constructor() { super('/news') }
}

export const newsService = new NewsService();
