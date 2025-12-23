import {
  Controller,
  Get,
  Query
} from '@/lib/api-framework/decorators'
import { createNextRouteHandlers } from '@/lib/api-framework/funcs'
import { BaseController } from '@/lib/api-framework/models'
import { UserRepository } from '@/lib/server/repositories'
import { Forum, News, Post } from '@/lib/server/models'

interface SearchResults {
  users: any[]
  forums: any[]
  news: any[]
  posts: any[]
}

// Helper para extrair dados do ResponseDTO (o decorator @Repository encapsula tudo)
function extractData<T>(response: any): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return response.data as T
  }
  return response as T
}

@Controller
class SearchController extends BaseController {
  constructor(private userRepository = new UserRepository()) {
    super()
  }

  @Get
  async search(
    @Query('q') query: string,
    @Query('type') type: string,
    @Query('limit') limitStr: string
  ): Promise<SearchResults> {
    const limit = parseInt(limitStr) || 10
    const results: SearchResults = {
      users: [],
      forums: [],
      news: [],
      posts: []
    }

    if (!query || query.length < 2) {
      return results
    }

    const regex = new RegExp(query, 'i')
    const searchType = type || 'all'

    // Buscar usuários (extrair data do ResponseDTO)
    if (searchType === 'all' || searchType === 'users') {
      const userResult = await this.userRepository.search(query, limit)
      results.users = extractData<any[]>(userResult) || []
    }

    // Buscar fóruns
    if (searchType === 'all' || searchType === 'forums') {
      results.forums = await Forum.find({
        $or: [
          { title: { $regex: regex } },
          { description: { $regex: regex } },
          { topic: { $regex: regex } }
        ]
      })
        .limit(limit)
        .lean()
    }

    // Buscar notícias
    if (searchType === 'all' || searchType === 'news') {
      results.news = await News.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } }
        ]
      })
        .limit(limit)
        .lean()
    }

    // Buscar posts
    if (searchType === 'all' || searchType === 'posts') {
      results.posts = await Post.find({
        'content.text': { $regex: regex }
      })
        .limit(limit)
        .lean()
    }

    return results
  }
}

export const { GET } = createNextRouteHandlers(SearchController)
