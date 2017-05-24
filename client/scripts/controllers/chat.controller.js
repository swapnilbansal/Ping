import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages,Game } from '../../../lib/collections';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
export default class ChatCtrl extends Controller {
    constructor($scope) {
        super(...arguments);
        Meteor.subscribe('game');

        this.size=1;
        this.inputSize=12;
        this.chatId = this.$stateParams.chatId;
        this.status;
        this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
        this.isCordova = Meteor.isCordova;

        this.helpers({
            messages() {
                return Messages.find({ chatId: this.chatId });
            },
            data() {
                return Chats.findOne(this.chatId);
            },

            data1(){
                return Game.findOne({'chatId':this.chatId});
            }

        });
        this.autoScroll();


        this.message='';
var self=this;
        this.rec = new webkitSpeechRecognition();
        this.interim = [];
        this.final = '';
        this.promise;

       // var self = this;

        this.rec.continuous = false;
        this.rec.lang = 'en-US';
        this.rec.interimResults = true;
        this.rec.onerror = function(event) {
            console.log('error!');
        };

        this.start = function() {
            // this.final='bjbbb';
            self.rec.start();

        };

        this.rec.onresult = function(event) {
            for(var i = event.resultIndex; i < event.results.length; i++) {
                if(event.results[i].isFinal) {
                    self.message = self.message.concat(event.results[i][0].transcript);
                    console.log(event.results[i][0].transcript);


                    self.$scope.$apply();



                } else {
                   //  self.interim.push(event.results[i][0].transcript);
                    // console.log('interim ' + event.results[i][0].transcript);


                    //  self.$scope.$apply();


                }
            }
        };



        this.$scope.$on('$ionicView.enter', function() {
            var otherId
            var z = Chats.findOne(self.chatId);
            if (z.userIds[0] == self.currentUser._id) {
                otherId = z.userIds[1];
            }
            else {
                otherId = z.userIds[0];
            }
            var otherUser = Meteor.users.findOne(otherId);
            self.promise = self.$interval(() => {
                var x = Messages.find({chatId: self.chatId});

                x.forEach((m) => {

                    if (m.userId != self.currentUser._id && m.status != 2) {

                        self.callMethod('updateMessage', m._id);


                    }

                    // console.log(m);

                });
            }, 100);


            self.callMethod('updatelastMessage', self.chatId);




        });



        this.$scope.$on('$destroy', function (event) {

            self.$interval.cancel(self.promise);

            self.callMethod('updatelastMessage', self.chatId);




        });






    }




    sendPicture() {
        MeteorCameraUI.getPicture({}, (err, data) => {
            if (err) return this.handleError(err);



            var x= Chats.findOne({ _id: this.chatId});

            var otherId ;
            if(x.userIds[0]===this.currentUser._id)
            {

                otherId=x.userIds[1];
            }
            else{

                otherId=x.userIds[0];
            }

            var otherUser = Meteor.users.findOne(otherId);
            if(otherUser.profile.flag===1)
                this.status=1;
            else
            {this.status=0;}

            this.callMethod('newPicture', {
                picture: data,
                chatId: this.chatId,
                status: this.status

            });
        });
    }

    saveMessage(message){
        this.callMethod('saveMessage1',message.text);

        const confirmPopup = this.$ionicPopup.confirm({
            title: 'Note',
            template: '<div>' + 'The Note has been saved'+ '</div>',
            cssClass: 'text-center',
            okText: 'Ok!',
            okType: 'button-positive button-clear'

        });

        confirmPopup.then((res) => {
            if (!res) return;

        });

    }
    sendMessage() {
        if (_.isEmpty(this.message)) return;

       var x= Chats.findOne({ _id: this.chatId});

        var otherId ;
        if(x.userIds[0]===this.currentUser._id)
        {

            otherId=x.userIds[1];
        }
        else{

            otherId=x.userIds[0];
        }

        var otherUser = Meteor.users.findOne(otherId);
       if(otherUser.profile.flag===1)
        this.status=1;
        else
       {this.status=0;}
       //console.log(this.status);
        this.callMethod('newMessage', {
            text: this.message,
           // type: text,
            chatId: this.chatId,
            status: this.status,
            size:this.size
        });

        this.message='';
    }

    autoScroll() {
        let recentMessagesNum = this.messages.length;

        this.autorun(() => {
            const currMessagesNum = this.getCollectionReactively('messages').length;
            const animate = recentMessagesNum != currMessagesNum;
            recentMessagesNum = currMessagesNum;
            this.scrollBottom(animate);
        });
    }

    inputUp () {
        if (this.isIOS) {
            this.keyboardHeight = 216;
        }

        this.scrollBottom(true);
    }

    inputDown () {
        if (this.isIOS) {
            this.keyboardHeight = 0;
        }

        this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
    }

    closeKeyboard () {
        if (this.isCordova) {
            cordova.plugins.Keyboard.close();
        }
    }

    scrollBottom(animate) {
        this.$timeout(() => {
            this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
        }, 300);
    }
    handleError(err) {
        if (err.error == 'cancel') return;
        this.$log.error('Profile save error ', err);

        this.$ionicPopup.alert({
            title: err.reason || 'Save failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }


    messageinfo(message) {
          this.$state.go('info',{id:message._id});
    }


    info(id) {
        //if (_.isEmpty()) return;

        var x= Messages.findOne({_id:id});
        var ch= Chats.findOne({ _id: this.chatId});

        var otherId ;
        if(ch.userIds[0]===this.currentUser._id)
        {otherId=ch.userIds[1];}
        else{otherId=ch.userIds[0];}
        var otherUser = Meteor.users.findOne(otherId);

    var str,str1;
   // console.log(x.status);


           if(x.status===2) {
               if (x.type == 'picture') {
                   str = "Read";
                   str1 = '';
               }
               else
               { str = "Read"; str1= x.text;}
           }
            else if(x.status==1||otherUser.profile.flag==1) {
               if (x.type == 'picture') {
                   str = "Delivered";
                   str1 = '';
               }
               else
               { str = "Delivered"; str1= x.text;}
           }
           else
           {
               if (x.type == 'picture') {
                   str = "Not Delivered";
                   str1 = '';
               }
               else
               { str = "Not Delivered"; str1= x.text;}

           }
        const confirmPopup = this.$ionicPopup.confirm({
            title: 'Info',
            template: '<div>' + str1 + '</div><div>'+str+'</div>',
            cssClass: 'text-center',
            okText: 'Ok!',
            okType: 'button-positive button-clear'

        });

        confirmPopup.then((res) => {
            if (!res) return;

        });
    }

    read1(id){



    }
    viewGame()
    {    this.callMethod('changeFlag', this.chatId);
        this.$state.go('game',{chatId:this.chatId});

    }

    newGame(){

        var game=Game.findOne({chatId:this.chatId});
        console.log(game);
        if(!game) {
            //console.log(game._id);
            this.callMethod('newGame', this.chatId);
        }
        this.callMethod('changeFlag', this.chatId);
        this.$state.go('game',{chatId:this.chatId});


    }

    fontSize(){
        this.size+=0.5;
        if(this.size>2)
            this.size=1;

        this.inputSize+=6;
        if(this.inputSize>24)
            this.inputSize=12;

      //  console.log(this.inputSize);


    }
    showImage(id)
    {
        this.$state.go('image', {messageId:id});
    }

}

ChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log', '$state','$scope','$interval'];