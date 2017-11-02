<?php

class App extends CI_Controller {

  public function __construct() {
    parent::__construct();

    $this->load->database();
  }

  public function index() {
    $data = [];

    $data['assets'] = array(
      'css' => array(
        'css/style.css',
        'bower_components/bulma/css/bulma.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/pikaday/css/pikaday.css',
      ),
      'js' => array(
        'bower_components/popper.js/dist/umd/popper.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/pikaday/pikaday.js',
        'bower_components/moment/min/moment.min.js',
        'js/app.js',
        'js/routes.js',
        'js/controllers/app.controller.js',
        'js/controllers/customers.controller.js',
        'js/controllers/customer.controller.js',
        'js/controllers/new-customer.controller.js',
        'js/controllers/edit-customer.controller.js',
        'js/controllers/vehicles.controller.js',
        'js/controllers/vehicle.controller.js',
        'js/controllers/new-vehicle.controller.js',
        'js/controllers/edit-vehicle.controller.js',
        'js/controllers/new-order.controller.js',
        'js/controllers/orders.controller.js',
        'js/controllers/order.controller.js',
        'js/controllers/new-invoice.controller.js',
        'js/controllers/invoice.controller.js',
        'js/controllers/invoices.controller.js',
      )
    );

    $this->load->view('index', $data);
  }

  public function connect($customer_id, $vehicle_id) {
    $this->db->insert('customer_vehicles', array(
      'customer_id' => $customer_id,
      'vehicle_id' => $vehicle_id,
    ));
  }

  public function disconnect($customer_id, $vehicle_id) {
    $this->db->delete('customer_vehicles', array(
      'customer_id' => $customer_id,
      'vehicle_id' => $vehicle_id,
    ));
  }

}
