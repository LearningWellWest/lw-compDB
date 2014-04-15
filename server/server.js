Meteor.publish("competences", function() {
    return Competences.find();
});

Meteor.publish("userInfo", function() {
    return Meteor.users.find({}, {
        fields: {
            profile: 1,
            emails: 1,
        }
    });
});

Meteor.methods({
    addCompetence: function(text) {
        if (!this.userId) {
            throw new Meteor.Error(403, "Not logged on!");
        }
        comp = Competences.findOne({
            name: text
        });
        compID = null;


        if (comp) {
            compID = comp._id

            // check if user already has competence
            gotComp = Meteor.users.findOne({
                _id: this.userId,
                "profile.competences": {
                    $elemMatch: {
                        id: compID
                    }
                }
            });
            if (gotComp) {
                throw new Meteor.Error(403, "User already got that competence");
            }

        } else {
            compID = Competences.insert({
                name: text
            });
        }

        Meteor.users.update({
            _id: this.userId
        }, {
            $addToSet: {
                "profile.competences": {
                    id: compID
                }
            }
        });

    },
    removeCompetence: function(text) {
        if (!this.userId) {
            throw new Meteor.Error(403, "Not logged on!");
        }
        comp = Competences.findOne({
            name: text
        });
        if (comp) {
            Meteor.users.update({
                _id: this.userId
            }, {

                $pull: {
                    "profile.competences": {
                        id: comp._id
                    }
                }
            })
        }

    },
});