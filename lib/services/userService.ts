import { IUser } from "@/types"
import { Service } from "./Service"

class UserService extends Service<IUser> {
    constructor() { super('/user') }

    async login(data: { email: string, password: string }) {
        return await this.request(`${this.url}/login`, 'POST', data)
    }
}

export const userService = new UserService()