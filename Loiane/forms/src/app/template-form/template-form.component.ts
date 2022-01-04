import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

 usuario: any = {
   nome: null,
   email: null
 }

  constructor(private cepService: ConsultaCepService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(formulario) {

    console.log(formulario);

    // https://jasonwatmore.com/post/2019/11/21/angular-http-post-request-examples
    this.http.post<any>('https://httpbin.org/post', JSON.stringify(formulario.value))
    .subscribe(dados => {
      console.log(dados);
      formulario.form.reset();
    });

  }

  public consultaCEP(cep:string, form): void {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).subscribe((dados) => {
        // console.log(dados);
        this.populaDadosForm(dados, form);
      });
    }

   }

   private populaDadosForm(dados, formulario) {

    /*
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    */

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(form);
   }

   resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  private verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  public aplicaCssErro(campo) {
    return {
      'has-error' : this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
    }
  }

  public aplicaCssAlertaErro(form: any, campo: any) : any {
    return {
      'is-invalid' : (form.submitted && campo.invalid)
    }
  }

  public validacaoCampo(campo: any) : boolean {
    return (campo.invalid && campo.touched)
  }

  public verificarCampoObrigatorio(campo: any) : boolean {
    return (campo.errors?.required)
  }

}
