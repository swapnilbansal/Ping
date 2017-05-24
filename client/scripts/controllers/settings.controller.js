import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class SettingsCtrl extends Controller {

    logout(){
        this.callMethod('out', (err) => {
            if (err) return this.handleError(err);

            this.logout1();
        });
    }

    logout1() {


        Meteor.logout((err) => {
            if (err) return this.handleError(err);

                this.$state.go('login');
            });




    }
    updateName() {
        if (_.isEmpty(this.name)) return;

        console.log(this.currentUser);


    }
    handleError (err) {
        this.$log.error('Settings modification error', err);

        this.$ionicPopup.alert({
            title: err.reason || 'Settings modification failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }

    profile1(){
        this.$state.go('profile1');

    }
}

SettingsCtrl.$inject = ['$state', '$ionicPopup', '$log'];