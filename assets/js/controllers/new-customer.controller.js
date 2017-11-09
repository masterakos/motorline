angular
  .module('motorlineApp')
  .controller('NewCustomerController', NewCustomerController);

  NewCustomerController.$inject = ['$http', '$state'];

  function NewCustomerController($http, $state) {
    var vm = this;

    vm.customer = {
      firstname: '',
      lastname: '',
      afm: '',
      doy: '',
      profession: '',
      city: '',
      address: '',
      zip: '',
      phone: '',
      mobile: ''
    };

    vm.submit = function() {
      var isOk = true;
      required = ['firstname', 'lastname'];
      for (var key in vm.customer) {
        if (required.indexOf(key) > -1) {
          isOk &= vm.customer[key].length > 0;
        }
        vm.customer[key] = vm.customer[key].toUpperCase();
      }

      if (isOk) {
        $http({
          url: 'customers/new',
          method: 'POST',
          data: vm.customer
        }).then(function(response) {
          if (response.data.status == 'ok') {
            $state.go('customer', { customerId: response.data.customer.id });
          } else if (response.data.error == 'customer already exists') {
            alert('Ο πελάτης υπάρχει ήδη');
          } else {
            alert(response.data.error);
          }
        });
      } else {
        alert("ΣΥΜΠΛΗΡΩΣΤΕ ΟΛΑ ΤΑ ΣΤΟΙΧΕΙΑ");
      }
    };
  }
