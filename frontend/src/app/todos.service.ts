import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TodosService {
  constructor() {}

  async getTodos(userId: string): Promise<any[]> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(environment.apiUrl + "/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message || "Failed to fetch todos");
    }

    return body;
  }

  async createTodo(userId: string, todo: any): Promise<any> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(environment.apiUrl + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todo),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message || "Failed to create todo");
    }

    return body;
  }

  async updateTodo(
    userId: string,
    todoId: string,
    updatedTodo: any,
  ): Promise<any> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(environment.apiUrl + `/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTodo),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message || "Failed to update todo");
    }

    return body;
  }

  async deleteTodo(userId: string, todoId: string): Promise<any> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(environment.apiUrl + `/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return true;
    }

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message || "Failed to delete todo");
    }

    return body;
  }

  async deleteAllTodos(userId: string): Promise<any> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(environment.apiUrl + "/todos", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return true;
    }

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message || "Failed to delete all todos");
    }

    return body;
  }
}
