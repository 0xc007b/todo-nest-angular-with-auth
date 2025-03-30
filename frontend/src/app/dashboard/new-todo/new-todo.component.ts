import { Component } from "@angular/core";
import { InputComponent } from "../../components/core/input/input.component";
import { ButtonComponent } from "../../components/core/button/button.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: "app-new-todo",
  imports: [InputComponent, ButtonComponent, NavbarComponent],
  templateUrl: "./new-todo.component.html",
  styleUrl: "./new-todo.component.css",
})
export class NewTodoComponent {}
