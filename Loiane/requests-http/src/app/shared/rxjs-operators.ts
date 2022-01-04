import { pipe } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

export function filterResponse<T>() {
  return pipe(
    filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
    map(( res: any ) => (<HttpResponse<T>>res).body)
  );
}

export function uploadProgress<T>(cb: (progess: number) => void) {

  return tap((event: HttpEvent<T>) => {

    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round(((event.loaded * 100) / event.total!))); // porcentagem calculo
      // console.log('Progresso ', percentDone);
    }
    
  });
}
