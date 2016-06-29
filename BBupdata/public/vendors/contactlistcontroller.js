myApp.controller('ContactListController', ['$scope', 'ContactFactory', 'ngTableParams', function($scope, ContactFactory, $filter, ngTableParams) {

  $scope.users = [{name: "Moroni", age: 50}, {name: "Luis", age: 25}];

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: $scope.users.length
  }, {
      counts: [],
      total: 1,
      getData: function ($defer, params) {
          $scope.data = params.sorting() ? $filter('orderBy')($scope.users, params.orderBy()) : $scope.users;
          $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
          $scope.data = $scope.data.slice(0, 20);
          $defer.resolve($scope.data);
      }
  });

  $scope.getMoreData = function () {
      $scope.data = $scope.users.slice(0, $scope.data.length + 20);
  };

}]);
