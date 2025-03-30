import { Component } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";

@Component({
  selector: "app-dashboard",
  imports: [InputComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  onSearchChange = (value: string) => {
    console.log("Search value:", value);
  };

  toggleTodoStatus = (id: number) => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
  };

  editTodo = (id: number) => {
    console.log("Edit todo with id:", id);
  };

  deleteTodo = (id: number) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  todos = [
    {
      id: 1,
      title: "Task 1",
      completed: false,
      description: "Description for Task 1",
    },
    {
      id: 2,
      title: "Task 2",
      completed: true,
      description: "Description for Task 2",
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
      description: "Description for Task 3",
    },
  ];
}
