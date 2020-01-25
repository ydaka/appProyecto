//import { HttpClient } from '@angular/common/http';//Decodifica el json y lo pasa a array
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';//Libreria para mapeos
import { ProveedorSesionProvider } from '../proveedor-sesion/proveedor-sesion';

@Injectable()
export class ProveedorUsuarioProvider {

  /*private urlLogin: string =
    //"http://localhost/Conexiones/login_user.php";//donde esta la pagina que va a consumir el web service
    "http://localhost/Conexiones/rest/index.php/appControllersRest/login_user";
  //"http://avatarsp.000webhostapp.com/avatars/rest/index.php/Pokemon/login_user";
  private urlPerfiles: string =
    //"http://localhost/Conexiones/perfiles_user.php";
    "http://localhost/Conexiones/rest/index.php/appControllersRest/perfiles_user";
  //"http://avatarsp.000webhostapp.com/avatars/rest/index.php/Pokemon/perfiles_user"
  private urlRoles: string =
    //"http://localhost/Conexiones/consulta_roles.php";
    "http://localhost/Conexiones/rest/index.php/appControllersRest/consulta_roles";
  private urlCrudRoles: string =
    //"http://localhost/Conexiones/crud_roles.php";
    "http://localhost/Conexiones/rest/index.php/appControllersRest/crud_roles";
  private urlUsuarios: string =
    //"http://localhost/Conexiones/consulta_usuarios.php";
    "http://localhost/Conexiones/rest/index.php/appControllersRest/consulta_usuarios";
  private urlCrudUsuarios: string =
    //"http://localhost/Conexiones/crud_usuarios.php";
    "http://localhost/Conexiones/rest/index.php/appControllersRest/crud_usuarios";*/


  //Url DEFINITVO
  private Url: string =
    "http://localhost/Conexiones/rest/index.php/Pokemon/";//Local
  //"http://avatarsp.000webhostapp.com/avatars/rest/index.php/Pokemon/";//Web

  constructor(
    public http: Http,
    public sesion: ProveedorSesionProvider) {
    console.log('Hello ProveedorUsuarioProvider Provider');
  }

  consume_login(usuario: string, password: string) {
    //return this.http.get(this.urlLogin, { params: { codigo_usuario: usuario, clave_usuario: password } }).map(res => res.json());
    //map permite mapear el json
    //Dentro de parametros se debe llamar igual que en la pagina
    let miUrl = this.Url + 'login_user';
    return this.http.get(miUrl,
      { params: { codigo_usuario: usuario, clave_usuario: password } })
      .map(res => res.json());
  }

  cosume_perfiles() {
    let usuario: any = this.sesion.getCampo("usuario_id", "sesionName");
    //return this.http.get(this.urlPerfiles, { params: { codigo_usuario: usuario } }).map(res => res.json());
    let miUrl = this.Url + 'perfiles_user';
    return this.http.get(miUrl,
      { params: { codigo_usuario: usuario } })
      .map(res => res.json());
  }

  cosume_roles() {
    //return this.http.get(this.urlRoles).map(res => res.json());
    let miUrl = this.Url + 'consulta_roles';
    return this.http.get(miUrl)
      .map(res => res.json());
  }

  utilizaCrudRol(
    unCodigo_rol: any,
    unaDesc_rol: any,
    unaEntrada_rol: any,
    unIcono_rol: any,
    unaOperacion: any) {

    /*return this.http.get(this.urlCrudRoles,
      {
        params: {
          codigo_rol: unCodigo_rol,
          desc_rol: unaDesc_rol,
          entrada_rol: unaEntrada_rol,
          icono_rol: unIcono_rol,
          accion: unaOperacion

        }
      })
      .map(res => res.json());*/


    let miUrl = this.Url + 'crud_roles';
    return this.http.get(miUrl,
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
    //return this.http.get(this.urlUsuarios).map(res => res.json());
    let miUrl = this.Url + 'consulta_usuarios';
    return this.http.get(miUrl)
      .map(res => res.json());
  }

  utilizaCrudUsuario(
    unUsuario_id: any,
    unNombre: any,
    unaClave: any,
    unaOperacion: any) {

    /*return this.http.get(this.urlCrudUsuarios,
      {
        params: {
          usuario_id: unUsuario_id,
          nombre: unNombre,
          clave: unaClave,
          accion: unaOperacion
        }
      })
      .map(res => res.json());*/

    let miUrl = this.Url + 'crud_usuarios';
    return this.http.get(miUrl,
      {
        params: {
          usuario_id: unUsuario_id,
          nombre: unNombre, clave: unaClave,
          accion: unaOperacion
        }
      })
      .map(res => res.json());
  }

  //

  cosume_dispositivos(unaDescripcion: string) {
    //return this.http.get(this.urlProductos).map(res => res.json());
    let miUrl = this.Url + 'dispositivos_par_como';
    return this.http.get(miUrl,
      { params: { prod_nom: unaDescripcion } })
      .map(res => res.json());
  }

}
