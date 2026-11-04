import { IsString } from "class-validator";

export class LoginUserDto {

    @IsString({ message: 'Email must be a string' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    password: string;

}