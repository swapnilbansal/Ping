import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');
export const Notes = new Mongo.Collection('notes');
export const Game = new Mongo.Collection('game');
