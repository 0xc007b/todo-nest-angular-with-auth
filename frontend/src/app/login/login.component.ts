import { Component } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";
import { ButtonComponent } from "../components/core/button/button.component";

@Component({
  selector: "app-login",
  imports: [InputComponent, ButtonComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {}
