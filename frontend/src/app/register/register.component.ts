import { Component } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";
import { ButtonComponent } from "../components/core/button/button.component";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  imports: [InputComponent, ButtonComponent, FormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading: boolean = false;
  errorMessage: string | null = null;

  userData = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async register(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;
    try {
      await this.authService.register(this.userData);
      // Redirect to the login page or dashboard after successful registration
      this.router.navigate(["/login"]);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
    this.isLoading = false;
  }
}
