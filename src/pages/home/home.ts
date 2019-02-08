import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question'
import { RestProvider } from '../../providers/rest/rest'
import { BaseUI } from '../../common/baseui'
import { DetailsPage } from '../details/details'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  feeds: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public loadingCtrl: LoadingController
  ) {
    super()
  }

  ionViewDidLoad() {
    this.getFeeds();
  }

  gotoQuestion() {
    let modal = this.modalCtrl.create(QuestionPage)
    modal.present()
  }

  selectTab(indes: number) {
    var t: Tabs = this.navCtrl.parent
    t.select(2)
  }

  getFeeds() {
    var loading = super.showLiading(this.loadingCtrl, "加载中...");
    this.rest.getFeeds().subscribe(
      f => {
        this.feeds = f;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error
    )
  }

  gotoDetails(questionId: number) {
    this.navCtrl.push(DetailsPage, {
      id: questionId
    })
  }
}
