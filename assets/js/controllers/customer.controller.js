angular
  .module('motorlineApp')
  .controller('CustomerController', CustomerController);

  CustomerController.$inject = ['$state', '$stateParams', '$http'];

  function CustomerController($state, $stateParams, $http) {
    var vm = this;

    vm.customer = {};
    vm.options = {
      isActive: false
    };

    vm.search = {
      isActive: false
    };

    vm.deleteCustomer = function() {
      if (confirm("ΔΙΑΓΡΑΦΗ ΠΕΛΑΤΗ;")) {
        $http({
          url: 'customers/delete/' + vm.customer.id,
          method: 'POST'
        }).then(function() {
          alert("Ο ΠΕΛΑΤΗΣ ΔΙΑΓΡΑΦΗΚΕ");
          $state.go('customers');
        });
      }
    };

    vm.search.search = function() {
      if (!vm.q) return;
      $http({
        url: 'vehicles/search?q=' + vm.q,
        method: 'GET'
      }).then(function(response) {
        vm.search.vehicles = response.data;
      });
    };

    vm.addVehicle = function(id) {
      if (confirm("ΣΥΝΔΕΣΗ ΑΥΤΟΚΙΝΗΤΟΥ")) {
        $http({
          url: 'connect/' + vm.customer.id + '/' + id,
          method: 'POST'
        }).then(function(response) {
          vm.search.isActive = false;
          $state.reload();
        });
      }
    };

    vm.deleteVehicle = function(id) {
      if (confirm("ΔΙΑΓΡΑΦΗ ΑΥΤΟΚΙΝΗΤΟΥ")) {
        $http({
          url: 'disconnect/' + vm.customer.id + '/' + id,
          method: 'POST'
        }).then(function(response) {
          $state.reload();
        });
      }
    };

    $http({
      url: 'customers/' + $stateParams.customerId,
      method: 'GET'
    }).then(function(response) {
      vm.customer = response.data;
    });
  }
