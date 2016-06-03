/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').controller('weatherCtrl', function($scope, weatherService, $stateParams){

    $scope.name = 'cj';
    $scope.searchInfo = 'UT/Provo';
    //$stateParams.searchCriteria = $scope.searchInfo;
    
    $scope.weatherData = weatherService.weatherData;
    $scope.currentWeatherData = weatherService.currentWeatherData;
    $scope.tenDayWeatherData = weatherService.tenDayWeatherData;
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
    var sendData = function(ten, cur, hour){
        weatherService.storeData(ten, cur, hour);
    }

    $scope.getW = function(search){
        weatherService.getW(search).then(function(response){
            console.log("This is the response:" + response);
            $scope.tenDayWeatherData = response.tenDayWeatherData;
            $scope.currentWeatherData = response.currentWeatherData;
            $scope.weatherData = response.weatherData;
            sendData($scope.tenDayWeatherData, $scope.currentWeatherData, $scope.weatherData);
            console.log($scope.tenDayWeatherData);
        })
    }

    $scope.enterPressed = function(keyEvent) {
        if (keyEvent.which === 13)
            $scope.getW($scope.searchCriteria);
    }
    //$scope.getW(98374);
    //$scope.getWeather();
    //$scope.getCurrentCondition();
    //$scope.get10DayForecast();
})