myApp.controller('TasksController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    $scope.dataFactory = DataFactory;

    $scope.goal = $scope.dataFactory.factoryGetGoalForTasks();

    // I need to define $scope.tasks and do a GET request to get the tasks for the specified goal

    $scope.submitTask = function() {

        var newTask = {
            name: $scope.name,
            date: $scope.date,
            start_time: stripTime($scope.start_time),
            end_time: stripTime($scope.end_time)
        };

        $scope.dataFactory.factorySubmitTask(newTask, $scope.goal.id).then(function() {
            // refresh the tasks list so that it updates automatically when a new task is submitted
            $scope.dataFactory.factoryGetTasks($scope.goal).then(function() {
                $scope.tasks = $scope.dataFactory.factoryTasksArray();
            });
        });

        $scope.name = '';
        $scope.date = '';
        $scope.start_time = '';
        $scope.end_time = '';
    };

    var stripTime = function(time) {

        var stringTime = time.toString();
        var outputTime = stringTime.slice(16, 24);
        return outputTime;
    };

    $scope.getTasks = function(goal) {
        $scope.dataFactory.factoryGetTasks(goal);
    };
    // I need to define the factory function, and I need to call it when the page loads. I also need to make sure
    // that the goal list updates automatically when a new goal is submitted

    $scope.dataFactory.factoryGetTasks($scope.goal).then(function() {
        $scope.tasks = $scope.dataFactory.factoryTasksArray();
    });

    $scope.makeTimeLookNice = function(time) {
        // takes a string of format hh:mm:ss and converts it to something like 6:31pm
        // this function doesn't work right. It gives something like [object Window]:[object Window]am

        console.log(time);
        var hrs = parseInt(time.slice(0, 2));
        var min = parseInt(time.slice(3, 5));

        var output = '';

        if (hrs == 0) {
            hrs = 12;
            output = 'am';
        } else if (hrs > 12) {
            output = 'pm';
            hrs -= 12;
        } else {
            output = 'am';
        }

        console.log(hrs);
        console.log(min);

        return toString(hrs) + ':' + toString(min) + output;
    };

    console.log('The goal you are viewing is: ', $scope.goal);
}]);