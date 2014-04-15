Competences = new Meteor.Collection("competences");

Router.configure({
    layoutTemplate: 'masterLayout',
    waitOn: function() {
        return [Meteor.subscribe('competences'), Meteor.subscribe("userInfo")];
    }
});
Router.map(function() {
    this.route('home', {
        path: '/',
        // waitOn: function() {
        //     return Meteor.subscribe('post', this.params._id)
        // },
        // data: function() {
        //     return Posts.findOne(this.params._id);
        // }
    });
    this.route('addCompetence', {
        path: '/addCompetence',
        // waitOn: function() {
        //     return Meteor.subscribe('post', this.params._id)
        // },
        // data: function() {
        //     return Posts.findOne(this.params._id);
        // }
    });
});