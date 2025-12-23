import {
  Body,
  Controller,
  Post as PostMethod
} from '@/lib/api-framework/decorators'
import { createNextRouteHandlers } from '@/lib/api-framework/funcs'
import { BaseController } from '@/lib/api-framework/models'
import { User } from '@/lib/server/models'

interface BatchUsersDTO {
  ids: string[]
}

@Controller
class BatchUsersController extends BaseController {
  @PostMethod
  async getUsersByIds(@Body() body: BatchUsersDTO) {
    const { ids } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return []
    }

    // Filtrar ids nulos ou vazios
    const validIds = ids.filter(id => id && id !== 'null')

    // Buscar usuários pelos IDs (sem senha)
    const users = await User.find({ _id: { $in: validIds } })
      .select('-password')
      .lean()

    return users
  }
}

export const { POST } = createNextRouteHandlers(BatchUsersController)
