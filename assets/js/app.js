angular
  .module('motorlineApp', [
    'ui.router'
  ])
  .run(function($rootScope, $transitions) {
    $transitions.onSuccess({ to: '*' }, function(trans) {
      $rootScope.stateName = trans.router.stateProvider.$get().current.name;
    });
  })
