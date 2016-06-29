myApp.controller('NewGoalController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    $scope.dataFactory = DataFactory;

    $scope.submitGoal = function() {
        var newGoal = {
            name: $scope.name,
            deadline: $scope.deadline,
            description: $scope.description
        };

        console.log(newGoal.deadline); // I think it has the unnecessary information here

        $scope.dataFactory.factorySubmitGoal(newGoal);

        $scope.name = '';
        $scope.deadline = '';
        $scope.description = '';
    };
}]);