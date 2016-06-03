'use strict';

/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/');
    $stateProvider.state('hourly', {
        templateUrl: './views/hourly-tmpl.html',
        url: '/hourly/',
        controller: 'weatherCtrl'
    }).state('current', {
        templateUrl: './views/current-tmpl.html',
        url: '/current/',
        controller: 'weatherCtrl'
    }).state('forecast', {
        templateUrl: './views/tenDay-tmpl.html',
        url: '/forecast/',
        controller: 'weatherCtrl'
    });
});
'use strict';

/**
 * Created by cjpowers on 6/2/16.
 */
angular.module('app').directive('backgroundDirective', function () {
    return {
        restrict: 'AE',
        //template: '<div> The current time is {{time}} </div>',
        scope: {
            condition: '=',
            time: '='
        },
        link: function link(scope, elements, attr) {
            console.log(attr);
            console.log(scope.condition);
            if (scope.condition.toLowerCase() === 'mostly cloudy') conditionGif = 'url(https://media.giphy.com/media/qq5gwamAHVofm/giphy.gif) no-repeat';else if (scope.condition.toLowerCase() === 'partly cloudy') conditionGif = 'url(https://media.giphy.com/media/G1T5M0qT6ZJlu/giphy.gif)';else if (scope.condition.toLowerCase() === 'overcast') conditionGif = 'url(https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif)';else if (scope.condition.toLowerCase() === 'clear' && scope.time >= 5 && scope.time <= 20) conditionGif = 'url(http://24.media.tumblr.com/tumblr_m6ltvk2pHg1r9bkeao1_500.gif)';else if (scope.condition.toLowerCase() === 'clear' && (scope.time < 5 || scope.time > 20)) conditionGif = 'url(https://49.media.tumblr.com/000eae79a3f756e19ed978eda33958a7/tumblr_nzkty841Yq1u7gnm9o1_500.gif)';else conditionGif = 'black';
            elements.parent().css({ background: conditionGif, 'background-size': 'cover' });
        }
    };
});
'use strict';

/**
 * Created by cjpowers on 6/3/16.
 */
angular.module('app').directive('searchDirective', function () {
    return {
        restrict: 'AE',
        templateUrl: './views/searchBar.html',
        //template: '<input ng-model="searchCriteria" type="text" placeholder="search by city or zip">' +
        //'<a ui-sref="current({searchCriteria:searchCriteria})">Search</a>',
        //scope: {
        //},
        controller: 'weatherCtrl'
    };
});
'use strict';

/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').controller('weatherCtrl', function ($scope, weatherService, $stateParams) {

    $scope.name = 'cj';
    $scope.searchInfo = 'UT/Provo';
    //$stateParams.searchCriteria = $scope.searchInfo;

    $scope.weatherData = [];
    $scope.currentWeatherData = [];
    $scope.tenDayWeatherData = [];
    $scope.searchCriteria = 84058;
    /*
        $scope.getWeather = function(){
            weatherService.getWeather($stateParams.searchCriteria)
                .then(function(response){
                    console.log("finished promise");
                    $scope.weatherData = response.data;
                    console.log($scope.weatherData);
                })
            console.log($scope.weatherData);
        }
    
        $scope.getCurrentCondition = function(){
            weatherService.getCurrentCondition($stateParams.searchCriteria)
                .then(function(response){
                    console.log("finished current weather promise");
                    $scope.currentWeatherData = response.data;
                    console.log($scope.currentWeatherData);
                })
            //console.log($scope.weatherData);
        }
    
        $scope.get10DayForecast = function() {
            weatherService.get10DayForecast($stateParams.searchCriteria)
                .then(function(response){
                    console.log("finished 10 day forecast weather promise");
                    $scope.tenDayWeatherData = response.data.forecast.simpleforecast.forecastday;
                    console.log($scope.tenDayWeatherData);
                })
        }
    */
    $scope.getW = function (search) {
        weatherService.getW(search).then(function (response) {
            $scope.tenDayWeatherData = response[2].data.forecast.simpleforecast.forecastday;
            $scope.currentWeatherData = response[1].data;
            $scope.weatherData = response[0].data;
            console.log(response);
        });
    };

    $scope.enterPressed = function (keyEvent) {
        if (keyEvent.which === 13) $scope.getW($scope.searchCriteria);
    };
    //$scope.getW(98374);
    //$scope.getWeather();
    //$scope.getCurrentCondition();
    //$scope.get10DayForecast();
});
'use strict';

/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').service('weatherService', function ($http, $q) {
    /*var cleanSearch = function(string){
        if(string[0] === '1' || string[0] === '2' || string[0] === '3' || string[0] === '4' || string[0] === '5' || string[0] === '6' ||
            string[0] === '7' || string[0] === '8' || string[0] === '9'){
            var zip = parseInt(string);
        }
        else{
             var stringArr = string.split('');
            console.log(stringArr);
            for(var i = 0; i < stringArr.length; i++){
                if( stringArr[i] === ','){
                    stringArr[i] = '/';
                }
                else if(stringArr[i] === ' '){
                    stringArr.splice(i,1);
                }
            }
            var newStr = stringArr.join('');
            console.log(stringArr);
            console.log(newStr);
            var newArr = newStr.split('/');
            console.log(newArr);
            for(var i2 = 0; i2 < newArr.length; i2++){
                console.log(typeof newArr[i2]);
                if(newArr[i2].length === 2){
                    var st = newArr[i2]
                }
                else if(typeof newArr[i2] === 'number'){
                    var zip = newArr[i2];
                }
                else{
                    var city = newArr[i2];
                }
            }
            console.log('city'+city + st);
         }
        console.log('zip'+zip)
    }*/

    var baseUrl = 'http://api.wunderground.com/api/';
    var byType = 'hourly/q/';
    var apiToken = '5e1f7baef1adc808/';
    this.getWeather = function (search) {
        //var search = cleanSearch(searchCriteria)
        console.log(search);
        var cleanedUrl = baseUrl + apiToken + byType + search + '.json';
        console.log(cleanedUrl);
        return $http.get(cleanedUrl);
    };
    this.getCurrentCondition = function (search) {
        console.log(search);
        var cleanedUrl = baseUrl + apiToken + 'conditions/q/' + search + '.json';
        console.log(cleanedUrl);
        return $http.get(cleanedUrl);
    };
    this.get10DayForecast = function (search) {
        console.log(search);
        var cleanedUrl = baseUrl + apiToken + 'forecast10day/q/' + search + '.json';
        console.log(cleanedUrl);
        return $http.get(cleanedUrl);
    };

    this.getW = function (search) {
        var cleanedUrlHourly = baseUrl + apiToken + 'hourly/q/' + search + '.json';
        var hourlyPromise = $http.get(cleanedUrlHourly);
        var cleanedUrlCurrent = baseUrl + apiToken + 'conditions/q/' + search + '.json';
        var currentPromise = $http.get(cleanedUrlCurrent);
        var cleanedUrlForecast = baseUrl + apiToken + 'forecast10day/q/' + search + '.json';
        var forecastPromise = $http.get(cleanedUrlForecast);

        return $q.all([hourlyPromise, currentPromise, forecastPromise]);
    };
});