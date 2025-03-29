import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ButtonComponent } from "./components/core/button/button.component";
import { InputComponent } from "./components/core/input/input.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ButtonComponent, InputComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend";
}
