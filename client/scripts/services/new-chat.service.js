import { Service } from 'angular-ecmascript/module-helpers';

export default class NewChatService extends Service {
    constructor() {
        super(...arguments);

        this.templateUrl = 'client/templates/new-chat.html';
        this.templateUrl1 = 'client/templates/view.html';
    }

    showModal() {
        this.scope = this.$rootScope.$new();

        this.$ionicModal.fromTemplateUrl(this.templateUrl, {
            scope: this.scope
        })
            .then((modal) => {
                this.modal = modal;
                this.modal.show();
            });
    }

    showModal1() {
        this.scope1 = this.$rootScope.$new();

        this.$ionicModal.fromTemplateUrl(this.templateUrl1, {
            scope: this.scope1
        })
            .then((modal) => {
                this.modal1 = modal;
                this.modal1.show();
            });
    }
    hideModal() {
        this.scope.$destroy();
        this.modal.remove();
    }
    hideModal1() {
        this.scope1.$destroy();
        this.modal1.remove();
    }
}

NewChatService.$name = 'NewChat';
NewChatService.$inject = ['$rootScope', '$ionicModal'];