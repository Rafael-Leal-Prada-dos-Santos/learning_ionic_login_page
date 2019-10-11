import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

//#region variáveis 
  email:string = null;
  password:string = null;
  json:any;
  users = [];
  isValidUser:boolean = false;
//#endregion

//#region Construtor da classe

  constructor(public navCtrl: NavController, public navParams: NavParams, public alrtCtrl:AlertController, public http: Http) {
    this.email = this.navParams.get('email');
    this.password = this.navParams.get('password');

    this.http.get('http://localhost:51381/api/user').map(res => res.json()).subscribe(data => {
      this.json = data;      
      
      this.json.forEach(element => {
        this.users.push(element);
      });
           
  });

  }
//#endregion

//#region metodo chamado ao carregar esta pagina(Login)
ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage'); 
  }
//#endregion

//#region Tratamento do Login do usuário
  login() {
     
    let tempUser = null;
    

     if(this.email.length > 0 && this.password.length > 0){

      for(let i = 0; i < this.users.length; i++){
        if(this.email == this.users[i].Email){           
          this.isValidUser = true;
          tempUser = this.users[i]
          break;
        }        
        
        else{
          console.log("Email nao existe")
          this.isValidUser = false;
        }
      }
      
      if(!this.isValidUser){ 
        this.invalidUserAlert();
        return                            
      }  

      if(this.password !== tempUser.Password){
         this.wrongPasswordAlert();        
      }
      else{
        this.loginSuccessfullAlert();
      }
         
    }
                   
                  
  }
//#endregion

//#region Alertas
  async wrongPasswordAlert(){

    let alert = await this.alrtCtrl.create({
      title:'Alerta!',
      message: 'Senha Incorreta!',
      buttons:['OK']            
    });

    await alert.present();
    
  }

  async loginSuccessfullAlert(){

    let alert = await this.alrtCtrl.create({
      title:'Alerta!',
      message: 'Logado com sucesso!',
      buttons:['OK']            
    });

    await alert.present();
    
  }

  async invalidUserAlert(){

    let alert = await this.alrtCtrl.create({
      title:'Alerta!',
      message: 'Usuario não existe',
      buttons:['OK']            
    });

    await alert.present();
    
  }
  //#endregion

}
