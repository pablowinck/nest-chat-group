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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
                password: bcrypt_1.default.hashSync(createUserDto.password, 10),
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
            bcrypt_1.default.hash(loginUserDto.password, 10).then((hash) => {
                bcrypt_1.default.compare(hash, data.password, (err, result) => {
                    if (err)
                        throw new common_1.HttpException("Wrong password", common_1.HttpStatus.BAD_REQUEST);
                });
            });
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                profileImage: data.profileImage,
            };
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
        return this.prisma.user.update({
            where: { id },
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email,
                profileImage: updateUserDto.profileImage,
            },
        });
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