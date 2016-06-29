myApp.controller('AddContactController', ['$scope', '$http', 'ContactFactory',
'$mdDialog', '$mdMedia', function($scope, $http, ContactFactory, $mdDialog, $mdMedia) {

  $scope.contactFactory = ContactFactory;
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  $scope.contacts = ContactFactory.allContacts;

  var clearForm = function() {
    $scope.name = '';
    $scope.standout = false;
    $scope.convoinit = false;
    $scope.invite = false;
    $scope.challenger = false;
    $scope.nevercontact = false;
  };

  clearForm();

  $scope.saveContact = function() {

    var contact = {
      name: $scope.name,
      standout: $scope.standout,
      convoinit: $scope.convoinit,
      invite: $scope.invite,
      challenger: $scope.challenger,
      nevercontact: $scope.nevercontact
    };

    $scope.contactFactory.factorySaveContact(contact).then(function() {
      $scope.contacts = $scope.contactFactory.factoryContactList();
    });

    clearForm();
    $mdDialog.hide();
  };
}]);
