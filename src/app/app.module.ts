import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage'
//导入页面组件
import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user'
import { HeadfacePage } from '../pages/headface/headface'
import { QuestionPage } from '../pages/question/question'
import { DetailsPage } from '../pages/details/details'
import { AnswerPage } from '../pages/answer/answer'
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails'
import { UserdatalistPage } from '../pages/userdatalist/userdatalist'
import { ScanPage } from '../pages/scan/scan'
import { VersionsPage } from '../pages/versions/versions'

//导入providers
import { RestProvider } from '../providers/rest/rest';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';
import { ComponentsModule } from '../components/components.module';
import { SettingsProvider } from '../providers/settings/settings';
//导入pipe
import { RelativetimePipe } from '../pipes/relativetime/relativetime'
//导入四个外部加载进来的组件
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
// 二维码
import { QRScanner } from '@ionic-native/qr-scanner';
//版本信息
import { AppVersion } from '@ionic-native/app-version'
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    RelativetimePipe,
    UserdatalistPage,
    ScanPage,
    VersionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回'
    }),
    ComponentsModule,//导入
    HttpModule,//全局导入HTTP
    IonicStorageModule.forRoot()//全局导入storage
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdatalistPage,
    ScanPage,
    VersionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    File,
    Transfer,
    FilePath,
    Camera,
    EmojiProvider,
    ChatserviceProvider,
    SettingsProvider,
    QRScanner,
    AppVersion
  ]
})
export class AppModule { }
