Template.competenceList.competences = function() {
    return Competences.find({}, {
        sort: {
            name: 1
        }
    });
}

Template.competenceList.isChecked = function(e) {
    compID = this._id;
    userID = Meteor.userId();
    if (userID) {
        gotComp = Meteor.users.findOne({
            _id: userID,
            "profile.competences": {
                $elemMatch: {
                    id: compID
                }
            }
        });

        if (gotComp) {
            return true;
        }
    }
    return false;

}

Template.competenceList.events({
    'change .compCheck': function(e) {
        checked = $(e.currentTarget).prop('checked');
        text = $(e.currentTarget).val();

        if (checked) {
            console.log("adding competence: " + text + "..");
            Meteor.call("addCompetence", text, function(err, result) {
                if (err) {
                    alert(err);
                }
            });
        } else {
            console.log("removing competence: " + text + "..");
            Meteor.call("removeCompetence", text, function(err, result) {
                if (err) {
                    alert(err);
                }
            });

        }
    }
});


Template.addCompetence.events({
    'keypress #AddCompetence': function(e) {
        if (e.which == 13) {
            e.preventDefault();
            text = $(e.currentTarget).val();
            console.log("added competence: " + text);
            $(e.currentTarget).val("");

            Meteor.call("addCompetence", text, function(err, result) {
                if (err) {
                    alert(err);
                }
            });
        }
    },
});