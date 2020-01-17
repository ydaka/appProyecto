import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Usuario } from '../../models/modelo_usuario';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

@IonicPage({
  name: 'usuarios',
  segment: 'usuarios.html'
})
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  miUsuario = {} as Usuario;
  unId: any;
  unNombre: any;
  unaClave: any;
  unaAccion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarios: ProveedorUsuarioProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    this.unId = this.navParams.get("unID");
    this.unNombre = this.navParams.get("unNombre");
    this.unaClave = this.navParams.get("unaClave");
    this.unaAccion = this.navParams.get("una_accion");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariosPage');

    if (this.unaAccion == 'ACTUALIZAR') {
      this.llamarUnUsuario();
    }
    else if (this.unaAccion == 'CREAR') {
      this.miUsuario.usuario_id = -1;
      this.miUsuario.nombre = '';
      this.miUsuario.clave = '';

    }
  }

  llamarUnUsuario() {
    this.miUsuario.usuario_id = this.unId;
    this.miUsuario.nombre = this.unNombre;
    this.miUsuario.clave = this.unaClave;
  }

  insertarUsuario() {
    //this.datosEquipo.DESCRIPCION.length > 0

    if (this.miUsuario.nombre !== '' &&
      this.miUsuario.clave !== ''
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.usuarios.utilizaCrudUsuario(
        this.miUsuario.usuario_id,
        this.miUsuario.nombre,
        this.miUsuario.clave,
        'insertar').subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);
          console.log(res[0].p_out);

          if (res[0].p_out == "inserto registro") {

            this.mostrarToast('Registro Insertado', 6000);
            this.navCtrl.push('conexionUsuarios');
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

  cancelarUsuario() {
    this.navCtrl.pop();
  }

  //metodo para actualizar
  actualizarUsuario() {
    //this.datosEquipo.DESCRIPCION.length > 0

    if (this.miUsuario.nombre !== this.unNombre ||
      this.miUsuario.clave !== this.unaClave
    ) {

      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.usuarios.utilizaCrudUsuario(
        this.miUsuario.usuario_id,
        this.miUsuario.nombre,
        this.miUsuario.clave,
        'modificar').subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON

          console.log(res);
          console.log(res[0].p_out);

          if (res[0].p_out == "modifico registro") {

            this.mostrarToast('Registro actualizado', 7000);
            this.navCtrl.push('conexionUsuarios');
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
  eliminarUsuario() {
    //this.datosEquipo.DESCRIPCION.length > 0
    if (this.miUsuario.usuario_id !== -1) {
      //Aqui puedo realizar la insercion con los
      //datos del la Pagina
      this.usuarios.utilizaCrudUsuario(
        this.miUsuario.usuario_id,
        this.miUsuario.nombre,
        this.miUsuario.clave,
        'eliminar').subscribe(res => {
          //Aqui es resultado es cargado a la variable como JSON
          console.log(res);
          console.log(res[0].p_out);
          if (res[0].p_out == "elimino registro") {
            this.mostrarToast('Registro eliminado', 8000);
            this.navCtrl.push('conexionUsuarios');
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
            this.eliminarUsuario();
          }
        }
      ]
    });
    alert.present();
  }

}
