import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'
import { Storage } from '@ionic/storage'
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
export class LoginPage extends BaseUI {
  mobile: any
  password: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public LoadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public rest: RestProvider,
    public storage: Storage) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = super.showLiading(this.LoadingCtrl, '登录中...')
    this.rest.login(this.password, this.mobile).subscribe(
      f => {
        if (f["Status"] == 'OK') {
          this.storage.set('UserId', f['UserId']);
          loader.dismiss();
          this.dismiss();
        } else {
          loader.dismiss()
          super.showToast(this.toastCtrl, f["StatusContent"])
        }
      }
    )
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
}
