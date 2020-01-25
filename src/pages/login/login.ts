import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProveedorUsuarioProvider } from '../../providers/proveedor-usuario/proveedor-usuario';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ProveedorSesionProvider } from '../../providers/proveedor-sesion/proveedor-sesion';

@IonicPage({
  name: 'login',
  segment: 'login.html'
})//Decorador se usa para dale palabras clave abreviadas para llamar//ALIAS

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: any = "";
  password: any = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public con: ProveedorUsuarioProvider,
    public controlAlertas: AlertController,
    public sesion: ProveedorSesionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validarLogin() {
    if (this.usuario != "" && this.password != "") {
      this.con.consume_login(this.usuario, this.password).subscribe(resultado => {
        //El subcribe mete la estructura del json a esta variable gracias al mapeo
        console.log(this.usuario + " " + this.password + " Res:" + resultado.length);
        if (resultado.length > 0) {
          resultado = resultado[0];
          this.sesion.set("sesionName", resultado);
          this.navCtrl.setRoot("inicio");
          //Reconfigura la pagina a la principal no como push que solo manda
        } else {
          this.mostrarAlerta("Error", "Usuario invalido");
        }
      })
    }else{
      this.mostrarAlerta("Error", "Faltan datos por rellenar");
    }
  }

  mostrarAlerta(titulo: string, contenido: string) {
    let alert = this.controlAlertas.create({
      //Crear variable durante la ejecucion de dato any
      title: titulo,
      subTitle: contenido,
      buttons: ['Vale']
    });
    alert.present();
  }

}
