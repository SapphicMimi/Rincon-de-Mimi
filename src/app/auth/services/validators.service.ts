import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for(const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo tiene que tener un mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'email':
          return `No es un email válido.`;
        case 'maxlength':
          return `El campo tiene que tener un máximo de ${errors['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `El campo no puede ser menor de 1.`;
      }
    }

    return null;
  }
}
