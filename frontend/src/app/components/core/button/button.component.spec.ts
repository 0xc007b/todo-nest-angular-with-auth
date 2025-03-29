import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";
import { DomSanitizer } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ButtonComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have default variant primary", () => {
    expect(component.variant).toBe("primary");
  });

  it("should have default appearance solid", () => {
    expect(component.appearance).toBe("solid");
  });

  it("should emit click event when clicked", () => {
    spyOn(component.buttonClick, "emit");
    const buttonElement = fixture.nativeElement.querySelector("button");
    buttonElement.click();
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it("should be disabled when disabled is true", () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector("button");
    expect(buttonElement.disabled).toBeTruthy();
  });

  it("should be disabled when loading is true", () => {
    component.isLoading = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector("button");
    expect(buttonElement.disabled).toBeTruthy();
  });
});
