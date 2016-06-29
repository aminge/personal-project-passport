myApp.controller('CompleteGoalsController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    //$scope.completeGoals = $scope.dataFactory.factoryGetCompleteGoals();

    $scope.dataFactory.factoryGetCompleteGoals().then(function() {
        $scope.completeGoals = $scope.dataFactory.factoryCompleteGoalsArray();
    });

    //$scope.selectThisGoal = function(selectedID) {
    //
    //    $scope.completeGoals.forEach(function(goal, index, completeGoals) {
    //        goal.selected = false;
    //    });
    //
    //    $scope.completeGoals.forEach(function(goal, index, completeGoals) {
    //        if (goal.id == selectedID) {
    //            goal.selected = true;
    //        }
    //    });
    //};

    $scope.selectThisGoal = function(goalToSelect) {

        var selectedID = goalToSelect.id;

        if (goalToSelect.selected == true) {
            // if the goal you click on is already selected, then change all selected to false so that the
            // goal collapses
            $scope.completeGoals.forEach(function(goal, index, goals) {
                goal.selected = false;
            });
        } else {
            $scope.completeGoals.forEach(function(goal, index, goals) {
                goal.selected = false;
            });

            $scope.completeGoals.forEach(function(goal, index, goals) {
                if (goal.id == selectedID) {
                    goal.selected = true;
                }
            });
        }
    };

    //if ($scope.dataFactory.factoryCompleteGoalsArray() === undefined) {
    //    $scope.dataFactory.factoryGetCompleteGoals().then(function() {
    //        $scope.completeGoals = $scope.dataFactory.factoryCompleteGoalsArray();
    //    });
    //} else {
    //    $scope.completeGoals = $scope.dataFactory.factoryCompleteGoalsArray();
    //}
}]);