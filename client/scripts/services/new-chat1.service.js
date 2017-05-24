import { Service } from 'angular-ecmascript/module-helpers';

export default class NewChatService1 extends Service {
    constructor() {
        super(...arguments);

        this.templateUrl = 'client/templates/view.html';


        this.showModal=function(id) {
            //  this.scope = this.$rootScope.$new();

            this.$ionicModal.fromTemplateUrl(this.templateUrl, {

                scope: this.$scope

            })
                .then((modal) => {

                    this.modal = modal;
                    this.chatId=id;
                    this.modal.show();
                });
        }
        this.hideModal=function() {
            // this.scope.$destroy();
            this.modal.remove();
        }

    }






}

NewChatService1.$name = 'NewChat1';
NewChatService1.$inject = ['$rootScope', '$ionicModal'];