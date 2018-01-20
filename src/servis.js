
var app= angular.module('myApp');
app.service('myService', function () {

    var taskData={
        "tasks":[],
        "user1Tasks":[],
        "user2Tasks":[],
        "user3Tasks":[]
    }


    /*
        function gets data form Local Storage, in reality it should get data from server using Ajax
     */
    this.loadData = function(){

        if(angular.fromJson(sessionStorage.taskData) != undefined) {
           taskData = angular.fromJson(sessionStorage.taskData)
        }else{
            for(var i=0;i<15;i++){
                taskData.tasks.push({"id":i,"name":"Task "+i});
            }
        }
        return taskData;
    }

    /*
        function saves data to Local Storage, in reality it should use Ajax
     */
    this.save = function(data){
        sessionStorage.taskData = angular.toJson(data);
    }
});