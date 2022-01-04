import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadFileService } from '../upload-file.service';
import { environment } from '../../../environments/environment.prod';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  subscription: Subscription | undefined;
  files: Set<File> | undefined;
  BASE_URL: string = environment.BASE_URL;
  progress: number = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit(): void {
  }

  public onChange(event: any) {
    console.log(event);

    const selectedFiles =  <FileList>event.target.files; //(<FileList>event.srcElement.files);

    // document.getElementById('customFileLabel')!.innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();

    for (const fileName of selectedFiles) {
      fileNames.push(fileName.name);
      this.files.add(fileName);
    }

    document.getElementById('customFileLabel')!.innerHTML = fileNames.join('; ');

    this.progress = 0;
  }

  onUpload() {

    if(this.files && this.files.size > 0) {

     this.subscription = this.service.upload(this.files, `${this.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse() // Upload Concluido
        )
        .subscribe( response => console.log('Upload Concluido') );
        // .subscribe((event: HttpEvent<Object>) => {
        //   // console.log(event);
        //   // HttpEventType
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Upload Concluido');
        //   }
        //   else if (event.type === HttpEventType.UploadProgress) {
        //     const percentDone = Math.round(((event.loaded * 100) / event.total!)); // porcentagem calculo
        //     // console.log('Progresso ', percentDone);
        //     this.progress = percentDone;
        //   }

        // });
    }

  }

  onDownloadExcel() {
    this.service.download(`${this.BASE_URL}/downloadExcel`)
      .subscribe((res:any) => {
        this.service.handleFile(res, 'report.xlsx')
      });

  }

  onDownloadPDF() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }

  // https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f
  ngOnDestroy(): void {
      console.log('unsubscribe');
      this.subscription?.unsubscribe();
  }



}
