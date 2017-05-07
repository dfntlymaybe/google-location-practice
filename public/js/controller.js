app.controller('ctrl', function($scope, $state, service, $q){

  // $scope.gPlace;
  $scope.chosenPlace;
  $scope.storesList = service.calculatedList;
  $scope.bla = service.location;

  $scope.submit = function(chosenPlace){
    service.getDistance(chosenPlace, service, $q.defer()).then(function(res) {
    $state.go('result');
  })

    
  };

});