import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() { }

  noLlacer(control: FormControl): ErrorValidate {

    if (control.value?.toLowerCase() === "llacer") {
      return {
        noLlacer: true
      }
    }
    // @ts-ignore
    return null;
  }

  equalPasswords(ogPassName: string, repeatPassName: string) {
    return (formGroup: FormGroup) => {
      const ogPassControl = formGroup.controls[ogPassName];
      const repeatPassControl = formGroup.controls[repeatPassName];
      if (ogPassControl.value === repeatPassControl.value) {
        repeatPassControl.setErrors(null);
      } else {
        repeatPassControl.setErrors({notEquals: true});
      }
    }
  }

  usernameExists(control: FormControl): Promise<any> | Observable<any> {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === "123") {
          console.log("TRUE")
          resolve({exists: false});
        } else {
          console.log("FALSE")
          resolve(null);
        }
      }, 2000);
    })
  }
}
