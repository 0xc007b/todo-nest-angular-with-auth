import { Component } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";
import { ButtonComponent } from "../components/core/button/button.component";

@Component({
  selector: "app-register",
  imports: [InputComponent, ButtonComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {}
