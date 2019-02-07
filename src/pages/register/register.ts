import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest/rest'
import { BaseUI } from '../../common/baseui';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {
  mobile: any
  password: any
  nickName: any
  confirmPassword: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public LoadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  gotoLoginPage() {
    this.navCtrl.pop()//返回nav上级页面
  }

  doRegister() {
    if (this.password != this.confirmPassword) {
      super.showToast(this.toastCtrl, '两次密码不匹配')
      return
    }

    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(this.mobile)) {
      super.showToast(this.toastCtrl, '手机号码格式错误')
      return
    }


    let loader = super.showLiading(this.LoadingCtrl, '注册中...')
    this.rest.register(this.password, this.mobile, this.nickName).subscribe(
      f => {
        if (f["Status"] == 'OK') {
          loader.dismiss();
          super.showToast(this.toastCtrl, '注册成功')
          this.dismiss()
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
