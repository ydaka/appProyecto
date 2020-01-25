import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';

/**
 * Generated class for the ConmovimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'conmovimiento',
  segment: 'conmovimiento.html'
})
@Component({
  selector: 'page-conmovimiento',
  templateUrl: 'conmovimiento.html',
})
export class ConmovimientoPage {

  unosdispositivos: any = [];
  //-------------
  searchQuery: string = '';
  items: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuario: ProveedorUsuarioProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    //this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConmovimientoPage');
  }

  traerDispositivos(unaDescripcion: string) {
    this.usuario.cosume_dispositivos(unaDescripcion).subscribe(resultado => {
      this.unosdispositivos = resultado;
      console.log(this.unosdispositivos);
    }, error => {
      console.log(error);
    });
  }
  //--------------

  /*initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }*/

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      /*this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })*/
      this.traerDispositivos(val);
    } else {
      this.unosdispositivos = [];
    }
  }

}
