import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConexionUsuariosPage } from './conexion-usuarios';

@NgModule({
  declarations: [
    ConexionUsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ConexionUsuariosPage),
  ],
})
export class ConexionUsuariosPageModule {}
