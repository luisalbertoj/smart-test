import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  public user: any = {};
  public apiMedia = environment.urlMedia;
  private sub = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.loadUser();
  }
  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  post(model: string, data: any) {
    return this.http.post(environment.urlApi + model, data);
  }

  put(model: string, id: string, data: any) {
    return this.http.put(environment.urlApi + model + '/' + id, data);
  }

  delete(model: string, id: number) {
    return this.http.delete(environment.urlApi + model + '/' + id);
  }

  getAll(model: string) {
    return this.http.get(environment.urlApi + model);
  }

  get(model: string, id: number, att?: any) {
    if(att) {
      return this.http.get(environment.urlApi + model + '?' + att + '=' + id);
    }
    return this.http.get(environment.urlApi + model + '/' + id);
  }
  query(modelo: string, query: any) {
    return this.http.post(environment.urlApi + modelo, query);
  }
  fileUpload(endPoint: any, data: any, info: any) {
    let formData: FormData = new FormData();
    for (let i = 0; i < data.length; i++) {
      console.log('for' + i);
      console.log(data[i]);
      let file: File = data[i];
      formData.append('file' + i, file, file.name);
    }
    formData.append('nombre', info.nombre);
    formData.append('contenido', info.contenido);
    formData.append('creador', info.creador);
    formData.append('leccion', info.leccionId);
    console.log(info);
    return this.http.post(environment.urlApi + endPoint, formData);
  }
  returnAsObservable() {
    return this.sub.asObservable();
  }
  showSpinner() {
    
    this.sub.next(true);
  }
  hideSpinner() {
    this.sub.next(false);
  }
}
