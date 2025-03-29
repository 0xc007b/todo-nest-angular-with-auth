import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Directive,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Type definitions
export type InputState = "default" | "error" | "success";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date";
export type TextAlign = "left" | "right" | "center";

let nextId = 0;

// Custom directive for input masking
@Directive({
  selector: "[mask]",
  standalone: true,
})
export class InputMaskDirective {
  @Input() mask: string | null = null;
}

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, FormsModule, InputMaskDirective],
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent implements OnInit {
  // Basic input properties
  @Input() id: string = `input-${nextId++}`;
  @Input() type: InputType = "text";
  @Input() value: string = "";
  @Input() label: string | null = null;
  @Input() placeholder: string = "";
  @Input() name: string = "";
  @Input() autocomplete: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;

  // Styling and appearance
  @Input() isFullWidth = false; // Changed to boolean by default
  @Input() textAlign: TextAlign = "left";

  // State management
  @Input() state: InputState = "default";
  @Input() errorMessage: string | null = null;

  // Masking
  @Input() mask: string | null = null; // For phone numbers, credit cards, etc.

  // Events
  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

  // Password visibility toggle
  showPassword: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Set appropriate default autocomplete values based on type
    if (!this.autocomplete) {
      switch (this.type) {
        case "email":
          this.autocomplete = "email";
          break;
        case "tel":
          this.autocomplete = "tel";
          break;
        case "password":
          this.autocomplete = "current-password";
          break;
        default:
          break;
      }
    }
  }

  // Event handlers
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(target.value);
  }

  onBlur(event: FocusEvent): void {
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Get classes for the input based on state, type, etc.
  getInputClasses(): string {
    const baseClasses =
      "w-full rounded-radius border px-2 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-75 dark:focus-visible:outline-primary-dark";

    let stateClasses = "";
    switch (this.state) {
      case "error":
        stateClasses = "border-danger";
        break;
      case "success":
        stateClasses = "border-success";
        break;
      default:
        stateClasses = "border-outline dark:border-outline-dark";
        break;
    }

    const backgroundClasses = "bg-surface-alt dark:bg-surface-dark-alt/50";

    const alignmentClass =
      this.textAlign !== "left" ? `text-${this.textAlign}` : "";

    return [baseClasses, stateClasses, backgroundClasses, alignmentClass]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }
}
