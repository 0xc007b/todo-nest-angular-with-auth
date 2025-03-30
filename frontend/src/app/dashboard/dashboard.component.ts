import { Component, OnInit } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";
import { TodosService } from "../todos.service";
import { Todo } from "../entities/todo.entity";
import { NavbarComponent } from "../components/navbar/navbar.component";

@Component({
  selector: "app-dashboard",
  imports: [InputComponent, NavbarComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  currentUser: any;

  onSearchChange = (value: string) => {
    console.log("Search value:", value);
  };

  toggleTodoStatus = (id: number) => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );
  };

  async getTodos() {
    const todos = await this.todosService.getTodos(this.currentUser.id);
    this.todos = todos;
  }

  editTodo = (id: number) => {
    console.log("Edit todo with id:", id);
  };

  deleteTodo = (id: number) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  todos: Todo[] = [];

  async ngOnInit(): Promise<void> {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    await this.getTodos();
  }
}
