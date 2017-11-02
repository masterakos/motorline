angular
  .module('motorlineApp')
  .controller('NewVehicleController', NewVehicleController);

  NewVehicleController.$inject = ['$http', '$state'];

  function NewVehicleController($http, $state) {
    var vm = this;

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
          url: 'vehicles/new',
          method: 'POST',
          data: vm.vehicle
        }).then(function(response) {
          if (response.data.status == 'ok') {
            $state.go('vehicle', { vehicleId: response.data.vehicle.id });
          } else {
            alert(response.data.error);
          }
        });
      } else {
        alert("ΣΥΜΠΛΗΡΩΣΤΕ ΟΛΑ ΤΑ ΣΤΟΙΧΕΙΑ");
      }
    };
  }
