angular
  .module('motorlineApp')
  .controller('EditVehicleController', EditVehicleController);

  EditVehicleController.$inject = ['$http', '$state', '$stateParams'];

  function EditVehicleController($http, $state, $stateParams) {
    var vm = this;

    vm.vehicle = {};

    vm.submit = function() {
      for (var key in vm.vehicle) {
        if (typeof vm.vehicle[key] == 'string')
          vm.vehicle[key] = vm.vehicle[key].toUpperCase();
      }

      delete vm.vehicle.gas;

      $http({
        url: 'vehicles/update/' + $stateParams.vehicleId,
        method: 'POST',
        data: vm.vehicle
      }).then(function(response) {
        $state.go('vehicle', { vehicleId: $stateParams.vehicleId });
      });
    };

    $http({
      url: 'vehicles/' + $stateParams.vehicleId,
      method: 'GET'
    }).then(function(response) {
      vm.vehicle = response.data;
    });
  }
