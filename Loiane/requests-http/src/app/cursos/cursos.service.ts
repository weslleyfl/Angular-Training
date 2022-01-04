import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;
  // private readonly API = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) { }

  public list() : Observable<Curso[]>  {
    return this.http.get<Curso[]>(this.API)
     .pipe(
       //delay(2000),
       //tap(console.log),
       //retry(3), // retry a failed request up to 3 times
       catchError(this.handleError)
     )
  }

  public loadByID(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  public save(curso: Curso) : Observable<Curso> | Observable<any> {
    if (curso.id) {
      return this.update(curso);
    }

    return this.create(curso);
  }

  private create(curso: Curso): Observable<Curso> {
     return this.http.post<Curso>(this.API, curso)
      .pipe(
        take(1),
        catchError(this.handleError)
      );
  }

  private update(curso: Curso): Observable<any> {
    return this.http.put<any>(`${this.API}/${curso.id}`, curso)
      .pipe(
        take(1),
        catchError(this.handleError)
      )
  }

  public remove(id: number) : Observable<any> {
    return this.http.delete(`${this.API}/${id}`)
    .pipe(
      take(1),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Um erro ocorreu:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend retornou um codigo ${error.status}, corpo (body) como: `, error.error);

    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Algo ruím aconteceu; por favor, tente novamente mais tarde.');
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
  }

}
