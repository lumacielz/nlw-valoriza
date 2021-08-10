import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticatedRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email,password}:IAuthenticatedRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);
        const user = await usersRepositories.findOne({
            email
        });
        if (!user){
            throw new Error ("Email/Password incorrect")
        }

        const passwordMatch = await compare(password,user.password);
        if(!passwordMatch) {
            throw new Error ("Email/Password incorrect")
        }

        const token = sign({
            email: user.email
        },"81dc9bdb52d04dc20036dbd8313ed055",{
            subject: user.id,
            expiresIn:"1d"
        });
        return token;
    }
}

export { AuthenticateUserService }