import { Component } from "@angular/core";
import { InputComponent } from "../components/core/input/input.component";
import { ButtonComponent } from "../components/core/button/button.component";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [InputComponent, ButtonComponent, FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading: boolean = false;
  errorMessage: string | null = null;

  authData = {
    emailOrUsername: "",
    password: "",
  };

  async login(event: Event): Promise<void> {
    event.preventDefault();
    this.isLoading = true;
    try {
      await this.authService.login(
        this.authData.emailOrUsername,
        this.authData.password,
      );
      // Redirect to the dashboard or any other page
      this.router.navigate(["/dashboard"]);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
    this.isLoading = false;
  }
}
