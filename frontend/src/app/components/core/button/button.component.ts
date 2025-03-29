import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

// Icon path constants for common icons
const ICONS: Record<string, string> = {
  add: '<path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />',
  // Add more icons here as needed
};

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "alternate"
  | "inverse"
  | "info"
  | "danger"
  | "warning"
  | "success";
export type ButtonAppearance = "solid" | "outline" | "ghost";
export type ButtonType = "button" | "submit" | "reset";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIconPosition = "left" | "right";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  exportAs: "appButton",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() appearance: ButtonAppearance = "solid";
  @Input() type: ButtonType = "button";
  @Input() size: ButtonSize = "md";
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() isRounded = false;
  @Input() isFullWidth = false;
  @Input() icon: string | null = null; // Name of icon or SVG path
  @Input() iconPosition: ButtonIconPosition = "left";
  @Input() ariaLabel: string | null = null;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  constructor(private sanitizer: DomSanitizer) {}

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.isLoading) {
      this.buttonClick.emit(event);
    }
  }

  // Get sanitized SVG content for the icon
  getSafeIconSvg(): SafeHtml {
    if (!this.icon) return "";

    // Check if it's a predefined icon
    if (this.icon in ICONS) {
      return this.sanitizer.bypassSecurityTrustHtml(ICONS[this.icon]);
    }

    // Otherwise use the input as custom SVG path
    return this.sanitizer.bypassSecurityTrustHtml(this.icon);
  }

  // Get classes for the button based on the variant and appearance
  getButtonClasses(): string {
    const baseClasses =
      "whitespace-nowrap font-medium tracking-wide text-center text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-100 active:outline-offset-0 disabled:opacity-75 disabled:cursor-not-allowed";

    const sizeClasses = {
      sm: "px-3 py-1",
      md: "px-4 py-2",
      lg: "px-6 py-3",
    }[this.size];

    const shapeClasses = this.isRounded ? "rounded-full" : "rounded-radius";
    const widthClasses = this.isFullWidth ? "w-full" : "";

    const flexClasses =
      this.icon || this.isLoading
        ? "inline-flex items-center justify-center gap-2"
        : "";

    // Different styles based on appearance
    let variantClasses = "";

    if (this.appearance === "solid") {
      switch (this.variant) {
        case "primary":
          variantClasses =
            "bg-primary border border-primary text-on-primary hover:opacity-75 focus-visible:outline-primary dark:bg-primary-dark dark:border-primary-dark dark:text-on-primary-dark dark:focus-visible:outline-primary-dark";
          break;
        case "secondary":
          variantClasses =
            "bg-secondary border border-secondary text-on-secondary hover:opacity-75 focus-visible:outline-secondary dark:bg-secondary-dark dark:border-secondary-dark dark:text-on-secondary-dark dark:focus-visible:outline-secondary-dark";
          break;
        case "alternate":
          variantClasses =
            "bg-surface-alt border border-surface-alt text-on-surface-strong hover:opacity-75 focus-visible:outline-surface-alt dark:bg-surface-dark-alt dark:border-surface-dark-alt dark:text-on-surface-dark-strong dark:focus-visible:outline-surface-dark-alt";
          break;
        case "inverse":
          variantClasses =
            "bg-surface-dark border border-surface-dark text-on-surface-dark hover:opacity-75 focus-visible:outline-surface-dark dark:bg-surface dark:border-surface dark:text-on-surface dark:focus-visible:outline-surface";
          break;
        case "info":
          variantClasses =
            "bg-info border border-info text-onInfo hover:opacity-75 focus-visible:outline-info dark:bg-info dark:border-info dark:text-onInfo dark:focus-visible:outline-info";
          break;
        case "danger":
          variantClasses =
            "bg-danger border border-danger text-onDanger hover:opacity-75 focus-visible:outline-danger dark:bg-danger dark:border-danger dark:text-onDanger dark:focus-visible:outline-danger";
          break;
        case "warning":
          variantClasses =
            "bg-warning border border-warning text-onWarning hover:opacity-75 focus-visible:outline-warning dark:bg-warning dark:border-warning dark:text-onWarning dark:focus-visible:outline-warning";
          break;
        case "success":
          variantClasses =
            "bg-success border border-success text-onSuccess hover:opacity-75 focus-visible:outline-success dark:bg-success dark:border-success dark:text-onSuccess dark:focus-visible:outline-success";
          break;
      }
    } else if (this.appearance === "outline") {
      switch (this.variant) {
        case "primary":
          variantClasses =
            "bg-transparent border border-primary text-primary hover:opacity-75 focus-visible:outline-primary dark:border-primary-dark dark:text-primary-dark dark:focus-visible:outline-primary-dark";
          break;
        case "secondary":
          variantClasses =
            "bg-transparent border border-secondary text-secondary hover:opacity-75 focus-visible:outline-secondary dark:border-secondary-dark dark:text-secondary-dark dark:focus-visible:outline-secondary-dark";
          break;
        case "alternate":
          variantClasses =
            "bg-transparent border border-outline text-outline hover:opacity-75 focus-visible:outline-outline dark:border-outline-dark dark:text-outline-dark dark:focus-visible:outline-outline-dark";
          break;
        case "inverse":
          variantClasses =
            "bg-transparent border border-surface-dark text-surface-dark hover:opacity-75 focus-visible:outline-surface-dark dark:border-surface dark:text-surface dark:focus-visible:outline-surface";
          break;
        case "info":
          variantClasses =
            "bg-transparent border border-info text-info hover:opacity-75 focus-visible:outline-info dark:border-info dark:text-info dark:focus-visible:outline-info";
          break;
        case "danger":
          variantClasses =
            "bg-transparent border border-danger text-danger hover:opacity-75 focus-visible:outline-danger dark:border-danger dark:text-danger dark:focus-visible:outline-danger";
          break;
        case "warning":
          variantClasses =
            "bg-transparent border border-warning text-warning hover:opacity-75 focus-visible:outline-warning dark:border-warning dark:text-warning dark:focus-visible:outline-warning";
          break;
        case "success":
          variantClasses =
            "bg-transparent border border-success text-success hover:opacity-75 focus-visible:outline-success dark:border-success dark:text-success dark:focus-visible:outline-success";
          break;
      }
    } else if (this.appearance === "ghost") {
      switch (this.variant) {
        case "primary":
          variantClasses =
            "bg-transparent text-primary hover:opacity-75 focus-visible:outline-primary dark:text-primary-dark dark:focus-visible:outline-primary-dark";
          break;
        case "secondary":
          variantClasses =
            "bg-transparent text-secondary hover:opacity-75 focus-visible:outline-secondary dark:text-secondary-dark dark:focus-visible:outline-secondary-dark";
          break;
        case "alternate":
          variantClasses =
            "bg-transparent text-outline hover:opacity-75 focus-visible:outline-outline dark:text-outline-dark dark:focus-visible:outline-outline-dark";
          break;
        case "inverse":
          variantClasses =
            "bg-transparent text-surface-dark hover:opacity-75 focus-visible:outline-surface-dark dark:text-surface dark:focus-visible:outline-surface";
          break;
        case "info":
          variantClasses =
            "bg-transparent text-info hover:opacity-75 focus-visible:outline-info dark:text-info dark:focus-visible:outline-info";
          break;
        case "danger":
          variantClasses =
            "bg-transparent text-danger hover:opacity-75 focus-visible:outline-danger dark:text-danger dark:focus-visible:outline-danger";
          break;
        case "warning":
          variantClasses =
            "bg-transparent text-warning hover:opacity-75 focus-visible:outline-warning dark:text-warning dark:focus-visible:outline-warning";
          break;
        case "success":
          variantClasses =
            "bg-transparent text-success hover:opacity-75 focus-visible:outline-success dark:text-success dark:focus-visible:outline-success";
          break;
      }
    }

    return [
      baseClasses,
      sizeClasses,
      shapeClasses,
      widthClasses,
      flexClasses,
      variantClasses,
    ]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Get classes for the loading spinner
  getSpinnerClasses(): string {
    const baseClasses = "size-5 animate-spin motion-reduce:animate-none";

    // Color based on variant
    let colorClass = "";
    if (this.appearance === "solid") {
      switch (this.variant) {
        case "primary":
          colorClass = "fill-on-primary dark:fill-on-primary-dark";
          break;
        case "secondary":
          colorClass = "fill-on-secondary dark:fill-on-secondary-dark";
          break;
        case "alternate":
          colorClass =
            "fill-on-surface-strong dark:fill-on-surface-dark-strong";
          break;
        case "inverse":
          colorClass = "fill-on-surface-dark dark:fill-on-surface";
          break;
        case "info":
          colorClass = "fill-on-info dark:fill-on-info";
          break;
        case "danger":
          colorClass = "fill-on-danger dark:fill-on-danger";
          break;
        case "warning":
          colorClass = "fill-on-warning dark:fill-on-warning";
          break;
        case "success":
          colorClass = "fill-on-success dark:fill-on-success";
          break;
      }
    } else {
      // For outline and ghost, use the variant color itself
      switch (this.variant) {
        case "primary":
          colorClass = "fill-primary dark:fill-primary-dark";
          break;
        case "secondary":
          colorClass = "fill-secondary dark:fill-secondary-dark";
          break;
        case "alternate":
          colorClass = "fill-outline dark:fill-outline-dark";
          break;
        case "inverse":
          colorClass = "fill-surface-dark dark:fill-surface";
          break;
        case "info":
          colorClass = "fill-info dark:fill-info";
          break;
        case "danger":
          colorClass = "fill-danger dark:fill-danger";
          break;
        case "warning":
          colorClass = "fill-warning dark:fill-warning";
          break;
        case "success":
          colorClass = "fill-success dark:fill-success";
          break;
      }
    }

    return `${baseClasses} ${colorClass}`;
  }

  // Get classes for the icon
  getIconClasses(): string {
    const baseClasses = "size-5";

    // Color based on variant
    let colorClass = "";
    if (this.appearance === "solid") {
      switch (this.variant) {
        case "primary":
          colorClass = "fill-on-primary dark:fill-on-primary-dark";
          break;
        case "secondary":
          colorClass = "fill-on-secondary dark:fill-on-secondary-dark";
          break;
        case "alternate":
          colorClass =
            "fill-on-surface-strong dark:fill-on-surface-dark-strong";
          break;
        case "inverse":
          colorClass = "fill-on-surface-dark dark:fill-on-surface";
          break;
        case "info":
          colorClass = "fill-on-info dark:fill-on-info";
          break;
        case "danger":
          colorClass = "fill-on-danger dark:fill-on-danger";
          break;
        case "warning":
          colorClass = "fill-on-warning dark:fill-on-warning";
          break;
        case "success":
          colorClass = "fill-on-success dark:fill-on-success";
          break;
      }
    } else {
      // For outline and ghost, use the variant color itself
      switch (this.variant) {
        case "primary":
          colorClass = "fill-primary dark:fill-primary-dark";
          break;
        case "secondary":
          colorClass = "fill-secondary dark:fill-secondary-dark";
          break;
        case "alternate":
          colorClass = "fill-outline dark:fill-outline-dark";
          break;
        case "inverse":
          colorClass = "fill-surface-dark dark:fill-surface";
          break;
        case "info":
          colorClass = "fill-info dark:fill-info";
          break;
        case "danger":
          colorClass = "fill-danger dark:fill-danger";
          break;
        case "warning":
          colorClass = "fill-warning dark:fill-warning";
          break;
        case "success":
          colorClass = "fill-success dark:fill-success";
          break;
      }
    }

    return `${baseClasses} ${colorClass}`;
  }
}
