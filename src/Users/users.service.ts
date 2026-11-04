import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto.js";
import { UpdateUserDto } from "./dtos/update-user.dto.js";
import { DATABASE } from "../database/database.provider.js";
import type { Database } from "../database/database.provider.js";
import { users } from "../database/schema/users.schema.js";
import { eq } from "drizzle-orm";


@Injectable()
export class UsersService {

        constructor(@Inject(DATABASE) private readonly db: Database) {}

      

        public async getAllUsers() {
            return await this.db.select().from(users);
          
        }


        public async getUserById(id: number) {
           const [user] = await this.db.select().from(users).where(eq(users.id, id));
           if (!user) {
                throw new NotFoundException('User not found');
            }
           return user
        }


        public async createUser(user: CreateUserDto) {
           const [newuser] = await this.db.insert(users).values(user).returning();
           return newuser;
        }


        public async updateUser(id: number, user: UpdateUserDto) {
            const[newuser] = await this.db.update(users).set(user).where(eq(users.id, id)).returning();
            if (!newuser) {
                throw new NotFoundException(`User with id ${id} not found.`);
            }
            return { message: `User with id ${id} updated successfully.`, updatedUser: newuser };
        }


        public async deleteUser(id: number) {
           const [deletedUser] = await this.db.delete(users).where(eq(users.id, id)).returning();
           return { message: `User with id ${id} deleted successfully.`, deletedUser };
        }
}