import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';



export class CrudService<T extends { id: any}> {

  constructor(protected http: HttpClient, protected API_URL: any) { }

  public list() : Observable<T[]>  {
    return this.http.get<T[]>(this.API_URL)
     .pipe(
       //delay(2000),
       //tap(console.log),
       //retry(3), // retry a failed request up to 3 times
       catchError(this.handleError)
     )
  }

  public loadByID(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  public save(record: T) : Observable<T> | Observable<any> {
    if (record.id) {
      return this.update(record);
    }

    return this.create(record);
  }

  private create(record: T): Observable<T> {
     return this.http.post<T>(this.API_URL, record)
      .pipe(
        take(1),
        catchError(this.handleError)
      );
  }

  private update(record: T): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${record.id}`, record)
      .pipe(
        take(1),
        catchError(this.handleError)
      )
  }

  public remove(id: number) : Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`)
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
