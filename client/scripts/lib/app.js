import 'angular-animate';
import 'angular-meteor';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import 'angular-meteor-auth';
import 'angular-moment';
import Angular from 'angular';
//import ngMaterial from 'angular-material'
import { Meteor } from 'meteor/meteor';
import Loader from 'angular-ecmascript/module-loader';

// Modules
import ChatsCtrl from '../controllers/chats.controller';
import CalendarFilter from '../filters/calendar.filter';
import ChatNameFilter from '../filters/chat-name.filter';
import NewChatService from '../services/new-chat.service';
import ChatPictureFilter from '../filters/chat-picture.filter';
import ChatCtrl from '../controllers/chat.controller';
import LoginCtrl from '../controllers/login.controller';
import NewChatCtrl from '../controllers/new-chat.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import InputDirective from '../directives/input.directive';
import ProfileCtrl from '../controllers/profile.controller';
import InfoCtrl from '../controllers/info.controller';
import ProfileCtrl1 from '../controllers/profile1.controller';
import NewChatService1 from '../services/new-chat1.service';
import SettingsCtrl from '../controllers/settings.controller';
import ViewCtrl from '../controllers/view.controller';
import NotesCtrl from '../controllers/notes.controller';
import NoteCtrl from '../controllers/note.controller';
import GameCtrl from '../controllers/game.controller';
import ShareCtrl from '../controllers/share.controller';
import ImageCtrl from '../controllers/image.controller';
//import ContactCtrl from '../controllers/contact.controller';
import Routes from '../routes';

const App = 'Whatsapp';

// App
Angular.module(App, [
    'angular-meteor',
    ///'ngMaterial',
    'angularMoment',
    'angular-meteor.auth',
    'ionic'



]);

new Loader(App)
    .load(ChatsCtrl)
    .load(CalendarFilter)
    .load(NewChatService1)
    .load(ChatNameFilter)
    .load(ChatPictureFilter)
    .load(NewChatService)
    .load(GameCtrl)
    .load(NotesCtrl)
    .load(NoteCtrl)
    .load(ViewCtrl)
    .load(ChatCtrl)
    .load(InputDirective)
    .load(ConfirmationCtrl)
    .load(SettingsCtrl)
    .load(ProfileCtrl)
    .load(InfoCtrl)
    .load(ProfileCtrl1)
    //.load(angularVideoBg)
    .load(LoginCtrl)
    .load(ShareCtrl)
    .load(NewChatCtrl)
    .load(ImageCtrl)
    .load(Routes);


// Startup
if (Meteor.isCordova) {
    Angular.element(document).on('deviceready', onReady);
}
else {
    Angular.element(document).ready(onReady);
}

function onReady() {
    Angular.bootstrap(document, [App]);
}