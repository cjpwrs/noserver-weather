/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').service('weatherService', function($http, $q){

    var baseUrl = 'http://api.wunderground.com/api/';
    var byType = 'hourly/q/';
    var apiToken = '5e1f7baef1adc808/';
    var googlePlacesKey = 'AIzaSyABDsraog-T4aY96Ql0YhRm0P-_deMfuFU';

    this.storeData = function(ten, cur, hour){
        this.tenDayWeatherData = ten;
        this.currentWeatherData = cur;
        this.weatherData = hour;
    }
    this.getCorrect = function(search){
        var cleanedData = $q.defer();
        $http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + search + '&key=' + googlePlacesKey)
            .then(function(response){
                var cleanData = [];
                for(var i = 0; i < response.data.predictions.length; i++){
                    for(var i2 = 0; i2 < response.data.predictions[i].types.length; i2++){
                        if(response.data.predictions[i].types[i2] === 'locality'){
                            var newArr = response.data.predictions[i].description.split(',');
                            response.data.predictions[i].description = newArr[0] + ', ' + newArr[1];
                            console.log(newArr);
                            cleanData.push(response.data.predictions[i]);
                        }
                    }
                }
                cleanedData.resolve(cleanData)
            })
        return cleanedData.promise;
    }

    this.getW = function(search){
        var cleanedUrlHourly = baseUrl + apiToken + 'hourly/q/' + search + '.json';
        var hourlyPromise = $http.get(cleanedUrlHourly);
        var cleanedUrlCurrent = baseUrl + apiToken + 'conditions/q/' + search + '.json';
        var currentPromise = $http.get(cleanedUrlCurrent);
        var cleanedUrlForecast = baseUrl + apiToken + 'forecast10day/q/' + search + '.json';
        var forecastPromise = $http.get(cleanedUrlForecast);

        return $q.all([hourlyPromise, currentPromise, forecastPromise])
            .then(function(response){

                 return {
                     tenDayWeatherData: response[2].data.forecast.simpleforecast.forecastday,
                     currentWeatherData: response[1].data.current_observation,
                     weatherData: response[0].data
                 }
                console.log(response);
            })
    }

    this.getLocation = function() {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition();
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
   /* this.showPosition = function(position){
        var combined = position.coords.latitude+','+position.coords.longitude;
        this.getW(combined);
        console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
    }*/


})