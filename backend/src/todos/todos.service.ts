import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Todo as PrismaTodo } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { TokenUserDto } from 'src/auth/dto/token-user.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async createTodo(
    createTodoDto: CreateTodoDto,
    user: TokenUserDto,
  ): Promise<Todo> {
    const createdTodo: PrismaTodo = await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        userId: user.sub,
      },
    });
    return new Todo(
      createdTodo.id,
      createdTodo.userId,
      createdTodo.title,
      createdTodo.isCompleted,
      createdTodo.description,
    );
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo: PrismaTodo = await this.prisma.todo.update({
      where: { id },
      data: {
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        isCompleted: updateTodoDto.isCompleted || false,
      },
    });
    return new Todo(
      updatedTodo.id,
      updatedTodo.userId,
      updatedTodo.title,
      updatedTodo.isCompleted,
      updatedTodo.description,
    );
  }

  async deleteTodo(id: string): Promise<Todo> {
    const deletedTodo: PrismaTodo = await this.prisma.todo.delete({
      where: { id },
    });
    return new Todo(
      deletedTodo.id,
      deletedTodo.userId,
      deletedTodo.title,
      deletedTodo.isCompleted,
      deletedTodo.description,
    );
  }

  async getTodos(user: TokenUserDto): Promise<Todo[]> {
    const todos: PrismaTodo[] = await this.prisma.todo.findMany({
      where: { userId: user.sub },
    });
    return todos.map(
      (todo) =>
        new Todo(
          todo.id,
          todo.userId,
          todo.title,
          todo.isCompleted,
          todo.description,
        ),
    );
  }

  async getTodo(id: string): Promise<Todo> {
    const todo: PrismaTodo | null = await this.prisma.todo.findUnique({
      where: { id },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return new Todo(
      todo.id,
      todo.userId,
      todo.title,
      todo.isCompleted,
      todo.description,
    );
  }
}
