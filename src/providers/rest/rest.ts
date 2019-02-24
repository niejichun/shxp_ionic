import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { Loading, LoadingController, Toast, ToastController } from 'ionic-angular'

@Injectable()
export class RestProvider {

  constructor(public http: Http) { }

  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  // private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  login(password: string, mobile: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlLogin}?mobile=${mobile}&password=${password}`)
  }

  register(password: string, mobile: string, nickName: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlRegister}?mobile=${mobile}&password=${password}&nickName=${nickName}`)
  }
  getUserInfo(userId: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlUserInfo}?userId=${userId}`)
  }

  updateNickName(UserId: string, nickName: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlUpdateNickName}?userId=${UserId}&nickname=${nickName}`)
  }

  saveQuestion(UserId: string, title: string, content: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlQuestionSave}?userId=${UserId}&title=${title}&content=${content}`)
  }

  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlFeeds}`)
  }

  getQuestionWithUser(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
  }

  saveFavourite(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
  }

  answer(userId, questionId, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer + "?userid=" + userId + "&questionid=" + questionId + "&content=" + content);
  }

  getQuestions(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList);
  }
  getUserNotifications(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserNotifications + "?userid=" + userId);
  }
  getUserQuestionList(userId, type): Observable<string[]> {
    return this.getUrlReturn(this.apiGetUserQuestionList + "?userid=" + userId + "&type=" + type);
  }

  /**
   * 全局获取 HTTP 请求的方法
   * @Parry
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body) || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
