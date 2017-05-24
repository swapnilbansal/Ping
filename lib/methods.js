import { Meteor } from 'meteor/meteor';
import { Chats, Messages, Notes ,Game} from '../lib/collections';
//import watson from 'watson-developer-cloud';
//import Future from 'fibers/future';

Meteor.methods({
    shareNote(id,noteId)
    {
        Notes.update({_id:noteId},{$push:{'userIds':id}});
    },
    deleteGame(chatId)
    {
        Messages.remove({$and:[{type:'game'},{chatId:chatId}]});
    //console.log(x);
        Game.remove({'chatId': chatId});
           // newGame(chatId);

    },
    deleteGame1(chatId)
    {
      //  Messages.remove({$and:[{type:'game'},{chatId:chatId}]});
        //console.log(x);
        Game.remove({'chatId': chatId});
        // newGame(chatId);

    },

    changeSend(chatId)
    {
        Game.update({'chatId':chatId}, {$set: { 'isSend': 1}});
    },
    changeDash(id,chatId){
        var chat=Chats.findOne(chatId);
        var game1= Game.findOne({'chatId':chatId})
        var otherId;
        if (chat.userIds[0] == this.userId){otherId = chat.userIds[1];}else{otherId = chat.userIds[0];}

        if(game1.gameScore[id]=='-' && game1.gameStatus!=1) {
            if (game1.turnId == game1.userId) {
                if (id == 0) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.0': 'X'}});
                }
                if (id == 1) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.1': 'X'}});
                }
                if (id == 2) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.2': 'X'}});
                }
                if (id == 3) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.3': 'X'}});
                }
                if (id == 4) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.4': 'X'}});
                }
                if (id == 5) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.5': 'X'}});
                }
                if (id == 6) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.6': 'X'}});
                }
                if (id == 7) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.7': 'X'}});
                }
                if (id == 8) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.8': 'X'}});
                }

            }
            else {
                if (id == 0) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.0': 'O'}});
                }
                if (id == 1) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.1': 'O'}});
                }
                if (id == 2) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.2': 'O'}});
                }
                if (id == 3) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.3': 'O'}});
                }
                if (id == 4) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.4': 'O'}});
                }
                if (id == 5) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.5': 'O'}});
                }
                if (id == 6) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.6': 'O'}});
                }
                if (id == 7) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.7': 'O'}});
                }
                if (id == 8) {
                    Game.update({'chatId': chatId}, {$set: {'gameScore.8': 'O'}});
                }
            }
            Game.update({'chatId':chatId}, {$set:{'turnId':otherId}});
        }


        var game2= Game.findOne({'chatId':chatId});
        if((game2.gameScore[0]=='X' && game2.gameScore[1]=='X' && game2.gameScore[2]=='X') || (game2.gameScore[0]=='O' && game2.gameScore[1]=='O' && game2.gameScore[2]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[0]=='X' && game2.gameScore[1]=='X' && game2.gameScore[2]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[3]=='X' && game2.gameScore[4]=='X' && game2.gameScore[5]=='X') || (game2.gameScore[3]=='O' && game2.gameScore[4]=='O' && game2.gameScore[5]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[3]=='X' && game2.gameScore[4]=='X' && game2.gameScore[5]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[6]=='X' && game2.gameScore[7]=='X' && game2.gameScore[8]=='X') || (game2.gameScore[6]=='O' && game2.gameScore[7]=='O' && game2.gameScore[8]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[6]=='X' && game2.gameScore[7]=='X' && game2.gameScore[8]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[0]=='X' && game2.gameScore[3]=='X' && game2.gameScore[6]=='X') || (game2.gameScore[0]=='O' && game2.gameScore[3]=='O' && game2.gameScore[6]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[0]=='X' && game2.gameScore[3]=='X' && game2.gameScore[6]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[1]=='X' && game2.gameScore[4]=='X' && game2.gameScore[7]=='X') || (game2.gameScore[1]=='O' && game2.gameScore[4]=='O' && game2.gameScore[7]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[1]=='X' && game2.gameScore[4]=='X' && game2.gameScore[7]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[2]=='X' && game2.gameScore[5]=='X' && game2.gameScore[8]=='X') || (game2.gameScore[2]=='O' && game2.gameScore[5]=='O' && game2.gameScore[8]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[2]=='X' && game2.gameScore[5]=='X' && game2.gameScore[8]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[0]=='X' && game2.gameScore[4]=='X' && game2.gameScore[8]=='X') || (game2.gameScore[0]=='O' && game2.gameScore[4]=='O' && game2.gameScore[8]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[0]=='X' && game2.gameScore[4]=='X' && game2.gameScore[8]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        if((game2.gameScore[2]=='X' && game2.gameScore[4]=='X' && game2.gameScore[6]=='X') || (game2.gameScore[2]=='O' && game2.gameScore[4]=='O' && game2.gameScore[6]=='O'))
        {
            Game.update({'chatId':chatId}, {$set:{'gameStatus':1}});
            if(game2.gameScore[2]=='X' && game2.gameScore[4]=='X' && game2.gameScore[6]=='X')
                Game.update({'chatId':chatId}, {$set:{'winnerId': game2.userId}});
            else {

                Game.update({'chatId': chatId}, {$set: {'winnerId':game2.userIds[1] }});
            }
        }

        var game3=Game.findOne({'chatId':chatId});

        if((game3.gameScore[0]!='-')&&(game3.gameScore[1]!='-')&&(game3.gameScore[2]!='-')&&(game3.gameScore[3]!='-')&&(game3.gameScore[4]!='-')&&(game3.gameScore[5]!='-')&&(game3.gameScore[6]!='-')&&(game3.gameScore[7]!='-')&&(game3.gameScore[8]!='-'))
        {
            if(game3.gameStatus==0){
                Game.update({'chatId':chatId},{$set:{'gameStatus':2}});
            }
        }





    },

    changeFlag(chatId){

        var game1= Game.findOne({'chatId':chatId});

        if(game1.userId==this.userId)
        {
            Game.update({'chatId': chatId}, {$set: {'flag1':1 }});
            console.log("flag1 1");
        }
        else
        {
            console.log("flag2 1");
            Game.update({'chatId': chatId}, {$set: {'flag2':1 }});
        }




    },
    changeFlag1(chatId){

        var game1= Game.findOne({'chatId':chatId});

        if(game1.userId==this.userId)
        {
            console.log("flag1 0");
            Game.update({'chatId': chatId}, {$set: {'flag1':0 }});

        }
        else {
            console.log("flag2 0");
            Game.update({'chatId': chatId}, {$set: {'flag2': 0}});

        }



    },

    updateMessage(id,chatId){

        Messages.update(id,{$set:{status:2}});



    },

    updateMessage1(id){
        var messages  = Messages.find({$and:[{chatId:id},{status:0}]});

        messages.forEach((m)=>{

            Messages.update(m._id, {$set:{status : 1}});


        });
        Chats.update(id, {$set:{'lastMessage.status' : 1}});

    },
    updatelastMessage(chatId){
        var x= Chats.findOne(chatId);
        if(x.lastMessage.userId!=this.userId)
            Chats.update(chatId, {$set:{'lastMessage.status' : 2}});

        var y= Chats.findOne(chatId);
    console.log(y);

    },


    newNote(){
        const note = {
            text:'New Note',
            userIds: [this.userId],
            createdAt: new Date()
        };

        const noteId = Notes.insert(note);
        return noteId;


    },

    deleteNote(noteId){
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged to create a chat.');
        }

        check(noteId, String);

        const note = Notes.findOne(noteId);

        return Notes.remove({ _id: noteId });
    },
    saveNote(id,text){
       // console.log(id);
        //console.log(text);
        Notes.update(id, {$set:{text : text}});


    },

    newGame(chatId){

        var chat=Chats.findOne(chatId);
        var otherId;
        if (chat.userIds[0] == this.userId) {
            otherId = chat.userIds[1];
        }
        else {
            otherId = chat.userIds[0];
        }
        const game = {
            userId: this.userId,
            turnId:this.userId,
            userIds: [this.userId,otherId],
            chatId: chatId,
            gameStatus:0,
         gameScore:['-','-','-','-','-','-','-','-','-'],
            type:'game',
            flag1:0,
            flag2:0,//0->null,1->x,2->0
            isSend:0
        };

       const id= Game.insert(game);

        console.log(id);



    },

    saveMessage1(text1){
        const note = {
            text:text1,
            userIds: [this.userId],
            createdAt: new Date()
        };

       Notes.insert(note);
    },

    sendGame(chatId){

        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to send message.');
        }
        var game1= Game.findOne({'chatId':chatId})
        console.log(this.userId);
        console.log(game1.userId);

        if(game1.userId==this.userId) {
            var message = {};
            message.timestamp = new Date();
            message.userId = this.userId;
            message.type = 'game';
            message.chatId = chatId;

            const messageId = Messages.insert(message);
            Chats.update(message.chatId, {$set: {lastMessage: message}});
            Chats.update(message.chatId, { $set: { isDisplay: 1 } });

        }

    },

    newMessage(message) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to send message.');
        }
/*
        check(message(
            {
                text: String,
                //type: text,
                chatId: String
            }
        ));*/
        message.timestamp = new Date();
        message.userId = this.userId;
        message.type='text';



        const messageId = Messages.insert(message);
        Chats.update(message.chatId, { $set: { lastMessage: message } });
        Chats.update(message.chatId, { $set: { isDisplay: 1 } });

        // console.log(mesaage.status);

        //return messageId;
    },
    newPicture(message) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to send message.');
        }

        message.timestamp = new Date();
        message.userId = this.userId;
        message.type='picture';

        console.log(message.status);

        const messageId = Messages.insert(message);
        Chats.update(message.chatId, { $set: { lastMessage: message } });
        Chats.update(message.chatId, { $set: { isDisplay: 1 } });


        //return messageId;
    },
    updateName(name) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to update his name.');
        }

        check(name, String);

        if (name.length === 0) {
            throw Meteor.Error('name-required', 'Must provide a user name');
        }

        Meteor.users.update(this.userId, { $set:{ 'profile.flag': 1 } });
       // console.log(this.userId.flag);
        var s = Meteor.users.findOne(this.userId);
       // console.log(s);

        return Meteor.users.update(this.userId, {$set: {'profile.name': name}});
    },
    newChat(otherId) {
    if (!this.userId) {
        throw new Meteor.Error('not-logged-in',
            'Must be logged to create a chat.');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
        throw new Meteor.Error('user-not-exists',
            'Chat\'s user not exists');
    }

    const chat = {
        userIds: [this.userId, otherId],
        createdAt: new Date(),
        isDisplay:0

    };

    const chatId = Chats.insert(chat);

    return chatId;
},
    removeChat(chatId) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged to create a chat.');
        }

        check(chatId, String);

        const chat = Chats.findOne(chatId);

        if (!chat || !_.include(chat.userIds, this.userId)) {
            throw new Meteor.Error('chat-not-exists',
                'Chat not exists');
        }

        Messages.remove({ chatId: chatId });
        Game.remove({chatId:chatId});

        return Chats.remove({ _id: chatId });
    },
    updatePicture(data) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to update his picture.');
        }

        check(data, String);

        return Meteor.users.update(this.userId, {$set: {'profile.picture': data}});
    },

    out(){
          //  console.log(this.userId);
        Meteor.users.update(this.userId, { $set:{ 'profile.flag': 0 } });
        // console.log(this.userId.flag);
        var s = Meteor.users.findOne({_id:this.userId});
      //  console.log(s);

    }




});