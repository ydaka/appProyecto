//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProveedorSesionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProveedorSesionProvider {

  constructor(/*public http: HttpClient*/) {
    console.log('Hello ProveedorSesionProvider Provider');
  }

  //Metodos get y set
  set(nombSesion: string, datos: any) {
    localStorage.setItem(nombSesion, JSON.stringify(datos));
  }

  getCampo(campo: string, nombSesion: string) {
    let valor_json = JSON.parse(localStorage.getItem(nombSesion));
    return valor_json[campo];
  }

  destruir(){
    localStorage.clear();
  }

}
