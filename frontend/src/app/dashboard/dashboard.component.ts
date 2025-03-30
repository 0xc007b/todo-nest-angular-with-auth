import { Component, OnInit } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { TodosService } from "../todos.service";
import { Todo } from "../entities/todo.entity";

@Component({
  selector: "app-dashboard",
  imports: [InputComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private todosService: TodosService,
    private router: Router,
  ) {}

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
    const currentUser = await this.authService.getCurrentUser();

    if (!currentUser) {
      console.log("User not authenticated, redirecting to login");
      this.router.navigate(["/login"]);
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.currentUser = currentUser;

    await this.getTodos();
  }
}
