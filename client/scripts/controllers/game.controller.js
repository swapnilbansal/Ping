import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
//import { MeteorCamera } from 'meteor/mdg:camera';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Game } from '../../../lib/collections';
import { Meteor } from 'meteor/meteor';



export default class GameCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.chatId = this.$stateParams.chatId;
        Meteor.subscribe('game');
        this.helpers({
            data() {
                return Game.findOne({chatId:this.chatId});
            }
        });
        //console.log("Sg"+a);

        var self=this;
        this.$scope.$on('$ionicView.enter', function() {

        });


        this.$scope.$on('$destroy', function (event) {



        });



    }

    send() {
        if (this.data.isSend == 0) {
            this.callMethod('changeSend',this.chatId);
        this.callMethod('sendGame', this.chatId);
            this.isSend=1;
    }

    }
    reset()
    {
    }

    cf1(){

    }
cancel(){
    this.$state.go('tab.chat',{chatId:this.chatId});
    this.callMethod('deleteGame1', this.chatId);


}
    hide() {
        this.callMethod('changeFlag1', this.chatId);
      //  self.$scope.$apply();

        console.log(this.data.flag1+" "+this.data.flag2);
        var game1= Game.findOne({'chatId':this.chatId});
        console.log(game1);
        if ((game1.flag1 ==0 )&& (game1.flag2==0 )&& (game1.gameStatus != 0))
        {    console.log("fsfs");
            this.isSend=0;
            this.callMethod('deleteGame', this.chatId);
        }

        this.$state.go('tab.chat',{chatId:this.chatId});
    }

    change(id)
    {
        console.log(id);
        if(this.data.turnId==this.currentUser._id) {

            console.log('okk');
            this.callMethod('changeDash',id,this.chatId);
        }

     //
    }

    new(){

        var game=Game.findOne({chatId:this.chatId});
        console.log(game);
        if(!game) {
            //console.log(game._id);
            this.callMethod('newGame', this.chatId);
            this.isSend=0;
        }


        //this.$state.go('game',{chatId:this.chatId});


    }


}


    GameCtrl.$inject = ['$state', '$ionicPopup','$ionicLoading' ,'$log','$stateParams','$scope'];