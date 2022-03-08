import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { ChannelsService } from "src/channels/channels.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly channelsService: ChannelsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.prisma.user
      .findFirst({ where: { email: createUserDto.email } })
      .then((user) => {
        if (user)
          throw new HttpException(
            "Email already exists",
            HttpStatus.BAD_REQUEST
          );
      });

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: bcrypt.hashSync(createUserDto.password, 10),
        profileImage: createUserDto.profileImage,
        createdAt: new Date(),
      },
    });

    await this.channelsService.addMember(1, user.id);

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user
      .findUnique({
        where: { email: loginUserDto.email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          profileImage: true,
          enable: true,
        },
        rejectOnNotFound: true,
      })
      .then((user) => {
        return user;
      });

    if (!user.enable)
      throw new HttpException("User is disabled", HttpStatus.UNAUTHORIZED);

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

    if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
      throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);
    }
    const { id, name, email, profileImage } = user;
    return {
      id: id,
      name: name,
      email: email,
      profileImage: profileImage,
    };
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.login({
      email: updateUserDto.email,
      password: updateUserDto.password,
    });
    const { name, email, profileImage, createdAt } = await this.prisma.user
      .update({
        where: { id },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          profileImage: updateUserDto.profileImage,
        },
      })
      .then((user) => {
        return user;
      });

    return {
      id,
      name,
      email,
      profileImage,
      createdAt,
    };
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async disable(id: number, currentPassword: string) {
    const { password } = await this.findOne(id);

    if (!bcrypt.compareSync(currentPassword, password))
      throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);

    return await this.prisma.user.update({
      where: { id },
      data: {
        enable: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        createdAt: true,
        enable: true,
      },
    });
  }
}
