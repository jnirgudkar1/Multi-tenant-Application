var app = angular.module("tenantApp", ["ngRoute"]);

var selectedTenant = "tenant1";
app.directive('fileModel', ['$parse', function ($parse) {
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

app.service('fileUpload', ['$https', function ($https) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        $https.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

            .success(function(){
            })

            .error(function(){
            });
    }
}]);

app.controller('graderController',function ($scope) {

    console.log("grader controller");
    console.log(selectedTenant);
    $scope.graderChecked = true; // true wen file upload is succful and image is visible
    $scope.uploadChecked = true; // true wen tenant is selected
    $scope.msg=''

    $scope.istenant13 = false;
    $scope.istenant24 = false;
    console.log($scope.tenant.name);
    $scope.tenants =[{
        'title' : 'tenant1',
        'id' :1,
        'name' : 'Umang'
    },
        {
            'title' : 'tenant2',
            'id' :2,
            'name' : 'Kaushik'
        },
        {
            'title' : 'tenant3',
            'id' :3,
            'name' : 'Chetan'
        },
        {
            'title' : 'tenant4',
            'id' :4,
            'name' : 'Fang'
        }]



    $scope.uploadFile = function () {

        console.log("uploadFile");
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "/uploads";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };


    $scope.submitGrades = function(){


        $http({
            method : "POST",
            url : '/callgrader',

        }).success(function(data) {
            if (data.statusCode == 401) {

                $scope.UserFName = data.Result[0].FName;
                $scope.UserLName = data.Result[0].LName;
                $scope.UserEmail = data.Result[0].EMail;

            }
            else
            {
                alert("Invalid login. Please try again or register.");
                $scope.valid_login = false;
                $scope.invalid_login = true;
            }

        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });
    }

});


