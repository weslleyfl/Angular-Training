import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Directive()
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

 // propriedade
 getCampo(campo: string) {
   return this.formulario.get(campo);
 }

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit() {
    if(this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo).hasError('required') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      
      console.log(campo);

      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }

    });
  }

  verificaEmailInvalio() {
    if(this.formulario.get('email').errors) {
      return this.formulario.get('email').errors['email']
    }
  }

  public resetar(): void {
    this.formulario.reset();
  }




}
