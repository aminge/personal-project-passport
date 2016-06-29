myApp.controller('GoalsController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.selectThisGoal = function(goalToSelect) {

        console.log('The selectThisGoal function is running');

        var selectedID = goalToSelect.id;

        if (goalToSelect.selected == true) {
            // if the goal you click on is already selected, then change all selected to false so that the
            // goal collapses
            console.log('Set all selected properties to false');
            $scope.goals.forEach(function(goal, index, goals) {
                goal.selected = false;
            });
        } else {

            console.log('Switching which goal is selected');

            $scope.goals.forEach(function(goal, index, goals) {
                goal.selected = false;
            });

            $scope.goals.forEach(function(goal, index, goals) {
                if (goal.id == selectedID) {
                    goal.selected = true;
                }
            });
        }
    };

    $scope.deleteGoal = function(goal) {
        $scope.dataFactory.factoryDeleteGoal(goal).then(function() {
            $scope.dataFactory.factoryGetGoals().then(function() {
                $scope.goals = $scope.dataFactory.factoryGoalsArray();
            });
        });
    };

    $scope.completeGoal = function(goal) {
        $scope.dataFactory.factoryCompleteGoal(goal).then(function() {
            $scope.dataFactory.factoryGetGoals().then(function() {
                $scope.goals = $scope.dataFactory.factoryGoalsArray();
            });
        });
    };

    $scope.setGoalToEdit = function(goal) {
        $scope.dataFactory.factorySetGoalToEdit(goal);
    };

    // flags the specific goal that you want to view tasks for, so that in the 'tasks' view you can
    // add tasks to that goal, and so you only see that goal's tasks, and not other goals' tasks
    $scope.setGoalForTasks = function(goal) {
        $scope.dataFactory.factorySetGoalForTasks(goal);
    };

    $scope.dataFactory.factoryGetGoals().then(function() {
        $scope.goals = $scope.dataFactory.factoryGoalsArray();
    });

    //if ($scope.dataFactory.factoryGoalsArray() === undefined) {
    //    $scope.dataFactory.factoryGetGoals().then(function() {
    //        $scope.goals = $scope.dataFactory.factoryGoalsArray();
    //    });
    //} else {
    //    $scope.goals = $scope.dataFactory.factoryGoalsArray();
    //}
}]);