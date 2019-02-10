import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { RestProvider } from '../../providers/rest/rest'
import { BaseUI } from '../../common/baseui';
import { HeadfacePage } from '../headface/headface'
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  userInfo: any
  headface: string
  nickName: string
  errorMessage: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public LoadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {
    super()
    this.headface = navParams.get('UserHeadface') + '?' + (new Date()).valueOf()
    this.nickName = navParams.get('UserNickName')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  updateNickName() {
    let loader = super.showLiading(this.LoadingCtrl, '注册中...')
    this.storage.get("UserId").then((val) => {
      this.rest.updateNickName(val, this.nickName).subscribe(
        f => {
          if (f["Status"] == 'OK') {
            loader.dismiss();
            super.showToast(this.toastCtrl, '保存成功')
            // this.navCtrl.pop()//返回nav上级页面

          } else {
            loader.dismiss()
            super.showToast(this.toastCtrl, f["StatusContent"])
          }

        }
        ,
        error => this.errorMessage = <any>error
      )
    })
  }
  logout() {
    this.storage.remove('UserId')
    this.viewCtrl.dismiss()
  }

  gotoHeadface() {
    this.navCtrl.push(HeadfacePage)
  }
}
