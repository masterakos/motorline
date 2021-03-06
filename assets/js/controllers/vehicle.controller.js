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
      isActive: false
    };

    vm.gas = {
      isActive: false,
      save: function() {
        for (var key in vm.vehicle.gas) {
          ['number', 'approval', 'capacity', 'date'].forEach(function(prop) {
            if (prop in vm.vehicle.gas[key]) {
              vm.vehicle.gas[key][prop] = vm.vehicle.gas[key][prop].replace('-', '/');  
            }
          });
        }
        $http({
          url: 'vehicles/' + vm.vehicle.id + '/gas/update',
          method: 'POST',
          data: vm.vehicle.gas
        }).then(function(response) {
          vm.gas.isActive = false;
        });
      }
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
