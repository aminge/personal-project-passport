myApp.controller('EditGoalController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.goal = $scope.dataFactory.factoryGetGoalToEdit();
    // need to call a function that gets the goal that the user selected to edit

    $scope.updateGoal = function() {
        $scope.dataFactory.factoryUpdateGoal($scope.goal);
    }
}]);