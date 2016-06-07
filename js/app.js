/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app', ['ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                templateUrl: './views/home.html',
                url: '/',
                controller: 'weatherCtrl'
            })
            .state('hourly', {
                templateUrl: './views/hourly-tmpl.html',
                url: '/hourly/'
                //controller: 'weatherCtrl'
            })
            .state('current', {
                templateUrl: './views/current-tmpl.html',
                url: '/current/'
                //controller: 'weatherCtrl'
            })
            .state('forecast', {
                templateUrl: './views/tenDay-tmpl.html',
                url: '/forecast/'
                //controller: 'weatherCtrl'
            })


    })