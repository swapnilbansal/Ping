import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';

export default class ChatsCtrl extends Controller {


    constructor() {
        super(...arguments);

        this.helpers({
            data() {
                return Chats.find();
            }



        });
        this.pp=1;
        this.promise;
      //  this.interval=400;
        var self = this;

        this.synth = window.speechSynthesis;


        this.$scope.$on('$ionicView.enter', function() {
            //console.log("ok");

            self.data.forEach((c) => {
                var i = 0;
               // console.log(c.lastMessage);
                var otherId;
                var otherUser;
                if (c.lastMessage.userId == self.currentUser._id && c.lastMessage.status == 0) {
                   // console.log(c.lastMessage.status);
                    if (c.userIds[0] == self.currentUser._id) {
                        otherId = c.userIds[1];
                    }
                    else {
                        otherId = c.userIds[0];
                    }

                    // console.log(otherUser.profile.flag);

                    self.promise = self.$interval(() => {
                        otherUser = Meteor.users.findOne(otherId);
                       //  console.log("interval workin");
                       if (otherUser.profile.flag == 1) {

                            // console.log("okk");
                             self.callMethod('updateMessage1', c._id);
                            var name = new SpeechSynthesisUtterance(otherUser.profile.name + 'is online');
                           self.synth.speak(name);
                            self.cancelInterval();

                        }

                    }, 1000);

                }

            });

        });


     //   this.speak();
        this.cancelInterval=function(){
            this.$interval.cancel(this.promise);
        }


    }


    showNewChatModal() {
        this.NewChat.showModal();
    }
    showNewChatModal1(id) {
        this.$state.go('view',{chatId:id});
    }

    remove(chat) {
        this.callMethod('removeChat', chat._id);
    }



}
ChatsCtrl.$inject = ['NewChat','$interval','$rootScope', '$ionicModal','NewChat1','$state'];