var app = angular.module('myApp', ['ngDragDrop']);
app.controller('TaskPoolManagerController', function($scope, $window, myService) {

   $scope.data= {
       "tasks":[],
       "user1Tasks":[],
       "user2Tasks":[],
       "user3Tasks":[]
   }

   // during the loading
    $scope.init = function() {
       $scope.data = myService.loadData();
    }

    // saving data on exit site
    $scope.onExit = function() {
        myService.save($scope.data)
    };
    $window.onbeforeunload =  $scope.onExit;


    // adding dragged element to the list
    $scope.onDrop = function($event,$data,array){
        array.push($data);
    };

}).directive('taskItem',function () {
    return{
        template:'<div class="taskItem" ui-draggable="true" drag="task" ' +
        'on-drop-success="dropSuccessHandler($event,$index,directiveTasks)"  ng-repeat="task in directiveTasks track by $index" id="{{task.id}}">{{task.name}}</div>',
        restrict:'E',
        controller: function ($scope) {
            // removing dragged element from list
            $scope.dropSuccessHandler = function ($event,$index,array) {
                array.splice($index,1);
            }
        },
        scope:{
            directiveTasks: '=tasks'
        }

    };
});