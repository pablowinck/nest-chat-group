import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    login(loginUserDto: LoginUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        profileImage: string;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        profileImage: string;
        createdAt: Date;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    disable(id: string, data: {
        password: string;
    }): Promise<{
        name: string;
        email: string;
        profileImage: string;
        createdAt: Date;
        enable: boolean;
        id: number;
    }>;
}
