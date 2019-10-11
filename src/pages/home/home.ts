import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController) {
    
  }
  
  //#region Método para mudar de página
  gotoLoginPage(){
    this.navCtrl.push(LoginPage, {email:'teste@teste.teste', password:'teste'});
  }
 //#endregion

}
