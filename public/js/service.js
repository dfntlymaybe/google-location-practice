app.factory('service', ['$http', '$window', function($http, $window){

    var service = {
      calculatedList: [],
      location: null
    };

    service.getDestinations = function(){
      var dest = [];
      for (var i = 0; i < chains.length; i++){
        dest = dest.concat(chains[i].branches);
      }
      return dest;
    }

    service.sortCalcList = function(){
      this.calculatedList.sort(function(a, b) {
          return (a.distancevalue) - (b.distancevalue);
      });
    }

    service.addDistanceFromOrigin = function(response){

      this.calculatedList = [];
      this.location = response.originAddresses[0];
      for(var i =0; i<response.destinationAddresses.length; i++){
        var temp ={
          address: response.destinationAddresses[i],
          distanceText: response.rows[0].elements[i].distance.text,
          distancevalue: response.rows[0].elements[i].distance.value,
        }
        if(i<3){
          temp.name = "shufersal-green";
        }else if(i<6){
          temp.name = "nitzat-haduvdevan";
        }else if(i<9){
          temp.name = "anise";
        }else{
          temp.name = "teva-kastel";
        }
        this.calculatedList.push(temp);
      }
      this.sortCalcList();
    };


    service.getDistance = function(origin, service ,deferred){

      var destinations = this.getDestinations();
      var ser = new google.maps.DistanceMatrixService();
      ser.getDistanceMatrix(
        {
          origins: [origin],
          destinations: destinations,
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: true,
        }, callback);

      function callback(response, status) {
         console.log(response);
         service.addDistanceFromOrigin(response);
         deferred.resolve('yay');
      }
      return deferred.promise;
    }
    
    return service;
  
  }]);