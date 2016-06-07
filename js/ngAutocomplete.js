angular.module( "app")
    .directive('ngAutocomplete', function() {
        return {

            scope: {
                 showsearch: '='
             },
            //controller: weatherCtrl,

            link: function(scope, element, attrs) {
                scope.showsearch = false;
                var search =  element
                console.log(search);

                element.on('focus', function(){
                    console.log(scope.citiesArr);
                    console.log('string');
                    scope.showsearch = true;
                })
                element.on('blur', function(){
                    console.log(scope.citiesArr);
                    console.log('string');
                    scope.showsearch = false;
                })
            }
        };
    });