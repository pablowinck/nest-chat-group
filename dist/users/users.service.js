"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUserDto) {
        return this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: createUserDto.password,
                profileImage: createUserDto.profileImage,
                createdAt: new Date(),
            },
        });
    }
    login(loginUserDto) {
        const user = this.prisma.user.findUnique({
            where: { email: loginUserDto.email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                profileImage: true,
            },
            rejectOnNotFound: true,
        });
        if (!user)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        return user.then((data) => {
            if (data.password !== loginUserDto.password) {
                throw new common_1.HttpException("Password is incorrect", common_1.HttpStatus.UNAUTHORIZED);
            }
            return data;
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    findOne(id) {
        if (!id)
            throw new common_1.HttpException("id is required", common_1.HttpStatus.BAD_REQUEST);
        const user = this.prisma.user.findUnique({
            where: { id },
            rejectOnNotFound: true,
        });
        if (!user)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    update(id, updateUserDto) {
        this.findOne(id);
        return this.prisma.user.update({ where: { id }, data: updateUserDto });
    }
    remove(id) {
        this.findOne(id);
        return this.prisma.user.delete({ where: { id } });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map