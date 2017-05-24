import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Messages,Chats,Notes } from '../../../lib/collections';

export default class ShareCtrl extends Controller {
    constructor() {
        super(...arguments);
        Meteor.subscribe('users');

        this.noteId= this.$stateParams.noteId;

        this.helpers({
            users() {
                return Meteor.users.find({ _id: { $ne: this.currentUserId } });
            }
        });

        this.checked=[];




    }



    hide() {
        this.$state.go('tab.notes');
        //console.log(this.checked);

    }
    shareNote() {
        // console.log(this.checked);
        for(i in this.checked)
        {
           console.log(i);
            console.log(this.checked[i]);
            this.callMethod('shareNote',i,this.noteId);
        }

        this.$state.go('tab.notes');



    }


    handleError(err) {
        this.$log.error('New chat creation error ', err);

        this.$ionicPopup.alert({
            title: err.reason || 'New chat creation failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}

ShareCtrl.$inject = ['$state', 'NewChat1', '$ionicPopup', '$log','$stateParams','$filter'];