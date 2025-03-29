import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputComponent } from "./input.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should have default type "text"', () => {
    expect(component.type).toBe("text");
  });

  it("should generate a unique ID if not provided", () => {
    expect(component.id).toMatch(/input-\d+/);
  });

  it("should emit input changes", () => {
    spyOn(component.valueChange, "emit");

    const inputElement = fixture.nativeElement.querySelector("input");
    inputElement.value = "test value";

    const event = new Event("input");
    inputElement.dispatchEvent(event);

    expect(component.valueChange.emit).toHaveBeenCalledWith("test value");
  });

  it("should toggle password visibility", () => {
    component.type = "password";
    fixture.detectChanges();

    expect(component.showPassword).toBeFalse();
    component.togglePassword();
    expect(component.showPassword).toBeTrue();
  });

  it("should handle error state", () => {
    component.state = "error";
    component.errorMessage = "This field is required";
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector("small");
    expect(errorMessage.textContent.trim()).toBe("This field is required");
  });
});
