import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  public consultaCEP(cep: string) : any | Observable<any> {

    console.log(cep);
     // Nova variável "cep" somente com dígitos.
     cep = cep.replace(/\D/g, '');
     // Verifica se campo cep possui valor informado.
     if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;
      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
     }

     return of({});
  }
}
