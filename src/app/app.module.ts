
import { NotficationService } from './../services/Notfcation/notfication.service';
import { AppNotficationService } from './../services/Notfcation/appnotification.service';
import { LikesPage } from './../pages/likes/likes';
import { EditReplayPage } from './../pages/edit-replay/edit-replay';
import { Reply } from './../pages/replay/Replay.Service';
import { ProductReviews } from './../pages/product/Product.Service';
import { Edit_MyReview } from './../pages/edit-reviews/EditReviews.Service';
import { My_Reviews } from './../pages/my-reviews/MyReviews.Service';
import { MyReviews } from './../pages/reviews/Reviews.Service';
import { ReviewService } from './../pages/review/Review.service';
import { BrowserTab } from '@ionic-native/browser-tab';
import { LinksService } from './../services/crowler.service';
import { FavouriteService } from './../services/favourite.service';
import { ProductService } from './../services/product.service';
import { ScanService } from './../services/scan.Service';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { ScanResultPage } from './../pages/scan-result/scan-result';
import { Device } from '@ionic-native/device';
import { HttpModule } from '@angular/http';
import { CameraPreview } from '@ionic-native/camera-preview';
import { SearchTextPage } from './../pages/search-text/search-text';
import { SearchResualtPage } from './../pages/search-resualt/search-resualt';
import { SearchPage } from './../pages/search/search';
import { TimelineTimeComponent } from './../components/timelinetime/timelinetime';
import { TimelineItemComponent } from './../components/timelineitem/timelineitem';
import { TimelineComponent } from './../components/timeline/timeline';
import { TopBarPage } from './../pages/top-bar/top-bar';
import { ComponentsModule } from './../components/components.module';
import { ProfilePage } from './../pages/profile/profile';
import { MyReviewsPage } from './../pages/my-reviews/my-reviews';
import { ForgetpasswordPage } from './../pages/forgetpassword/forgetpassword';
import { LogInPage } from './../pages/log-in/log-in';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { EditReviewsPage } from './../pages/edit-reviews/edit-reviews';
import { ScannedProductsPage } from './../pages/scanned-products/scanned-products';
import { FavouritesPage } from './../pages/favourites/favourites';
import { ProductPage } from './../pages/product/product';
import { FabCameraPage } from './../pages/fab-camera/fab-camera';
import { ContactSupportPage } from './../pages/contact-support/contact-support';
import { FaqHelpPage } from './../pages/faq-help/faq-help';
import { SettingPage } from './../pages/setting/setting';
import { OptionsPage } from './../pages/options/options';
import { MessagePage } from './../pages/message/message';
import { NotificationPage } from './../pages/notification/notification';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { StarRatingModule } from 'ionic3-star-rating';
import { ReplayPage } from './../pages/replay/replay';
import { ReportPage } from './../pages/report/report';
import { ReviewPage } from './../pages/review/review';
import { ReviewsPage } from './../pages/reviews/reviews'; 
import { LinksPage } from './../pages/links/links';
import { RecentSearchPage } from '../pages/recent-search/recent-search';
import { RecommandedPage } from '../pages/recommanded/recommanded';
import { RecommandedResualtPage } from '../pages/recommanded-resualt/recommanded-resualt';
import { ScanPage } from '../pages/scan/scan';
import { Camera } from '@ionic-native/camera';
import { scannedproductServices } from '../services/user/scannedproduct.services';
import { ProfileService } from '../services/user/profile.service';

import { HttpClientModule } from '@angular/common/http';
import { AUTHService } from '../services/user/AUTH.service';
import { MassageService } from '../services/messages.service'
import { Storage, IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';
import { SimilarProductsPage } from '../pages/similar-products/similar-products';
// import { NotficationService } from '../services/Notfcation/notfication.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from '@angular/fire';
import { Firebase } from '@ionic-native/firebase/ngx';

const firebase = {
  production: false,
  apiKey: "AIzaSyBYThMrbjOwXLTksqVd2zWKmwH86nfbydg",
  authDomain: "ionic-763e1.firebaseapp.com",
  databaseURL: "https://ionic-763e1.firebaseio.com",
  projectId: "ionic-763e1",
  storageBucket: "ionic-763e1.appspot.com",
  messagingSenderId: "543642243705"
}
import { SearchService } from '../services/Search.Service';
import { ReportService } from '../services/Report.Service';

import { AgmCoreModule } from '@agm/core';
import { ShopingLinksPage } from '../pages/shoping-links/shoping-links';
import { ShopingPlacesPage } from '../pages/shoping-places/shoping-places';
import { Geolocation } from '@ionic-native/geolocation';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //NotificationPage,
    MessagePage,
    OptionsPage,
    SettingPage,
    FaqHelpPage,
    ContactSupportPage,
    FabCameraPage,
    ProductPage,
    ReplayPage,
    ReportPage,
    ReviewPage,
    ReviewsPage,
    LinksPage,
    ProfilePage,
    FavouritesPage,
    MyReviewsPage,
    ScannedProductsPage,
    EditReviewsPage,
    SignUpPage,
    LogInPage,
    ForgetpasswordPage,
    SearchPage,
    SearchResualtPage,
    SearchTextPage,
    RecentSearchPage,
    RecommandedPage,
    RecommandedResualtPage,
    TopBarPage,
    ScanPage,
    ScanResultPage,
    SimilarProductsPage,
    ShopingLinksPage,
    ShopingPlacesPage,
    EditReplayPage,
    LikesPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    //ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDoDSUnSuYfJCLY-PkdDBIa8ZN_2BE6ank'
    }),
    //IonicStorageModule.forRoot(),
    NotificationPageModule,
    StarRatingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificationPage,
    MessagePage,
    OptionsPage,
    SettingPage,
    FaqHelpPage,
    ContactSupportPage,
    FabCameraPage,
    ProductPage,
    ReplayPage,
    ReportPage,
    ReviewPage,
    ReviewsPage,
    LinksPage,
    ProfilePage,
    FavouritesPage,
    MyReviewsPage,
    ScannedProductsPage,
    EditReviewsPage,
    SignUpPage,
    LogInPage,
    ForgetpasswordPage,
    SearchPage,
    SearchResualtPage,
    SearchTextPage,
    RecentSearchPage,
    RecommandedPage,
    RecommandedResualtPage,
    TopBarPage,
    ScanPage,
    ScanResultPage,
    SimilarProductsPage,
    ShopingLinksPage,
    ShopingPlacesPage,
    EditReplayPage,
    LikesPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    Camera,
    ProfileService,
    scannedproductServices,
    AUTHService,
    TextToSpeech,
    Device,
    EmailComposer,
    ScanService,
    ProductService,
    FavouriteService,
   
    Firebase,
    MassageService,
    SearchService,
    ReportService,
    LinksService,
    Geolocation,
    BrowserTab,
    Clipboard,
    ReviewService,
    MyReviews,
    My_Reviews,
    Edit_MyReview,
    ProductReviews,
    Reply,
    FCM,
    NotficationService,
    AppNotficationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
