Template.home.persons = function() {
    compText = Session.get("competenceText");
    if (compText) {
        comps = Competences.find({
            name: {
                $regex: compText,
                $options: 'i'
            }
        }).fetch();
        if (comps) {
            compIds = $.map(comps, function(obj) {
                return obj._id;
            });
            return Meteor.users.find({
                "profile.competences": {
                    $elemMatch: {
                        id: {
                            $in: compIds
                        }
                    }
                }
            });
        }
    }

};
Template.home.competenceText = function() {
    return Session.get("competenceText");
}
Template.home.matchingCompetences = function() {
    compText = Session.get("competenceText");
    if (compText) {
        return Competences.find({
            name: {
                $regex: compText,
                $options: 'i'
            }
        });
    }

};

Template.home.events({
    'keyup #CompetenceText': function(e) {
        text = $(e.currentTarget).val();
        console.log(text);
        Session.set("competenceText", text);
    },
});

Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY'
});