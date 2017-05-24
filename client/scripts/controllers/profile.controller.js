import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
//import { MeteorCamera } from 'meteor/mdg:camera';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileCtrl extends Controller {
    constructor() {
        super(...arguments);

        const profile = this.currentUser && this.currentUser.profile;

        this.name = profile ? profile.name : '';
    }

  updatePicture () {
            MeteorCameraUI.getPicture({}, (err, data) => {     //width: 60, height: 60, quality:100
                  if (err) return this.handleError(err);

                      this.$ionicLoading.show({
                            template: 'Updating picture...'
                  });

                      this.callMethod('updatePicture', data, (err) => {
                            this.$ionicLoading.hide();
                            this.handleError(err);
                         });
                });
          }

    updateName() {
        if (_.isEmpty(this.name)) return;



        this.callMethod('updateName', this.name, (err) => {
            if (err) return this.handleError(err);
            this.$state.go('tab.chats');
            delete this.name;
        });
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

    updateStatus()
    {
        this.callMethod('updateStatus', this.name, (err) => {
            if (err) return this.handleError(err);
            this.$state.go('tab.chats');
            delete this.name;
        });

    }
}

ProfileCtrl.$inject = ['$state', '$ionicPopup','$ionicLoading' ,'$log'];