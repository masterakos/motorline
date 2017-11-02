angular
  .module('motorlineApp')
  .controller('CustomersController', CustomersController);

  CustomersController.$inject = ['$state', '$http'];

  function CustomersController($state, $http) {
    var vm = this;
    vm.customers = [];
    vm.q = '';

    vm.search = function() {
      if (!vm.q) return;
      $http({
        url: 'customers/search?q=' + vm.q,
        method: 'GET'
      }).then(function(response) {
        vm.customers = response.data;
      });
    };

    vm.showCustomer = function(customerId) {
      $http({
        url: 'customers/' + customerId,
        method: 'GET'
      }).then(function(response) {
        $state.go('customer', { customerId: customerId });
      });
    };

    $http({
      url: 'customers',
      method: 'GET',
    }).then(function(response) {
      vm.customers = response.data;
    });
  }
