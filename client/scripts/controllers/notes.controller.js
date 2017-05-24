import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Notes } from '../../../lib/collections';
import { Meteor } from 'meteor/meteor';


export default class NotesCtrl extends Controller {


    constructor() {
        super(...arguments);
        Meteor.subscribe('notes');

        this.helpers({
            mm() {
                return Notes.find({userIds:this.currentUser._id});

            }

        });
        var self=this;
        this.$scope.$on('$ionicView.enter', function() {
            var not= Notes.findOne({text:"New Note"});
            // console.log(not);

        });


        }
        share(note)
        {
            this.$state.go('share',{noteId:note._id});
        }
        newNote(){
           this.callMethod('newNote', (err, noteId) => {
               if (err) return this.handleError(err);
               this.$state.go('tab.note', { noteId });
           });

        }
        remove (note){
            this.callMethod('deleteNote',note._id, (err) => {
                if (err) return this.handleError(err);

            });

        }



}
NotesCtrl.$inject = ['$interval','$rootScope', '$ionicModal','$state'];