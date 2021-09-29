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
  lecciones: any = [];
  pruebas: any = [];
  recursos: any = [];
  laboratorios: any = [];
  reportes: any = [];
  admin: any = [];
  constructor(private http: HttpClient) {
    this.loadUser();
  }
  loadUser(): any {
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getAll('rol/' + this.user.idRol.id).subscribe(
        (res: any) => {
          this.user.idRol = res;
          this.user = this.user;
        }
      );
    } catch (error) {
      localStorage.clear();
    }
  }
  post(model: string, data: any): any {
    return this.http.post(environment.urlApi + model, data);
  }

  put(model: string, id: string, data: any): any {
    return this.http.put(environment.urlApi + model + '/' + id, data);
  }

  delete(model: string, id: number): any {
    return this.http.delete(environment.urlApi + model + '/' + id);
  }

  getAll(model: string): any {
    return this.http.get(environment.urlApi + model);
  }

  get(model: string, id: number, att?: any): any {
    if (att) {
      return this.http.get(environment.urlApi + model + '?' + att + '=' + id);
    }
    return this.http.get(environment.urlApi + model + '/' + id);
  }
  query(modelo: string, query: any): any {
    return this.http.post(environment.urlApi + modelo, query);
  }
  fileUpload(endPoint: any, data: any, info: any): any {
    const formData: FormData = new FormData();
    formData.append('nombre', info.nombre);
    formData.append('contenido', info.contenido);
    formData.append('creador', info.creador);
    formData.append('competencia', info.competencia);
    for (let i = 0; i < data.length; i++) {
      console.log('for' + i);
      console.log(data[i]);
      const file: File = data[i];
      formData.append('file' + i, file, file.name);
    }
    return this.http.post(environment.urlApi + endPoint, formData);
  }
  returnAsObservable(): any {
    return this.sub.asObservable();
  }
  showSpinner(): any {
    this.sub.next(true);
  }
  hideSpinner(): any {
    this.sub.next(false);
  }

  encryptData(data, inicio?, final?): any {
    try {
      const codigo =
        inicio && final
          ? CryptoJS.AES.encrypt(data, environment.secretKey)
              .toString()
              .slice(inicio, final)
          : CryptoJS.AES.encrypt(data, environment.secretKey).toString();
      return codigo;
    } catch (e) {
      console.log(e);
      return '';
    }
  }
  decryptData(data): any {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);
      if (bytes.toString()) {
        return (bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
