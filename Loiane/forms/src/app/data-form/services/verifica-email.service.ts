import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(3000),
        map((dados: {emails:any[]}) => dados.emails),
        //tap(console.log), // Tap operator is useful for logging the value, debugging the stream for the correct values
        map((dados: {email:string}[]) => dados.filter(v => v.email === email)),
        // tap(console.log),
        map((dados: any[]) => dados.length > 0 )
        //,tap(console.log)
      );
  }

}
