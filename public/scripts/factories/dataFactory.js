myApp.factory('DataFactory', ['$http', function($http) {

    // PRIVATE

    var goals = undefined;
    var completeGoals = undefined;
    var goalToEdit = undefined;
    var goalForTasks = undefined;
    var tasks = undefined;

    var privateSubmitGoal = function(goal) {
        var promise = $http.post('/data/goal', goal).then(function(response) {
            console.log('The response is: ', response);
            privateGetGoals();
        });
        return promise;
    };

    var privateSubmitTask = function(task, goalID) {
        var promise = $http.post('/data/task/' + goalID, task).then(function(response) {
            console.log('The response for the task you submitted is: ', response);
            //privateGetTasks(); //not yet created
        });
        return promise;
    };

    var privateGetGoals = function() {
        var promise = $http.get('/data').then(function(response) {
            goals = response.data;

            // get all of the tasks, so that we can calculate the hours per week for all of the goals
            $http.get('/data/alltasks/').then(function(response) {
                tasks = response.data;
                console.log('Here are ALL THE TASKS: ', tasks);
            }).then(function() {
                // adding a Boolean value called 'selected' to each goal. Default is false
                goals.forEach(function(goal, index, goals) {
                    goal.selected = false;
                    goal.hoursPerWeek = 0;

                    tasks.forEach(function(task, index, tasks) {
                        if (task.goal_id == goal.id) {
                            goal.hoursPerWeek += parseFloat(hourDifference(task.start_time, task.end_time));
                        }
                    });
                });
            });
            console.log('the current goals are: ', goals);
        });
        return promise;
    };

    var privateGetCompleteGoals = function() {
        var promise = $http.get('/data/complete').then(function(response) {
            completeGoals = response.data;

            completeGoals.forEach(function(goal, index, completeGoals) {
                goal.selected = false;
            });

            console.log('the completed goals are: ', completeGoals);
        });
        return promise;
    };

    var privateGetTasks = function(goal) {
        var promise = $http.get('/data/tasks/' + goal.id).then(function(response) {
            tasks = response.data;
            console.log('the tasks for this goal are are: ', tasks);
        });
        return promise;
    };

    var privateDeleteGoal = function(goal) {
        var promise = $http.delete('/data/' + goal.id).then(function(response) {
            // I'm not exactly sure what else should go here
            console.log(response);
        });
        return promise;
    };

    var privateCompleteGoal = function(goal) {
        var promise = $http.put('/data/complete/' + goal.id, goal).then(function(response) {
            console.log(response);
        });
        return promise;
    };

    var privateSetGoalToEdit = function(goal) {
        goalToEdit = goal;
        goalToEdit.deadline = new Date(goal.deadline);
    };

    var privateUpdateGoal = function(goal) {
        $http.put('/data/edit/', goal);
    };

    var privateSetGoalForTasks = function(goal) {
        goalForTasks = goal;
    };

    var hourDifference = function(time1, time2) {
        var hourDiff = parseFloat(time2.slice(0, 2)) - parseFloat(time1.slice(0, 2));
        var minDiff = parseFloat(time2.slice(3, 5)) - parseFloat(time1.slice(3, 5));
        var diff = hourDiff + (minDiff / 60);

        // note: toFixed returns a string
        return diff.toFixed(1);
    };

    // PUBLIC

    var publicAPI = {
        factorySubmitGoal: function(goal) {
            return privateSubmitGoal(goal);
        },
        factorySubmitTask: function(task, goalID) {
            return privateSubmitTask(task, goalID);
        },
        factoryGetGoals: function() {
            return privateGetGoals();
        },
        factoryGetCompleteGoals: function() {
            return privateGetCompleteGoals();
        },
        // I could just use goalForTasks here, instead of taking in a parameter
        factoryGetTasks: function(goal) {
            return privateGetTasks(goal);
        },
        factoryGoalsArray: function() {
            return goals;
        },
        factoryCompleteGoalsArray: function() {
            return completeGoals;
        },
        factoryDeleteGoal: function(goal) {
            return privateDeleteGoal(goal);
        },
        factoryCompleteGoal: function(goal) {
            return privateCompleteGoal(goal);
        },
        factorySetGoalToEdit: function(goal) {
            return privateSetGoalToEdit(goal);
        },
        factoryGetGoalToEdit: function() {
            return goalToEdit;
        },
        factoryUpdateGoal: function(goal) {
            return privateUpdateGoal(goal);
        },
        factorySetGoalForTasks: function(goal) {
            return privateSetGoalForTasks(goal);
        },
        factoryGetGoalForTasks: function() {
            return goalForTasks;
        },
        factoryTasksArray: function() {
            return tasks;
        }
    };
    return publicAPI;
}]);