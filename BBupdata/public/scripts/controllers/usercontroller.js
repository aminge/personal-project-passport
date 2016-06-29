myApp.controller('UserController', ['$scope', '$http', '$location', '$mdDialog',
  function($scope, $http, $location, $mdDialog) {

  console.log('loaded UserController');

  $scope.UserFirstName;

  $scope.getContactList = function() {
    var promise = $http.get('/contactlist/').then(function(response) {
      currentUserFullName = response.data.name.split(' ');
      $scope.currentUserFirstName = currentUserFullName[0];
    });
    return promise;
  };

  $scope.getContactList();

}]);
