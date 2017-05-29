var tenant = angular.module('tenantApp', [ 'ngRoute' ]);

tenant.controller("gradeController", function($scope, $http) {
    console.log("inside tenant controller");
});

tenant.config(function($routeProvider) {
    console.log("inside tenant route provider");

    $routeProvider.when("/tenant1", {
        templateUrl : "/templates/tenant1.html",
        controller : "tenant1_controller"

    }).when("/tenant2", {
        templateUrl : "/templates/tenant2.html",
        controller : "tenant2_controller"

    }).when("/tenant3", {
        templateUrl : "/templates/tenant3.html",
        controller : "tenant3_controller"

    }).when("/tenant4", {
        templateUrl : "/templates/tenant4.html",
        controller : "tenant4_controller"
    });

});

tenant.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

tenant.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, callbackfunc){
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(data){
                console.log("returnign from upload");
                console.log(data);

                callbackfunc(data);
            })

            .error(function(){
            });
    }
}]);

tenant.controller("tenant1_controller",['$scope','$http', 'fileUpload', function($scope,$http, fileUpload){

    console.log("tenant1_controller");
    $scope.graderChecked = true;
    $scope.msg = 'Grades: '
    $scope.uploadFile = function () {

        console.log("uploadFile");
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "http://ProjLoadBalancer-1030040789.us-west-2.elb.amazonaws.com:80/tenant1";
        fileUpload.uploadFileToUrl(file, uploadUrl, function(data){
            console.log("callback from upload");
            console.log(data);
            $scope.umlimg = data.result
            $scope.graderChecked = true;
        });
    };

    $scope.generateUML = function(){

    }

    $scope.submitGrades = function(){
        console.log("submit grade");
        var tenant_data = {
            "tenant_id" : "TA-1",
            "tenant_table" : "tenant_data_comments",
            "tenant_name" :"UmangSaxena",
            "located_at" : "SJSU",
            "studentid" : $scope.studentid,
            "studentname" : $scope.studentname,
            "grade" : $scope.grade,
            "gradecomments" : $scope.gradecomments
        }

        $http({
            method : "POST",
            url : '/callgrader',
            data : tenant_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("Done");

            $scope.studentid = "";
            $scope.studentname = "";
            $scope.grade = "";
            $scope.gradecomments = "";

            $scope.msg = " Grading Done";
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });
    };
}]);

tenant.controller("tenant2_controller",['$scope','$http', 'fileUpload', function($scope,$http, fileUpload){

    console.log("tenant2_controller");
    $scope.graderChecked = true;
    $scope.msg = 'Grades: '
    $scope.uploadFile = function () {

        console.log("uploadFile");
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "http://ProjLoadBalancer-1030040789.us-west-2.elb.amazonaws.com:80/tenant2";
        fileUpload.uploadFileToUrl(file, uploadUrl, function(data){
            console.log("callback from upload");
            console.log(data);
            $scope.umlimg = data.result
            $scope.graderChecked = true;
        });
    };

    $scope.generateUML = function(){

    }

    $scope.submitGrades = function(){
        console.log("submit grade");
        var tenant_data = {
            "tenant_id" : "TA-2",
            "tenant_table" : "tenant_data_comments",
            "tenant_name" :"Divyaa",
            "located_at" : "SJSU",
            "studentid" : $scope.studentid,
            "studentname" : $scope.studentname,
            "grade" : $scope.grade,
            "gradecomments" : $scope.gradecomments
        }

        $http({
            method : "POST",
            url : '/callGrader',
            data : tenant_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("Done");

            $scope.studentid = "";
            $scope.studentname = "";
            $scope.grade = "";
            $scope.gradecomments = ""

            $scope.msg = " Grading Done";
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });
    };
}]);

tenant.controller("tenant3_controller",['$scope','$http', 'fileUpload', function($scope,$http,fileUpload){
    console.log("tenant3_controller");
    $scope.graderChecked = true;
    $scope.msg = 'Grades: '
    $scope.uploadFile = function () {

        console.log("uploadFile");
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "http://ProjLoadBalancer-1030040789.us-west-2.elb.amazonaws.com:80/tenant3";
        fileUpload.uploadFileToUrl(file, uploadUrl, function(data){
            console.log("callback from upload");
            console.log(data);
            $scope.umlimg = data.result
            $scope.graderChecked = true;
        });
    };

    $scope.generateUML = function(){

    }

    $scope.submitGrades = function(){
        console.log("submit grade");
        var tenant_data = {
            "tenant_id" : "TA-3",
            "tenant_table" : "tenant_data_comments",
            "tenant_name" :"LabheshD",
            "located_at" : "SJSU",
            "studentid" : $scope.studentid,
            "studentname" : $scope.studentname,
            "grade" : $scope.grade,
            "gradecomments" : $scope.gradecomments
        }

        $http({
            method : "POST",
            url : '/callgrader',
            data : tenant_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("Done");

            $scope.studentid = "";
            $scope.studentname = "";
            $scope.grade = "";
            $scope.gradecomments = ""



            $scope.msg = " Grading Done";
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });

        $http({
            method : "POST",
            url : '/callTenant3',
            data : tenant_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("Done");
            $scope.msg = " Grading Done";
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });

    };
}]);


tenant.controller("tenant4_controller",['$scope','$http', 'fileUpload', function($scope,$http, fileUpload){
    console.log("tenant4_controller");
    $scope.graderChecked = true;
    $scope.msg = 'Grades: '
    $scope.uploadFile = function () {

        console.log("uploadFile");
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "http://ProjLoadBalancer-1030040789.us-west-2.elb.amazonaws.com:80/tenant4";
        fileUpload.uploadFileToUrl(file, uploadUrl, function(data){
            console.log("callback from upload");
            console.log(data);
            $scope.umlimg = data.result
            $scope.graderChecked = true;
        });
    };

    $scope.generateUML = function(){

    }

    $scope.submitGrades = function(){
        console.log("submit grade");
        var tenant_data = {
            "tenant_id" : "TA-3",
            "tenant_table" : "tenant_data_comments",
            "tenant_name" :"Avdeep",
            "located_at" : "SJSU",
            "studentid" : $scope.studentid,
            "studentname" : $scope.studentname,
            "grade" : $scope.grade,
            "gradecomments" : $scope.gradecomments
        }

        $http({
            method : "POST",
            url : '/callgrader',
            data : tenant_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("Done");

            $scope.studentid = "";
            $scope.studentname = "";
            $scope.grade = "";
            $scope.gradecomments = ""

            window.location.assign("templates/tenant4.html");

            $scope.msg = " Grading Done";
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });

        $http({
            method : "POST",
            url : '/callTenant3',
            data : tenant_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("Done");
            $scope.msg = " Grading Done";
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });

    };
}]);