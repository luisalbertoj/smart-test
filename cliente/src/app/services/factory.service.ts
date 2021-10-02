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
  public privilegios: any = [];

  public apiMedia = environment.urlMedia;
  private sub = new BehaviorSubject<boolean>(false);
  public lecciones: any = [];
  public pruebas: any = [];
  public recursos: any = [];
  public laboratorios: any = [];
  public reportes: any = [];
  public admin: any = [];

  constructor(private http: HttpClient) {
    this.loadUser();
  }
  loadUser(): any {
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getAll('rol/' + this.user.idRol.id).subscribe((res: any) => {
        this.lecciones = [];
        this.pruebas = [];
        this.recursos = [];
        this.laboratorios = [];
        this.reportes = [];
        this.admin = [];
        this.privilegios = res.privilegios;
        console.log('Privilegios actualizados');
        this.cargarPrivilegios();
      });
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
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  cargarPrivilegios(): void {
    this.privilegios.forEach((priv: any) => {
      if (priv.nombre === 'lecciones') {
        this.lecciones.push({
          nombre: priv.nombre,
          path: '/dashboard/lesson',
        });
      }
      if (priv.nombre === 'Crear lecciones') {
        this.lecciones.push({
          nombre: priv.nombre,
          path: '/dashboard/lesson/new',
        });
      }
      if (priv.nombre === 'Resultados lecciones') {
        this.lecciones.push({
          nombre: priv.nombre,
          path: '/dashboard/lesson/result',
        });
      }
      if (priv.nombre === 'Mis pruebas') {
        this.pruebas.push({
          nombre: priv.nombre,
          path: '/dashboard/test',
        });
      }
      if (priv.nombre === 'Crear pruebas') {
        this.pruebas.push({
          nombre: priv.nombre,
          path: '/dashboard/test/create-test',
        });
      }
      if (priv.nombre === 'Resultados conocimiento') {
        this.pruebas.push({
          nombre: priv.nombre,
          path: '/dashboard/test/view-result',
        });
      }
      if (priv.nombre === 'Ver recurso') {
        this.recursos.push({
          nombre: priv.nombre,
          path: '/dashboard/resources',
        });
      }
      if (priv.nombre === 'Nuevo recurso') {
        this.recursos.push({
          nombre: priv.nombre,
          path: '/dashboard/resources/create-resoruce',
        });
      }
      if (priv.nombre === 'Mis laboratorios') {
        this.laboratorios.push({
          nombre: priv.nombre,
          path: '/dashboard/laboratory',
        });
      }
      if (priv.nombre === 'Ver reporte') {
        this.reportes.push({
          nombre: priv.nombre,
          path: '/dashboard/reportes/',
        });
      }
      if (priv.nombre === 'Admin usuario') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/user-list',
        });
      }
      if (priv.nombre === 'Admin nuevo usuario') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/user',
        });
      }
      if (priv.nombre === 'Admin privilegios') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/privilegios',
        });
      }
      if (priv.nombre === 'Admin IE lessons') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/import-export/lessons',
        });
      }
      if (priv.nombre === 'Admin IE preconceptos') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/import-export/preconceptos',
        });
      }
    });
    this.lecciones = this.lecciones;
    this.pruebas = this.pruebas;
    this.recursos = this.recursos;
    this.laboratorios = this.laboratorios;
    this.reportes = this.reportes;
    this.admin = this.admin;
    this.privilegios = null;
  }
}
