/**
 * Created by cjpowers on 6/2/16.
 */
angular.module('app').directive('backgroundDirective', function(){
    return{
        restrict: 'AE',
        scope: {
            condition: '@',
            time: '='
        },
        link: function(scope, elements, attr){
            console.log(attr);
            console.log(scope.condition);
            if(scope.condition.toLowerCase() === 'mostly cloudy')
                //conditionGif = 'url(https://media.giphy.com/media/qq5gwamAHVofm/giphy.gif) no-repeat';
                conditionGif = 'url(http://preloaders.net/preloaders/307/Cloudy.gif) no-repeat';
            else if(scope.condition.toLowerCase() === 'partly cloudy')
                //conditionGif = 'url(https://media.giphy.com/media/G1T5M0qT6ZJlu/giphy.gif)';
                conditionGif = 'url(http://preloaders.net/preloaders/315/Partly%20cloudy.gif)';
            else if(scope.condition.toLowerCase() === 'overcast')
                //conditionGif = 'url(https://media.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif)';
                conditionGif = 'url(http://preloaders.net/preloaders/307/Cloudy.gif)';
            else if(scope.condition.toLowerCase() === 'clear' && (scope.time >= 5 && scope.time <= 20))
                //conditionGif = 'url(http://preloaders.net/preloaders/314/Sunny.gif)';
                conditionGif = 'url(http://preloaders.net/preloaders/314/Sunny.gif)';
            else if(scope.condition.toLowerCase() === 'clear' && (scope.time < 5 || scope.time > 20))
                conditionGif = 'url(https://49.media.tumblr.com/000eae79a3f756e19ed978eda33958a7/tumblr_nzkty841Yq1u7gnm9o1_500.gif)';
            else if(scope.condition.toLowerCase() === 'chance of rain')
                conditionGif = 'url(http://preloaders.net/preloaders/316/Partly%20cloudy%20with%20rain.gif)';
            else if(scope.condition.toLowerCase() === 'chance of a thunderstorm')
                conditionGif = 'url(http://preloaders.net/preloaders/309/Lightning.gif)';
            else if(scope.condition.toLowerCase() === 'rain')
                conditionGif = 'url(http://preloaders.net/preloaders/311/Raining.gif)';
            else
                conditionGif = 'black';
            elements.parent().css({background: conditionGif, 'background-size':'cover'});
        }
    }
})