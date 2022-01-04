import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    // Criando um request na mao no angular , em vez de usar o httpClint
    // const request = new HttpRequest('POST', url, formData );
    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });

  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      // reportProgress
      // content-length --> o backend tem que retornar no header esta informaçao tamanho do arquivo para o reportProgress funcione
    });
  }

  handleFile(res: any, fileName: string) {

    const file = new Blob([res], {
      type: res.type
    });

    // IE
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    const nav = (window.navigator as any);
    if (nav && nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(file);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => { // firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);

  }


  public download_csv_using_blob (file_name: string, content: any) {
    var csvData = new Blob([content], { type: content.type }); // type: 'text/csv'
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) { // for IE
      (window.navigator as any).msSaveOrOpenBlob(csvData, file_name);
    } else { // for Non-IE (chrome, firefox etc.)
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        var csvUrl = URL.createObjectURL(csvData);
        a.href =  csvUrl;
        a.download = file_name;
        a.click();
        URL.revokeObjectURL(a.href)
        a.remove();
    }
};


}


