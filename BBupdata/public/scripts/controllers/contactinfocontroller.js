myApp.controller('ContactInfoController', ['$scope', '$http', 'ContactFactory',
function($scope, $http, ContactFactory) {

  $scope.contactFactory = ContactFactory;
  $scope.contact = {};
  $scope.contactReminders;

  $scope.addReminder = function(ev) {
    ContactFactory.factoryCallReminderForm(ev);
  };

  $scope.contactFactory.factoryGetSelectedContact().then(function() {
    $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
    enterData();
  });

  $scope.contactFactory.factoryGetUserReminders().then(function() {
    $scope.contactReminders = ContactFactory.currentContactReminders;
  });

  function enterData() {
    $scope.standout = $scope.contact.standout;
    $scope.convoinit = $scope.contact.convoinit;
    $scope.invite = $scope.contact.invite;
    $scope.challenger = $scope.contact.challenger;
    $scope.nevercontact = $scope.contact.nevercontact;
    $scope.name = $scope.contact.name;
    $scope.occupation = $scope.contact.occupation;
    $scope.family = $scope.contact.family;
    $scope.goals = $scope.contact.goals;
    $scope.struggles = $scope.contact.struggles;
    $scope.notes = $scope.contact.notes;
  }

  $scope.editPost = function() {
    var contact = {
      name: $scope.name,
      occupation: $scope.occupation,
      family: $scope.family,
      goals: $scope.goals,
      struggles: $scope.struggles,
      notes: $scope.notes
    };

    $scope.contactFactory.factoryEditContact(contact);

    alert('Contact has been updated');
  };

  $scope.standoutTrue = function(id) {
    $scope.contactFactory.factoryStandoutTrue(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.standoutFalse = function(id) {
    $scope.contactFactory.factoryStandoutFalse(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.convoinitTrue = function(id) {
    $scope.contactFactory.factoryConvoinitTrue(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.convoinitFalse = function(id) {
    $scope.contactFactory.factoryConvoinitFalse(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.inviteTrue = function(id) {
    $scope.contactFactory.factoryInviteTrue(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.inviteFalse = function(id) {
    $scope.contactFactory.factoryInviteFalse(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.challengerTrue = function(id) {
    $scope.contactFactory.factoryChallengerTrue(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.challengerFalse = function(id) {
    $scope.contactFactory.factoryChallengerFalse(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.nevercontactTrue = function(id) {
    $scope.contactFactory.factoryNevercontactTrue(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.nevercontactFalse = function(id) {
    $scope.contactFactory.factoryNevercontactFalse(id).then(function() {
      $scope.contactFactory.factoryGetSelectedContact().then(function() {
        $scope.contact = $scope.contactFactory.factoryGetSelectedContactData();
      });
    });
  };

  $scope.setComplete = function(id) {
    $scope.contactFactory.factoryReminderComplete(id).then(function() {
      $scope.contactFactory.factoryGetUserReminders().then(function() {
        $scope.contactReminders = ContactFactory.currentContactReminders;
      });
    });
  };

  $scope.setIncomplete = function(id) {
    $scope.contactFactory.factoryReminderIncomplete(id).then(function() {
      $scope.contactFactory.factoryGetUserReminders().then(function() {
        $scope.contactReminders = ContactFactory.currentContactReminders;
      });
    });
  };

}]);
