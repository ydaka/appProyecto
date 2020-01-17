import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorSesionProvider } from '../../providers/proveedor-sesion/proveedor-sesion';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'inicio',
  segment: 'inicio.html'
})

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  nombre_usuario: any;
  codigo: any;

  unosperfiles: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sesion: ProveedorSesionProvider,
    public usuario: ProveedorUsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
    this.mostrarUsuario();
  }

  mostrarUsuario() {
    this.nombre_usuario = this.sesion.getCampo("nombre", "sesionName");
    this.codigo = this.sesion.getCampo("usuario_id", "sesionName");
    this.traerPerfiles();
  }

  traerPerfiles() {
    this.usuario.cosume_perfiles().subscribe(resultado => {
      this.unosperfiles = resultado;
      console.log(this.unosperfiles);
    }, error => {
      console.log(error);
    });
  }

  iraopcion(opcion: string) {
    this.navCtrl.push(opcion);
  }

}
