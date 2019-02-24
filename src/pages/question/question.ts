import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { Storage } from '@ionic/storage'
import { BaseUI } from '../../common/baseui'
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {
  public title: string
  public content: string
  errorMessage: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    super()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  submitQuestion() {
    this.storage.get('UserId').then((val) => {
      if (val) {
        let loader = super.showLiading(this.loadCtrl, '加载中...')

        this.rest.saveQuestion(val, this.title, this.content).subscribe(
          f => {
            if (f["Status"] == "OK") {
              loader.dismissAll();
              this.dismiss();
            }
            else {
              loader.dismissAll();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
          },
          error => this.errorMessage = <any>error
        )
      } else {
        super.showToast(this.toastCtrl, "请登录后发布提问");
      }
    })
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }
}
