'use strict';

/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app', ['ui.router', 'ngAnimate']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        templateUrl: './views/home.html',
        url: '/',
        controller: 'weatherCtrl'
    }).state('hourly', {
        templateUrl: './views/hourly-tmpl.html',
        url: '/hourly/'
        //controller: 'weatherCtrl'
    }).state('current', {
        templateUrl: './views/current-tmpl.html',
        url: '/current/'
        //controller: 'weatherCtrl'
    }).state('forecast', {
        templateUrl: './views/tenDay-tmpl.html',
        url: '/forecast/'
        //controller: 'weatherCtrl'
    });
});
'use strict';

/**
 * Created by cjpowers on 6/2/16.
 */
angular.module('app').directive('backgroundDirective', function () {
    return {
        restrict: 'AE',
        scope: {
            condition: '@',
            time: '='
        },
        link: function link(scope, elements, attr) {
            console.log(attr);
            console.log(scope.condition);
            if (scope.condition.toLowerCase() === 'mostly cloudy')
                //conditionGif = 'url(https://media.giphy.com/media/qq5gwamAHVofm/giphy.gif) no-repeat';
                conditionGif = 'url(http://preloaders.net/preloaders/307/Cloudy.gif) no-repeat';else if (scope.condition.toLowerCase() === 'partly cloudy')
                //conditionGif = 'url(https://media.giphy.com/media/G1T5M0qT6ZJlu/giphy.gif)';
                conditionGif = 'url(http://preloaders.net/preloaders/315/Partly%20cloudy.gif)';else if (scope.condition.toLowerCase() === 'overcast')
                //conditionGif = 'url(https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif)';
                conditionGif = 'url(http://preloaders.net/preloaders/307/Cloudy.gif)';else if (scope.condition.toLowerCase() === 'clear' && scope.time >= 5 && scope.time <= 20)
                //conditionGif = 'url(http://preloaders.net/preloaders/314/Sunny.gif)';
                conditionGif = 'url(http://preloaders.net/preloaders/314/Sunny.gif)';else if (scope.condition.toLowerCase() === 'clear' && (scope.time < 5 || scope.time > 20)) conditionGif = 'url(https://49.media.tumblr.com/000eae79a3f756e19ed978eda33958a7/tumblr_nzkty841Yq1u7gnm9o1_500.gif)';else if (scope.condition.toLowerCase() === 'chance of rain') conditionGif = 'url(http://preloaders.net/preloaders/316/Partly%20cloudy%20with%20rain.gif)';else if (scope.condition.toLowerCase() === 'chance of a thunderstorm') conditionGif = 'url(http://preloaders.net/preloaders/309/Lightning.gif)';else if (scope.condition.toLowerCase() === 'rain') conditionGif = 'url(http://preloaders.net/preloaders/311/Raining.gif)';else conditionGif = 'black';
            elements.parent().css({ background: conditionGif, 'background-size': 'cover' });
        }
    };
});
'use strict';

/**
 * Created by cjpowers on 6/6/16.
 */
angular.module('app').directive('loading', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="loading fade" ng-show="loading"><h2 class="fade">Hold your horses...</h2><img src="./img/loading.gif"/></div>',
        /*link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });*/
        controller: function controller($scope) {
            $scope.$on('LOAD', function () {
                $scope.loading = true;
            });
            $scope.$on('UNLOAD', function () {
                $scope.loading = false;
            });
        }
    };
});
'use strict';

angular.module("app").directive('ngAutocomplete', function () {
    return {

        scope: {
            showsearch: '='
        },
        //controller: weatherCtrl,

        link: function link(scope, element, attrs) {
            scope.showsearch = false;
            var search = element;
            console.log(search);

            element.on('focus', function () {
                console.log(scope.citiesArr);
                console.log('string');
                scope.showsearch = true;
            });
            element.on('blur', function () {
                console.log(scope.citiesArr);
                console.log('string');
                scope.showsearch = false;
            });
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
        // scope: {
        //     options: '='
        // },
        controller: 'weatherCtrl'

    };
});
'use strict';

/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').controller('weatherCtrl', function ($scope, weatherService, $stateParams, $state) {

    $scope.name = 'cj';
    $scope.searchInfo = 'UT/Provo';
    //$stateParams.searchCriteria = $scope.searchInfo;

    $scope.weatherData = weatherService.weatherData;
    $scope.currentWeatherData = weatherService.currentWeatherData;
    $scope.tenDayWeatherData = weatherService.tenDayWeatherData;
    $scope.showSearch = false;
    //$scope.searchString = 'fortaleza';

    $scope.getLocation = function () {
        $scope.$emit('LOAD');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude + ',' + position.coords.longitude);
                $scope.curW(position.coords.latitude + ',' + position.coords.longitude);
                $scope.$emit('UNLOAD');
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    $scope.useLocation = function (string) {
        $scope.searchCriteria = string;
        console.log(string);
    };

    var sendData = function sendData(ten, cur, hour) {
        weatherService.storeData(ten, cur, hour);
    };

    $scope.getCorrect = function (search) {
        weatherService.getCorrect(search).then(function (response) {

            $scope.citiesArr = response;
            console.log($scope.citiesArr);
        });
    };
    $scope.getCorrect($scope.searchString);
    $scope.curW = function (search) {
        weatherService.getW(search).then(function (response) {
            console.log("This is the response:" + response);
            $scope.tenDayWeatherData = response.tenDayWeatherData;
            $scope.currentWeatherData = response.currentWeatherData;
            $scope.weatherData = response.weatherData;
            sendData($scope.tenDayWeatherData, $scope.currentWeatherData, $scope.weatherData);
            console.log($scope.tenDayWeatherData);
            $state.go('hourly');
        });
    };
    $scope.getW = function (search) {
        weatherService.getW(search).then(function (response) {
            console.log("This is the response:" + response);
            $scope.tenDayWeatherData = response.tenDayWeatherData;
            $scope.currentWeatherData = response.currentWeatherData;
            $scope.weatherData = response.weatherData;
            sendData($scope.tenDayWeatherData, $scope.currentWeatherData, $scope.weatherData);
            console.log($scope.tenDayWeatherData);
            $scope.searchCriteria = '';
            $scope.searchString = '';
            $scope.citiesArr = [];
            $state.go('hourly');
        });
    };

    $scope.enterPressed = function (keyEvent) {
        if (keyEvent.which === 13) {
            $scope.getW($scope.searchCriteria);
        }
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

    var baseUrl = 'http://api.wunderground.com/api/';
    var byType = 'hourly/q/';
    var apiToken = '5e1f7baef1adc808/';
    var googlePlacesKey = 'AIzaSyABDsraog-T4aY96Ql0YhRm0P-_deMfuFU';

    this.storeData = function (ten, cur, hour) {
        this.tenDayWeatherData = ten;
        this.currentWeatherData = cur;
        this.weatherData = hour;
    };
    this.getCorrect = function (search) {
        var cleanedData = $q.defer();
        $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + search + '&key=' + googlePlacesKey).then(function (response) {
            var cleanData = [];
            for (var i = 0; i < response.data.predictions.length; i++) {
                for (var i2 = 0; i2 < response.data.predictions[i].types.length; i2++) {
                    if (response.data.predictions[i].types[i2] === 'locality') {
                        var newArr = response.data.predictions[i].description.split(',');
                        response.data.predictions[i].description = newArr[0] + ', ' + newArr[1];
                        console.log(newArr);
                        cleanData.push(response.data.predictions[i]);
                    }
                }
            }
            cleanedData.resolve(cleanData);
        });
        return cleanedData.promise;
    };

    this.getW = function (search) {
        var cleanedUrlHourly = baseUrl + apiToken + 'hourly/q/' + search + '.json';
        var hourlyPromise = $http.get(cleanedUrlHourly);
        var cleanedUrlCurrent = baseUrl + apiToken + 'conditions/q/' + search + '.json';
        var currentPromise = $http.get(cleanedUrlCurrent);
        var cleanedUrlForecast = baseUrl + apiToken + 'forecast10day/q/' + search + '.json';
        var forecastPromise = $http.get(cleanedUrlForecast);

        return $q.all([hourlyPromise, currentPromise, forecastPromise]).then(function (response) {

            return {
                tenDayWeatherData: response[2].data.forecast.simpleforecast.forecastday,
                currentWeatherData: response[1].data.current_observation,
                weatherData: response[0].data
            };
            console.log(response);
        });
    };

    this.getLocation = function () {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition();
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };
    /* this.showPosition = function(position){
         var combined = position.coords.latitude+','+position.coords.longitude;
         this.getW(combined);
         console.log("Latitude: " + position.coords.latitude +
             "Longitude: " + position.coords.longitude);
     }*/
});