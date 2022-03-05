import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    login(loginUserDto: LoginUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        profileImage: string;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        profileImage: string;
        createdAt: Date;
    }>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    disable(id: number, currentPassword: string): Promise<{
        name: string;
        email: string;
        profileImage: string;
        createdAt: Date;
        enable: boolean;
        id: number;
    }>;
}
