import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Messages,Chats } from '../../../lib/collections';

export default class ImageCtrl extends Controller {
    constructor() {
        super(...arguments);


    this.messageId=this.$stateParams.messageId;
        this.message= Messages.findOne(this.messageId);
        console.log(this.message);
        this.chatId=this.message.chatId;



    }

    hideImage(){
        this.$state.go('tab.chat',{chatId:this.chatId});
    }

}


ImageCtrl.$inject = ['$state','$stateParams','$filter'];