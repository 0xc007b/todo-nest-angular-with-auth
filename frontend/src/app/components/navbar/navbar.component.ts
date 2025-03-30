import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  imports: [],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  currentUser: any;

  async ngOnInit(): Promise<void> {
    const currentUser = await this.authService.getCurrentUser();

    if (!currentUser) {
      console.log("User not authenticated, redirecting to login");
      this.router.navigate(["/login"]);
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.currentUser = currentUser;
  }
}
