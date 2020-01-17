import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PresentacionPage } from '../pages/presentacion/presentacion';
import { ProveedorUsuarioProvider } from '../providers/proveedor-usuario/proveedor-usuario';
import { HttpModule } from '@angular/http';
import { ProveedorSesionProvider } from '../providers/proveedor-sesion/proveedor-sesion';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PresentacionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule//Se importa al pasar al Http xd
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PresentacionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProveedorUsuarioProvider,
    ProveedorSesionProvider
  ]
})
export class AppModule {}
