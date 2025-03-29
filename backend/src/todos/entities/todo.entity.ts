export class Todo {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    title: string,
    isCompleted: boolean = false,
    description?: string | null,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description || null;
    this.isCompleted = isCompleted;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
