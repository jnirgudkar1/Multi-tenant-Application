
var app = angular.module("umlParserGraderApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/umlparsergrader", {
            templateUrl : "templates/login.html"
        })
        .when("/grader", {
            templateUrl : "templates/grader.html",
            controller : "graderController"
        })

    .otherwise({ redirectTo: 'templates/login' });
});


app.controller('loginController', function($scope, $route , $location, $window){

    console.log('loginController');
    $scope.master = {}


    $scope.reset = function() {
        $scope.username = '';
        $scope.passwd = '';
    };

    $scope.login = function () {

        console.log('loginController');
        var uname = $scope.username;
        var pwd = $scope.passwd;

        if( uname == 'paul' && pwd == 'uml'){
            console.log("login successfull")
            $scope.msg = 'Login successfull';
            setTimeout($route.reload(), 20000);
            //$location.path('/grader');
            $window.location.href = 'templates/main.html';
        }else{
            $scope.msg = 'Login unsuccessfull';
            $scope.reset();
        }
    }

});

