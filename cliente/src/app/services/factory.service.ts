import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
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
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      localStorage.clear();
    }
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
    formData.append('nombre', info.nombre);
    formData.append('contenido', info.contenido);
    formData.append('creador', info.creador);
    formData.append('leccion', info.leccionId);
    for (let i = 0; i < data.length; i++) {
      console.log('for' + i);
      console.log(data[i]);
      let file: File = data[i];
      formData.append('file' + i, file, file.name);
    }
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

  encryptData(data, inicio?, final?) {
    try {
      const codigo = inicio && final ? CryptoJS.AES.encrypt((data), environment.secretKey ).toString().slice(inicio,final): CryptoJS.AES.encrypt((data), environment.secretKey ).toString();
      return codigo;
    } catch (e) {
      console.log(e);
      return '';
    }
  }
}
