myApp.controller('ContactListController', ['$scope', '$http', '$location', '$filter', 'ContactFactory',
function($scope, $http, $location, filter, ContactFactory) {

  $scope.contactFactory = ContactFactory;
  $scope.contacts = [];
  $scope.displayedCollection = $scope.contacts.list;

  $scope.contactFactory.factoryGetContactList().then(function() {
    $scope.contacts = ContactFactory.allContacts;
  });

  // $scope.contactFactory.factoryGetCurrentUserId();

  $scope.addContact = function(ev) {
    ContactFactory.factoryCallContactForm(ev);
  };

  $scope.contactInfo = function(id) {
    console.log('selected id: ', id);
    $scope.contactFactory.getContactId(id);
    $location.path('contactinfo');
  };

  $scope.standoutTrue = function(id) {
    $scope.contactFactory.factoryStandoutTrue(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.standoutFalse = function(id) {
    $scope.contactFactory.factoryStandoutFalse(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.convoinitTrue = function(id) {
    $scope.contactFactory.factoryConvoinitTrue(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.convoinitFalse = function(id) {
    $scope.contactFactory.factoryConvoinitFalse(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.inviteTrue = function(id) {
    $scope.contactFactory.factoryInviteTrue(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.inviteFalse = function(id) {
    $scope.contactFactory.factoryInviteFalse(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.challengerTrue = function(id) {
    $scope.contactFactory.factoryChallengerTrue(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.challengerFalse = function(id) {
    $scope.contactFactory.factoryChallengerFalse(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.nevercontactTrue = function(id) {
    $scope.contactFactory.factoryNevercontactTrue(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

  $scope.nevercontactFalse = function(id) {
    $scope.contactFactory.factoryNevercontactFalse(id).then(function() {
      $scope.contactFactory.factoryGetContactList().then(function() {
        $scope.contacts = ContactFactory.allContacts;
      });
    });
  };

}]);
