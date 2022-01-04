import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = 'name,description,version,homepage';

  results$: Observable<any> | undefined;
  total: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // pesquisa reativa com programaçao funcional 
    this.results$ = this.queryField.valueChanges
      .pipe(
          map((value) => value.trim()),
          filter((value) => value.length > 1),
          debounceTime(500),
          distinctUntilChanged(),
          tap(value => console.log(value)),
          switchMap(value => this.http.get(this.SEARCH_URL, {
            params: {
              search: value,
              fields: this.FIELDS
            }
          })),
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results) // retornando o resultado do http
      );


  }

  onSearch() {
    console.log(this.queryField.value);

    const fields = 'name,description,version,homepage';
    // Pegando os valores do campo de pesquisa
    let value = this.queryField.value;

    if(value && (value = value.trim()) !== '') {

      // const params_ = {
      //   search: value,
      //   fields: fields
      // }
      // Concatenar string na url
      let params = new HttpParams();
      params = params.set('search', value);
      // params.append('search', value);
      params = params.set('fields', fields);

      this.results$ = this.http.get(this.SEARCH_URL, { params } )
        .pipe(
          tap(( result: any ) => (this.total = result.total)),
          map(( res: any)  => res.results)
        );

    }


  }

}
