angular
  .module('motorlineApp')
  .controller('EditCustomerController', EditCustomerController);

  EditCustomerController.$inject = ['$http', '$state', '$stateParams'];

  function EditCustomerController($http, $state, $stateParams) {
    var vm = this;

    vm.customer = {};

    vm.submit = function() {
      for (var key in vm.customer) {
        if (typeof vm.customer[key] == 'string')
          vm.customer[key] = vm.customer[key].toUpperCase();
      }

      $http({
        url: 'customers/update/' + $stateParams.customerId,
        method: 'POST',
        data: vm.customer
      }).then(function(response) {
        $state.go('customer', { customerId: $stateParams.customerId });
      });
    };

    $http({
      url: 'customers/' + $stateParams.customerId,
      method: 'GET'
    }).then(function(response) {
      vm.customer = response.data;
    });
  }
