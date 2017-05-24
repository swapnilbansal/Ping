import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages,Notes } from '../../../lib/collections';

export default class NoteCtrl extends Controller {


    constructor() {
        super(...arguments);
        var self=this;
        this.noteId= this.$stateParams.noteId;
      //  console.log(this.noteId);
        this.note1= Notes.findOne(this.noteId);
        this.text=this.note1.text;
       // console.log(this.text);
        this.$scope.$on('$destroy', function (event) {

            self.callMethod('saveNote',self.noteId,self.text, (err) => {
                if (err) return this.handleError(err);
                //  this.$state.go('tab.note', { noteId });
            });

        });

    }





}
NoteCtrl.$inject = ['$interval','$rootScope', '$ionicModal','$state','$stateParams'];