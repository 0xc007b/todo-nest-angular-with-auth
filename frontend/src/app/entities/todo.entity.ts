export class Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  description: string;

  constructor(
    id: number,
    title: string,
    isCompleted: boolean,
    description: string,
  ) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
    this.description = description;
  }
}
