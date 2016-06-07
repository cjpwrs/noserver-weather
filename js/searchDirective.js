/**
 * Created by cjpowers on 6/3/16.
 */
angular.module('app').directive('searchDirective', function(){
    return{
        restrict: 'AE',
        templateUrl: './views/searchBar.html',
        //template: '<input ng-model="searchCriteria" type="text" placeholder="search by city or zip">' +
        //'<a ui-sref="current({searchCriteria:searchCriteria})">Search</a>',
        // scope: {
        //     options: '='
        // },
        controller: 'weatherCtrl'
        
    }
})