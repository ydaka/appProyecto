import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

@IonicPage({
  name: 'conroles',
  segment: 'conroles.html'
})
@Component({
  selector: 'page-conroles',
  templateUrl: 'conroles.html',
})
export class ConrolesPage {
  unosroles: any;
  testeo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuario: ProveedorUsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConrolesPage');
    this.traerRoles();
  }

  traerRoles() {
    this.usuario.cosume_roles().subscribe(resultado => {
      this.unosroles = resultado;
      console.log(this.unosroles);
    }, error => {
      console.log(error);
    });
  }

  creaRol() {
    this.navCtrl.push('roles',
      {
        unrol: '',
        undesc: '',
        unent: '',
        unicon: '',
        una_accion: 'CREAR',
        callback: this.myCallbackFunction
      });
  }

  vaarol(id: number, descripcion: string, entrada: string, icono: string) {
    this.navCtrl.push('roles',
      {
        unrol: id,
        undesc: descripcion,
        unent: entrada,
        unicon: icono,
        una_accion: 'ACTUALIZAR'
      });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.testeo = _params; resolve();
    });
  }

}
