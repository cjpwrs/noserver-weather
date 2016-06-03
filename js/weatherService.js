/**
 * Created by cjpowers on 6/1/16.
 */
angular.module('app').service('weatherService', function($http, $q){
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
    var byType = 'hourly/q/'
    var apiToken = '5e1f7baef1adc808/'
    /*this.getWeather = function(search){
        //var search = cleanSearch(searchCriteria)
        console.log(search);
        var cleanedUrl = baseUrl + apiToken + byType + search + '.json';
        console.log(cleanedUrl);
        return $http.get(cleanedUrl);
    }
    this.getCurrentCondition = function(search) {
        console.log(search);
        var cleanedUrl = baseUrl + apiToken + 'conditions/q/' + search + '.json';
        console.log(cleanedUrl);
        return $http.get(cleanedUrl);
    }
    this.get10DayForecast = function(search) {
        console.log(search);
        var cleanedUrl = baseUrl + apiToken + 'forecast10day/q/' + search + '.json';
        console.log(cleanedUrl);
        return $http.get(cleanedUrl);
    }
*/
        this.storeData = function(ten, cur, hour){
            this.tenDayWeatherData = ten;
            this.currentWeatherData = cur;
            this.weatherData = hour;
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
                         currentWeatherData: response[1].data,
                         weatherData: response[0].data
                     }
                    console.log(response);
                })
        }


})