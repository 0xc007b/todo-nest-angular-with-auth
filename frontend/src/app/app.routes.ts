import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NewTodoComponent } from "./dashboard/new-todo/new-todo.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "register",
    component: RegisterComponent,
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
  },
  {
    path: "dashboard/new-todo",
    component: NewTodoComponent,
    pathMatch: "full",
  },
];
