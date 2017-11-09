angular
  .module('motorlineApp')
  .controller('NewCustomerFullController', NewCustomerFullController);

  NewCustomerFullController.$inject = ['$http', '$state', '$timeout'];

  function NewCustomerFullController($http, $state, $timeout) {
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

    vm.vehicle = {
      brand: '',
      model: '',
      plate: '',
      chassis: '',
      date: '',
      cc: '',
      engine: '',
      fuel: ''
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
        required = ['brand', 'model', 'plate'];
        for (var key in vm.vehicle) {
          if (required.indexOf(key) > -1) {
            isOk &= vm.vehicle[key].length > 0;
          }
          vm.vehicle[key] = vm.vehicle[key].toUpperCase();
        }

        if (!vm.vehicle.plate.match(/^[Α-Ω 0-9]+$/)) {
          alert("ΣΥΜΠΛΗΡΩΣΤΕ ΤΟΝ ΑΡΙΘΜΟ ΚΥΚΛΟΦΟΡΙΑΣ ΣΤΑ ΕΛΛΗΝΙΚΑ");
          return;
        }

        if (isOk) {
          $http({
            url: 'customers/new',
            method: 'POST',
            data: vm.customer
          }).then(function(response) {
            if (response.data.status == 'ok' || vm.customerId) {
              var customerId;
              if (vm.customerId) {
                customerId = vm.customerId;
              } else {
                vm.customerId = response.data.customer.id;
                customerId = vm.customerId
              }
              $http({
                url: 'vehicles/new',
                method: 'POST',
                data: vm.vehicle
              }).then(function(response) {
                if (response.data.status == 'ok') {
                  $http({
                    url: 'connect/' + customerId + '/' + response.data.vehicle.id,
                    method: 'POST'
                  }).then(function(response) {
                    $state.go('customer', { customerId: customerId });
                  });
                } else if (response.data.error == 'vehicle already exists') {
                  alert('Το αυτοκίνητο υπάρχει ήδη');
                } else {
                  alert(response.data.error);
                }
              });
            } else if (response.data.error == 'customer already exists') {
              alert('Ο πελάτης υπάρχει ήδη');
            } else {
              alert(response.data.error);
            }
          });
        } else {
          alert("ΣΥΜΠΛΗΡΩΣΤΕ ΟΛΑ ΤΑ ΣΤΟΙΧΕΙΑ");
        }
      } else {
        alert("ΣΥΜΠΛΗΡΩΣΤΕ ΟΛΑ ΤΑ ΣΤΟΙΧΕΙΑ");
      }
    };

    var checkCustomerTimeout;
    vm.checkCustomer = function() {
      if (checkCustomerTimeout) $timeout.cancel(checkCustomerTimeout);
      checkCustomerTimeout = $timeout(function() {
        $http({
          url: 'customers/search?q=' + vm.customer.afm,
          method: 'GET'
        }).then(function(response) {
          if (response.data.length > 0) {
            vm.customerOk = false;
          } else {
            vm.customerOk = true;
          }
        });
      }, 1000);
    };

    var checkVehicleTimeout;
    vm.checkVehicle = function() {
      if (checkVehicleTimeout) $timeout.cancel(checkVehicleTimeout);
      checkVehicleTimeout = $timeout(function() {
        $http({
          url: 'vehicles/search?q=' + vm.vehicle.plate,
          method: 'GET'
        }).then(function(response) {
          if (response.data.length > 0) {
            vm.vehicleOk = false;
          } else {
            vm.vehicleOk = true;
          }
        });
      }, 1000);
    };
  }
