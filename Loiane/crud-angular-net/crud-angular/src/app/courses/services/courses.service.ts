import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(private http: HttpClient) { }

  public list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API)
      .pipe(
          first(),
          delay(5000),
          tap(courses => console.log(courses))
        );
  }
}
