import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage'
import { BaseUI } from '../../common/baseui'
import { RestProvider } from '../../providers/rest/rest'
import { UserPage } from '../user/user'
import { UserdatalistPage } from '../userdatalist/userdatalist'
import { SettingsProvider } from '../../providers/settings/settings';
import { ScanPage } from '../scan/scan'
import { VersionsPage } from '../versions/versions'
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()Î
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  public notLogin: boolean = true
  public logined: boolean = false
  headface: string
  userinfo: string[];
  errorMessage: any
  selectedTheme: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    private settings: SettingsProvider
  ) {
    super()
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }



  showModal() {
    let modal = this.modalCtrl.create(LoginPage)
    modal.onDidDismiss(() => {//modal关闭后，刷新父页面
      this.loadUserPage()
    })
    modal.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidEnter MorePage');
    this.loadUserPage()
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val) {
        let loader = super.showLiading(this.loadCtrl, '加载中...')
        this.rest.getUserInfo(val).subscribe(
          f => {
            this.headface = f['UserHeadface'] + '?' + (new Date()).valueOf()
            this.userinfo = f
            this.notLogin = false
            this.logined = true
            loader.dismiss();
          },
          error => this.errorMessage = <any>error
        )
      } else {
        this.notLogin = true
        this.logined = false
      }
    })
  }

  gotoUserPage() {
    console.log('this.userinfo params', this.userinfo)
    this.navCtrl.push(UserPage, {
      ...this.userinfo
    })
  }

  gotoDataList(type) {
    this.navCtrl.push(UserdatalistPage, { "dataType": type })
  }

  toggleChangeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    }
    else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

  gotoScanQRCode() {
    this.navCtrl.push(ScanPage, null, { "animate": false });
  }

  gotoVersions() {
    this.navCtrl.push(VersionsPage);
  }
}
