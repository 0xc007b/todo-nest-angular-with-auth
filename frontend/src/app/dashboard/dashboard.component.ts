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
}
