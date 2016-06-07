/**
 * Created by cjpowers on 6/6/16.
 */
angular.module('app').directive('loading', function () {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="loading fade" ng-show="loading"><h2 class="fade">Hold your horses...</h2><img src="./img/loading.gif"/></div>',
            /*link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });*/
            controller: function($scope){
                $scope.$on('LOAD',function(){$scope.loading=true});
                $scope.$on('UNLOAD',function(){$scope.loading=false});
            }
        }
    })