import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Messages,Chats } from '../../../lib/collections';

export default class ViewCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.chatId = this.$stateParams.chatId;

        this.helpers({
            messages() {
             return Messages.find({$and:[{ chatId: this.chatId },{status:1},{userId:{$ne:this.currentUserId}}]});
            },
            data() {
                return Chats.findOne(this.chatId);
            }

        });



     //   this.synth = window.speechSynthesis;

/*
        this.speak = function () {
            var s;
          //  console.log(this.chatId);
            var z= Chats.findOne(this.chatId);
           // console.log(z);
           if(z.userIds[0]==this.currentUserId) {
                s = Meteor.users.findOne(z.userIds[1]);

            }
            else{
                s = Meteor.users.findOne(z.userIds[0]);


            }
            var name= new SpeechSynthesisUtterance('unread messages of'+s.profile.name);
            this.synth.speak(name);

            var x = Messages.find({$and: [{chatId: this.chatId}, {status: {$ne:2}}, {userId: {$ne: this.currentUserId}}]});
            //this.utterance1 = new SpeechSynthesisUtterance("hello swapnil nohi jhj jjb hhh hhh");
            // utterence1.text='hello hello';
            x.forEach((m) => {

                var y = m.text;
                var z = this.$filter('calendar')(m.timestamp);
                var utterance2 = new SpeechSynthesisUtterance(z);
                this.synth.speak(utterance2);
                //console.log(y);

                var utterance1 = new SpeechSynthesisUtterance(y);
                this.synth.speak(utterance1);
               // console.log("safsd");


            });
        }

            this.speak();

            this.cancel = function () {

                this.synth.cancel();
                //   delete this.synth;
            }
            */



    }



    hideNewChatModal() {
        this.$state.go('tab.chats');
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

ViewCtrl.$inject = ['$state', 'NewChat1', '$ionicPopup', '$log','$stateParams','$filter'];