angular
  .module('motorlineApp')
  .controller('VehiclesController', VehiclesController);

  VehiclesController.$inject = ['$state', '$http'];

  function VehiclesController($state, $http) {
    var vm = this;
    vm.vehicles = [];
    vm.q = '';

    vm.search = function() {
      if (!vm.q) return;
      $http({
        url: 'vehicles/search?q=' + vm.q,
        method: 'GET'
      }).then(function(response) {
        vm.vehicles = response.data;
      });
    };

    vm.showVehicle = function(vehicleId) {
      $http({
        url: 'vehicles/' + vehicleId,
        method: 'GET'
      }).then(function(response) {
        $state.go('vehicle', { vehicleId: vehicleId });
      });
    };

    $http({
      url: 'vehicles',
      method: 'GET',
    }).then(function(response) {
      vm.vehicles = response.data;
    });
  }
