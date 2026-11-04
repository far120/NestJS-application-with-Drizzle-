import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { UsersService } from './users.service.js';
import { LoginUserDto } from './dtos/login-user.dto.js';

@Controller()
export class UsersController {

    constructor(private readonly users: UsersService) {}


    
@Get("/api/users")
async GetAllUsers() {
    return await this.users.getAllUsers();
}
@Get("/api/users/:id")
async GetUserById(@Param('id') id: number) {
   return await this.users.getUserById(id);

}

@Post("/api/users")
async CreateUser(@Body() body: CreateUserDto) {
    return await this.users.createUser(body);
}

@Post("/api/users/login")
async LoginUser(@Body() body: LoginUserDto) {
    return await this.users.loginUser(body);
}

@Put("/api/users/:id")
async UpdateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.users.updateUser(id, body);
}

@Delete("/api/users/:id")
async DeleteUser(@Param('id') id: number) {
    return await this.users.deleteUser(id);
}
}