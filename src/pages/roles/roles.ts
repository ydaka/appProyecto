import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Rol } from '../../models/modelo_rol';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

@IonicPage({
  name: 'roles',
  segment: 'roles.html'
})
@Component({
  selector: 'page-roles',
  templateUrl: 'roles.html',
})
export class RolesPage {

  miRol = {} as Rol;
  anrol: any;
  andesc: any;
  anentrada: any;
  anicono: any;
  unaAccion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarios: ProveedorUsuarioProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.anrol = this.navParams.get("unrol");
    this.andesc = this.navParams.get("undesc");
    this.anentrada = this.navParams.get("unent");
    this.anicono = this.navParams.get("unicon");
    this.unaAccion = this.navParams.get("una_accion");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolesPage');

    if (this.unaAccion == 'ACTUALIZAR') {
      this.llamaunrol();
    }
    else if (this.unaAccion == 'CREAR') {
      this.miRol.rol_id = '';
      this.miRol.descripcion = '';
      this.miRol.entrada = '';
      this.miRol.icono = '';

    }
  }

  llamaunrol() {
    this.miRol.rol_id = this.anrol;
    this.miRol.descripcion = this.andesc;
    this.miRol.entrada = this.anentrada;
    this.miRol.icono = this.anicono;
  }

  insertarRol() {
    //this.datosEquipo.DESCRIPCION.length > 0

    if (this.miRol.descripcion !== '' &&
      this.miRol.entrada !== '' &&
      this.miRol.icono !== ''
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.usuarios.utilizaCrudRol(
        this.miRol.rol_id,
        this.miRol.descripcion,
        this.miRol.entrada,
        this.miRol.icono,
        'insertar').subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);
          console.log(res[0].p_out);

          if (res[0].p_out == "inserto registro") {

            this.mostrarToast('Registro Insertado', 6000);
            this.navCtrl.push('conroles');
            //this.cancelarEquipo();
          }
          else {
            this.mostrarToast('Registro  No Insertado', 2000);
          }

        }, error => {
          console.log(error);
        });
    }
    else {
      console.log('No Puedo Insertar');
      this.showAlert('Error', 'Faltan Datos');
    }
  }

  mostrarToast(mensaje: string, tiempo?: number) {
    if (!tiempo) {
      tiempo = 1500;
    }
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: tiempo
    });
    toast.present();
  }

  showAlert(titulo: string, contenido: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: contenido,
      buttons: ['Vale']
    });
    alert.present();
  }

  cancelarRol() {
    this.navCtrl.pop();
  }

  //metodo para actualizar
  actualizarRol() {
    //this.datosEquipo.DESCRIPCION.length > 0

    if (this.miRol.descripcion !== this.andesc ||
      this.miRol.entrada !== this.anentrada ||
      this.miRol.icono !== this.anicono
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.usuarios.utilizaCrudRol(
        this.miRol.rol_id,
        this.miRol.descripcion,
        this.miRol.entrada,
        this.miRol.icono,
        'modificar').subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);
          console.log(res[0].p_out);

          if (res[0].p_out == "modifico registro") {

            this.mostrarToast('Registro actualizado', 7000);
            this.navCtrl.push('conroles');
            //this.cancelarEquipo();
          }
          else {
            this.mostrarToast('Registro  No actualizo', 2000);
          }

        }, error => {
          console.log(error);
        });
    }
    else {
      console.log('No Puedo actualizar');
      this.showAlert('Error', 'Nada que actualizar');
    }
  }

  //metodo para eliminar
  eliminarRol() {
    //this.datosEquipo.DESCRIPCION.length > 0
    if (this.miRol.rol_id !== "-1") {
      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.usuarios.utilizaCrudRol(
        this.miRol.rol_id,
        this.miRol.descripcion,
        this.miRol.entrada,
        this.miRol.icono,
        'eliminar').subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON
          console.log(res);
          console.log(res[0].p_out);
          if (res[0].p_out == "elimino registro") {
            this.mostrarToast('Registro eliminado', 8000);
            this.navCtrl.push('conroles');
            //this.cancelarEquipo();
          }
          else {
            this.mostrarToast('Registro  No eliminó', 2000);
          }
        }, error => {
          console.log(error);
        });
    }
    else {
      console.log('No Puedo eliminar');
      this.showAlert('Error', 'Nada que eliminar');
    }
  }

  showmensaje2() {
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: 'Seguro de eliminar registro?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'icon-color',
          handler: () => {
            console.log('Canceló');

          }
        },
        {
          text: 'Eliminar',
          cssClass: 'icon-color',
          handler: () => {
            console.log('eliminó');
            this.eliminarRol();
          }
        }
      ]
    });
    alert.present();
  }
}
