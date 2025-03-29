# Input Component Examples

Here are some examples showing how to use the `InputComponent` in various configurations. You can add these examples to a demonstration page in your application.

```html
<!-- Example Usage -->
<div class="space-y-8 p-6">
  <h2 class="text-xl font-medium mb-4">Input Component Examples</h2>
  
  <!-- Default Text Input -->
  <div>
    <h3 class="text-lg font-medium mb-2">Default Text Input</h3>
    <app-input 
      label="Name"
      placeholder="Enter your name"
      name="name"
      autocomplete="name"
      (valueChange)="onNameChange($event)">
    </app-input>
  </div>
  
  <!-- Input States -->
  <div>
    <h3 class="text-lg font-medium mb-2">Input States</h3>
    <div class="flex flex-col gap-4">
      <!-- Error state -->
      <app-input 
        label="Name"
        placeholder="Enter your name"
        name="name"
        state="error"
        errorMessage="Error: Name field is required">
      </app-input>
      
      <!-- Success state -->
      <app-input 
        label="Name"
        placeholder="Enter your name"
        name="name"
        state="success"
        value="John">
      </app-input>
    </div>
  </div>
  
  <!-- Phone Input with Mask -->
  <div>
    <h3 class="text-lg font-medium mb-2">Phone Input with Mask</h3>
    <app-input 
      label="Phone"
      placeholder="(555) 555-5555"
      type="tel"
      name="phone"
      autocomplete="tel-national"
      mask="(000) 000-0000">
    </app-input>
  </div>
  
  <!-- Search Input -->
  <div>
    <h3 class="text-lg font-medium mb-2">Search Input</h3>
    <app-input 
      type="search"
      placeholder="Search"
      name="search"
      isFullWidth="true">
    </app-input>
  </div>
  
  <!-- Password Input -->
  <div>
    <h3 class="text-lg font-medium mb-2">Password Input</h3>
    <app-input 
      type="password"
      label="Password"
      placeholder="Enter your password"
      name="password"
      autocomplete="current-password">
    </app-input>
  </div>
  
  <!-- Full-width Input -->
  <div>
    <h3 class="text-lg font-medium mb-2">Full-width Input</h3>
    <app-input 
      label="Full Name"
      placeholder="Enter your full name"
      name="fullName"
      isFullWidth="true">
    </app-input>
  </div>
  
  <!-- Disabled Input -->
  <div>
    <h3 class="text-lg font-medium mb-2">Disabled Input</h3>
    <app-input 
      label="Username"
      value="johndoe"
      name="username"
      disabled="true">
    </app-input>
  </div>
  
  <!-- Email Input -->
  <div>
    <h3 class="text-lg font-medium mb-2">Email Input</h3>
    <app-input 
      type="email"
      label="Email Address"
      placeholder="your@email.com"
      name="email"
      autocomplete="email">
    </app-input>
  </div>
</div>
