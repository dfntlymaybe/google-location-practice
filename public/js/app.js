var app = angular.module("compieTest", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',  function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider
    .state('home', {
      url: '/home',
      controller: 'ctrl',
      templateUrl: '/templates/form.html'
    }).state('result', {
      url: '/result',
      controller: 'ctrl',
      templateUrl: '/templates/result.html'
    })

  $urlRouterProvider.otherwise('home');

}]);

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {country:'il'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});