import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

@IonicPage({
  name: 'conexionUsuarios',
  segment: 'conexionUsuarios.html'
})
@Component({
  selector: 'page-conexion-usuarios',
  templateUrl: 'conexion-usuarios.html',
})
export class ConexionUsuariosPage {

  unosUsuarios: any;
  testeo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuario: ProveedorUsuarioProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConexionUsuariosPage');
    this.traerUsuarios();
  }

  traerUsuarios() {
    this.usuario.cosume_usuarios().subscribe(resultado => {
      this.unosUsuarios = resultado;
      console.log(this.unosUsuarios);
    }, error => {
      console.log(error);
    });
  }

  creaUsuario() {
    this.navCtrl.push('usuarios',
      {
        unID: '',
        unNombre: '',
        unaClave: '',
        una_accion: 'CREAR',
        callback: this.myCallbackFunction
      });
  }

  vaausu(id: number, nombre: string, clave: string) {
    this.navCtrl.push('usuarios',
      {
        unID: id,
        unNombre: nombre,
        unaClave: clave,
        una_accion: 'ACTUALIZAR'
      });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.testeo = _params; resolve();
    });
  }

}
