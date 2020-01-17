//import { HttpClient } from '@angular/common/http';//Decodifica el json y lo pasa a array
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';//Libreria para mapeos
import { ProveedorSesionProvider } from '../proveedor-sesion/proveedor-sesion';

@Injectable()
export class ProveedorUsuarioProvider {

  private urlLogin: string = "http://localhost/miproyecto/login_user.php";//donde esta la pagina que va a consumir el web service
  private urlPerfiles: string = "http://localhost/miproyecto/perfiles_user.php";
  private urlRoles: string = "http://localhost/miproyecto/consulta_roles.php";
  private urlCrudRoles: string = "http://localhost/miproyecto/crud_roles.php";
  private urlUsuarios: string = "http://localhost/miproyecto/consulta_usuarios.php";
  private urlCrudUsuarios: string = "http://localhost/miproyecto/crud_usuarios.php";

  constructor(
    public http: Http,
    public sesion: ProveedorSesionProvider) {
    console.log('Hello ProveedorUsuarioProvider Provider');
  }

  consume_login(usuario: string, password: string) {
    return this.http.get(this.urlLogin, { params: { codigo_usuario: usuario, clave_usuario: password } }).map(res => res.json());
    //map permite mapear el json
    //Dentro de parametros se debe llamar igual que en la pagina
  }

  cosume_perfiles() {
    let usuario: any = this.sesion.getCampo("usuario_id", "sesionName");
    return this.http.get(this.urlPerfiles, { params: { codigo_usuario: usuario } }).map(res => res.json());
  }

  cosume_roles() {
    return this.http.get(this.urlRoles).map(res => res.json());
  }

  utilizaCrudRol(
    unCodigo_rol: any,
    unaDesc_rol: any,
    unaEntrada_rol: any,
    unIcono_rol: any,
    unaOperacion: any) {

    return this.http.get(this.urlCrudRoles,
      {
        params: {
          codigo_rol: unCodigo_rol,
          desc_rol: unaDesc_rol,
          entrada_rol: unaEntrada_rol,
          icono_rol: unIcono_rol,
          accion: unaOperacion

        }
      })
      .map(res => res.json());
  }

  cosume_usuarios() {
    return this.http.get(this.urlUsuarios).map(res => res.json());
  }

  utilizaCrudUsuario(
    unUsuario_id: any,
    unNombre: any,
    unaClave: any,
    unaOperacion: any) {

    return this.http.get(this.urlCrudUsuarios,
      {
        params: {
          usuario_id: unUsuario_id,
          nombre: unNombre,
          clave: unaClave,
          accion: unaOperacion

        }
      })
      .map(res => res.json());
  }

}
