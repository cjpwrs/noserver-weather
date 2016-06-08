angular.module( "app")
    .directive('autoComplete', function($timeout) {
            /*return function(scope, element, attrs) {
                element.autocomplete({
                    source: scope[attrs.uiItems],
                    select: function() {
                        $timeout(function() {
                            element.trigger('input');
                        }, 0);
                    }
                });
            };*/
        return {

            scope: {
                 showsearch: '='
             },
            //controller: weatherCtrl,

            link: function(scope, element, attrs) {
                //scope.showsearch = false;
                var search =  element;
                console.log(search);

                element.on('focus', function(){
                    //console.log(scope.citiesArr);
                    console.log('focused');
                    scope.showsearch = true;
                    scope.$apply();
                })
                // element.parents().click(function(){
                //
                //     console.log('blurred');
                //     scope.showsearch = false;
                //     scope.$apply();
                // })
                element.on('blur', function(){

                    console.log('blurred');
                    scope.showsearch = false;
                    scope.$apply();
                })
            }
        };
    });