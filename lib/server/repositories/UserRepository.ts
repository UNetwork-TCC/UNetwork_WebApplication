import { Repository } from "@/lib/api-framework/database";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ResponseDTO } from "../../api-framework/models";
import { User } from "../models";
import { BaseRepository } from "./BaseRepository";
import type { IUser } from "@/types";
import { UserDTO } from "@/types/dto";

@Repository
export class UserRepository extends BaseRepository<IUser> {
    constructor() { super(User) }

    async getFollowers(id: string): Promise<ResponseDTO<UserDTO>> { return await User.findById(id).populate('followers') }
    async login(email: string, password: string) {
        const user = await User.findOne({ email })

        if (!user) {
            return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return null
        }

        const roles = user.admin ? ['admin', 'user'] : ['user'];
        const token = jwt.sign({
            id: user._id,
            roles: roles,
            admin: user.admin
        }, process.env.JWT_SECRET as string)

        return {
            user,
            token
        } as unknown as ResponseDTO<{ user: IUser, token: string }>
    }
}
