import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ValidatorsService} from "../../services/validators.service";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit{

  // @ts-ignore
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private validators: ValidatorsService) {
    this.createForm();
    this.populateForm();
    // this.createListeners();
  }

  ngOnInit(): void {
  }

  get nameNotValid() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }
  get lastNameNotValid() {
    return this.form.get('lastName')?.invalid && this.form.get('lastName')?.touched;
  }
  get emailNotValid() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }
  get usernameExists() {
    return this.form.get('username')?.invalid && this.form.get('username')?.touched;
  }
  get streetNotValid() {
    return this.form.get('address.street')?.invalid && this.form.get('address.street')?.touched;
  }
  get cityNotValid() {
    return this.form.get('address.city')?.invalid && this.form.get('address.city')?.touched;
  }
  get hobbies(){
    return this.form.get("hobbies") as FormArray;
  }
  get ogPassNotValid() {
    return this.form.get('ogPass')?.invalid && this.form.get('ogPass')?.touched;
  }
  get repeatPassNotValid() {
    const ogPass = this.form.get("ogPass")?.value;
    const repeatPass = this.form.get("repeatPass")?.value;
    return (ogPass !== repeatPass);
  }
  createForm() {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3), this.validators.noLlacer]],
      email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],
      username: ["", , this.validators.usernameExists],
      ogPass: ["", Validators.required],
      repeatPass: ["", Validators.required],
      address: this.fb.group({
        street: ["", Validators.required],
        city: ["", Validators.required]
      }),
      hobbies: this.fb.array([])
    }, {
       validators: this.validators.equalPasswords("ogPass", "repeatPass")
      });
    console.log(this.form);
  }

  save(){
     if(this.form.invalid) {
       return Object.values(this.form.controls).forEach(control => {

         if (control instanceof FormGroup) {
           Object.values(control.controls).forEach(control => control.markAsTouched());
         } else {
           control.markAsTouched();
         }
      });
    }
  }

  private populateForm() {
    // this.form.setValue({
    this.form.reset({
      name: "Ximo",
      lastName: "Llacer",
      email: "ximo@mail.com",
      username: "HOLA",
      ogPass: "123",
      repeatPass: "123",
      address: {
        street: "Alley",
        city: "Metropolis"
      },
    });
      // ["Read", "Videogames"].forEach(value => this.hobbies.push(this.fb.control(value)));
  }

  addHobby() {
    this.hobbies.push(this.fb.control(""));
  }

  deleteHobby(i: number) {
    this.hobbies.removeAt(i);
  }

  // private createListeners() {
  //   // this.form.valueChanges.subscribe(value => {
  //   //   console.log(value);
  //   // })
  //   // this.form.statusChanges.subscribe(value => {
  //   //   console.log(value);
  //   // })
  //   this.form.get("name")?.statusChanges.subscribe(value => {
  //     console.log(value + " NAME")
  //   });
  //   this.form.get("lastName")?.statusChanges.subscribe(value => {
  //     console.log(value + " LAST NAME")
  //   });
  //   this.form.get("email")?.statusChanges.subscribe(value => {
  //     console.log(value + " EMAIL")
  //   });
  //   this.form.get("username")?.statusChanges.subscribe(value => {
  //     console.log(value + " USERNAME")
  //   });
  //   this.form.get("ogPass")?.statusChanges.subscribe(value => {
  //     console.log(value + " OG_PASS")
  //   });
  //   this.form.get("repeatPass")?.statusChanges.subscribe(value => {
  //     console.log(value + " REPEAT_PASS")
  //   });
  //   this.form.get("address")?.statusChanges.subscribe(value => {
  //     console.log(value + " ADDRESS")
  //   });
  // }
}
