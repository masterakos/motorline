angular
  .module('motorlineApp')
  .controller('VehicleController', VehicleController);

  VehicleController.$inject = ['$state', '$stateParams', '$http'];

  function VehicleController($state, $stateParams, $http) {
    var vm = this;

    vm.vehicle = {};
    vm.options = {
      isActive: false
    };

    vm.search = {
      isActive: false,
      customers: []
    };

    vm.deleteVehicle = function() {
      if (confirm("ΔΙΑΓΡΑΦΗ ΑΥΤΟΚΙΝΗΤΟΥ;")) {
        $http({
          url: 'vehicles/delete/' + vm.vehicle.id,
          method: 'POST'
        }).then(function() {
          alert("ΤΟ ΑΥΤΟΚΙΝΗΤΟ ΔΙΑΓΡΑΦΗΚΕ");
          $state.go('vehicles');
        });
      }
    };

    vm.search.search = function() {
      if (!vm.q) return;
      $http({
        url: 'customers/search?q=' + vm.q,
        method: 'GET'
      }).then(function(response) {
        vm.search.customers = response.data;
      });
    };

    vm.addCustomer = function(id) {
      if (confirm("ΣΥΝΔΕΣΗ ΙΔΙΟΚΤΗΤΗ")) {
        $http({
          url: 'connect/' + id + '/' + vm.vehicle.id,
          method: 'POST'
        }).then(function(response) {
          vm.search.isActive = false;
          $state.reload();
        });
      }
    };

    vm.deleteCustomer = function(id) {
      if (confirm("ΔΙΑΓΡΑΦΗ ΙΔΙΟΚΤΗΤΗ")) {
        $http({
          url: 'disconnect/' + id + '/' + vm.vehicle.id,
          method: 'POST'
        }).then(function(response) {
          $state.reload();
        });
      }
    };

    $http({
      url: 'vehicles/' + $stateParams.vehicleId,
      method: 'GET'
    }).then(function(response) {
      vm.vehicle = response.data;
      vm.vehicle.orders.forEach(function(order) {
        order.date = new Date(order.date).toDateString();
      });
    });
  }
