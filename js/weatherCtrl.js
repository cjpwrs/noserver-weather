/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').controller('weatherCtrl', function($scope, weatherService, $stateParams, $state){

    $scope.name = 'cj';
    $scope.searchInfo = 'UT/Provo';
    //$stateParams.searchCriteria = $scope.searchInfo;
    
    $scope.weatherData = weatherService.weatherData;
    $scope.currentWeatherData = weatherService.currentWeatherData;
    $scope.tenDayWeatherData = weatherService.tenDayWeatherData;
    $scope.showSearch = false;
    //$scope.searchString = 'fortaleza';












    $scope.getLocation = function() {
        $scope.$emit('LOAD')
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                console.log(position.coords.latitude + ',' + position.coords.longitude)
                $scope.curW(position.coords.latitude + ',' + position.coords.longitude);
                $scope.$emit('UNLOAD')
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    $scope.useLocation = function(string){
            $scope.searchCriteria = string;
            console.log(string);

    }


    var sendData = function(ten, cur, hour){
        weatherService.storeData(ten, cur, hour);
    }

    $scope.getCorrect = function(search){
        weatherService.getCorrect(search)
            .then(function(response){

                $scope.citiesArr = response;
                console.log($scope.citiesArr);
            })
    }
    $scope.getCorrect($scope.searchString);
    $scope.curW = function(search){
        weatherService.getW(search).then(function(response){
            console.log("This is the response:" + response);
            $scope.tenDayWeatherData = response.tenDayWeatherData;
            $scope.currentWeatherData = response.currentWeatherData;
            $scope.weatherData = response.weatherData;
            sendData($scope.tenDayWeatherData, $scope.currentWeatherData, $scope.weatherData);
            console.log($scope.tenDayWeatherData);
            $state.go('hourly');
        })
    }
    $scope.getW = function(search){
        weatherService.getW(search).then(function(response){
            console.log("This is the response:" + response);
            $scope.tenDayWeatherData = response.tenDayWeatherData;
            $scope.currentWeatherData = response.currentWeatherData;
            $scope.weatherData = response.weatherData;
            sendData($scope.tenDayWeatherData, $scope.currentWeatherData, $scope.weatherData);
            console.log($scope.tenDayWeatherData);
            $scope.searchCriteria = '';
            console.log("finished getting weather data");
            $scope.citiesArr = [];
            $state.go('hourly');
        })
    }

    $scope.enterPressed = function(keyEvent) {
        if (keyEvent.which === 13) {
            $scope.getW($scope.searchCriteria);
        }
    }

})