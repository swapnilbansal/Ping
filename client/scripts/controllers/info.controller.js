import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
export default class InfoCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.messasgeId = this.$stateParams.id;


        this.helpers({
            data() {
                return Chats.findOne(this.messageId);
            }
        });



    }




}

InfoCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log'];