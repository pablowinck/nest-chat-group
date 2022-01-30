import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    // if (this.prisma.user.findFirst({ where: { email: createUserDto.email } })) {
    //   throw new HttpException(
    //     "User with this email already exists",
    //     HttpStatus.CONFLICT
    //   );
    // }
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: bcrypt.hashSync(createUserDto.password, 10),
        profileImage: createUserDto.profileImage,
        createdAt: new Date(),
      },
    });
  }

  login(loginUserDto: LoginUserDto) {
    // bcrypt.hash(loginUserDto.password, 10).then((hash) => {
    //   console.log("password", hash);
    // });

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

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    return user.then((data) => {
      bcrypt.hash(loginUserDto.password, 10).then((hash) => {
        bcrypt.compare(hash, data.password, (err, result) => {
          if (err)
            throw new HttpException("Wrong password", HttpStatus.BAD_REQUEST);
        });
      });

      // if (data.password !== loginUserDto.password) {
      //   throw new HttpException(
      //     "Password is incorrect",
      //     HttpStatus.UNAUTHORIZED
      //   );
      // }
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

  findOne(id: number) {
    if (!id) throw new HttpException("id is required", HttpStatus.BAD_REQUEST);
    const user = this.prisma.user.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
