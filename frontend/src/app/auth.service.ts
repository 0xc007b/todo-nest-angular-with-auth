import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  async login(emailOrUsername: string, password: string): Promise<void> {
    const response = await fetch(environment.apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    localStorage.setItem("access_token", body.access_token);
  }

  async logout(): Promise<void> {
    localStorage.removeItem("access_token");
  }

  async register(userData: any): Promise<void> {
    const response = await fetch(environment.apiUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }
  }

  async getCurrentUser(): Promise<any> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(environment.apiUrl + "/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      if (!response.ok) {
        return null;
      }
      // This is a synchronous check just to see if the token exists
      // The actual user data would be fetched by a separate call when needed
      return body;
    } catch (error) {
      console.error("Error retrieving user:", error);
      return null;
    }
  }
}
