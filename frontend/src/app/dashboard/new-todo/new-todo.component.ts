import { Component } from "@angular/core";
import { InputComponent } from "../../components/core/input/input.component";
import { ButtonComponent } from "../../components/core/button/button.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TodosService } from "../../todos.service";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-new-todo",
  imports: [InputComponent, ButtonComponent, NavbarComponent, FormsModule],
  templateUrl: "./new-todo.component.html",
  styleUrl: "./new-todo.component.css",
})
export class NewTodoComponent {
  constructor(
    private todosService: TodosService,
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading: boolean = false;
  errorMessage: string | null = null;

  todoData = {
    title: "",
    description: "",
  };

  async createTodo(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}",
      );
      const userId = currentUser.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      await this.todosService.createTodo(userId, {
        title: this.todoData.title,
        description: this.todoData.description,
      });

      // Redirect to the dashboard after successful creation
      this.router.navigate(["/dashboard"]);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
    this.isLoading = false;
  }
}
