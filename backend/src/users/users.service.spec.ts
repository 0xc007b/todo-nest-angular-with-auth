import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockUser = {
    id: '1',
    username: 'testuser',
    firstname: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    passwordHash: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([mockUser]);

      const result = await service.getUsers();

      expect(result).toEqual([
        new User(
          mockUser.id,
          mockUser.username,
          mockUser.firstname,
          mockUser.lastname,
          mockUser.email,
          mockUser.passwordHash,
        ),
      ]);
      expect(mockPrismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getUserById({ id: '1' });

      expect(result).toEqual(
        new User(
          mockUser.id,
          mockUser.username,
          mockUser.firstname,
          mockUser.lastname,
          mockUser.email,
          mockUser.passwordHash,
        ),
      );
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getUserById({ id: '999' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const createUserDto = {
        username: 'newuser',
        firstName: 'New',
        lastName: 'User',
        email: 'new@example.com',
        password: 'password123',
      };

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('hashedPassword'));
      mockPrismaService.user.create.mockResolvedValue({
        id: '2',
        username: createUserDto.username,
        firstname: createUserDto.firstName,
        lastname: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash: 'hashedPassword',
      });

      const result = await service.createUser(createUserDto);

      expect(result).toEqual(
        new User(
          '2',
          createUserDto.username,
          createUserDto.firstName,
          createUserDto.lastName,
          createUserDto.email,
          'hashedPassword',
        ),
      );
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          username: createUserDto.username,
          firstname: createUserDto.firstName,
          lastname: createUserDto.lastName,
          email: createUserDto.email,
          passwordHash: 'hashedPassword',
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const updateUserDto = {
        username: 'updateduser',
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
      };

      mockPrismaService.user.update.mockResolvedValue({
        id: '1',
        username: updateUserDto.username,
        firstname: updateUserDto.firstName,
        lastname: updateUserDto.lastName,
        email: updateUserDto.email,
        passwordHash: 'hashedPassword',
      });

      const result = await service.updateUser('1', updateUserDto);

      expect(result).toEqual(
        new User(
          '1',
          updateUserDto.username,
          updateUserDto.firstName,
          updateUserDto.lastName,
          updateUserDto.email,
          'hashedPassword',
        ),
      );
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          username: updateUserDto.username,
          firstname: updateUserDto.firstName,
          lastname: updateUserDto.lastName,
          email: updateUserDto.email,
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete and return the user', async () => {
      mockPrismaService.user.delete.mockResolvedValue(mockUser);

      const result = await service.deleteUser('1');

      expect(result).toEqual(
        new User(
          mockUser.id,
          mockUser.username,
          mockUser.firstname,
          mockUser.lastname,
          mockUser.email,
          mockUser.passwordHash,
        ),
      );
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
