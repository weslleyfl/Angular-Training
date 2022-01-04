import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

// https://www.learnrxjs.io/learn-rxjs/operators/complete

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  
  // courses: Course[] = [
  //   {_id: '1', name: 'Angular', category: 'Front-End'},
  //   {_id: '2', name: 'Angular 2', category: 'Back-End'}
  // ];

  //courses: Course[] = [];

  // Although the Angular framework does not enforce a naming convention for observables,
  // you will often see observables named with a trailing “$” sign.
  courses$: Observable<Course[]>;

  displayedColumns: string[] = ['name', 'category'];

  constructor(private coursesService: CoursesService) {

    // this.coursesService.list().subscribe((courses) => {
    //   console.log(courses);
    //   this.courses = courses;
    // });

    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Error ao carregar Cursos.');
        return of([])
      })
    );

  }


  onError(errorMsg: string) {
    console.log(errorMsg);

    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
