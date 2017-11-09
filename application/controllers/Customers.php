<?php

class Customers extends CI_Controller {

  public function __construct() {
    parent::__construct();

    $this->load->model('Customer_model', 'Customer');
  }

  public function index() {
    $page = $this->input->get('page');
    $limit = 10;
    if (!$page) $page = 1;
    $customers = $this->Customer->get_all(($page - 1) * 10, $limit);
    print json_encode($customers);
  }

  public function get($id) {
    $customer = $this->Customer->get($id);
    print json_encode($customer);
  }

  public function search() {
    $q = $this->input->get('q');
    $customers = $this->Customer->search($q);
    print json_encode($customers);
  }

  public function insert() {
    $post_data = json_decode(file_get_contents('php://input'));
    $properties_exist = property_exists($post_data, 'firstname');
    $properties_exist = property_exists($post_data, 'lastname');

    if ($properties_exist) {
      // check if already exists
      $already_exists = $this->Customer->get(array('afm' => $post_data->afm));
      if ($post_data->afm && $already_exists) {
        print json_encode(array(
          'status' => "error",
          'error' => "customer already exists"
        ));
        exit;
      }

      if (!$post_data->afm) $post_data->afm = NULL;

      $insert = $this->Customer->insert($post_data);
      if ($insert) {
        $customer = $this->Customer->get($insert); // get with new insert id
        print json_encode(array(
          'status' => "ok",
          'customer' => $customer
        ));
      } else {
        print json_encode(array(
          'status' => "error",
          'error' => "insert failed"
        ));
      }
    } else {
      print json_encode(array(
        'status' => "error",
        'error' => "invalid fields"
      ));
    }
  }

  public function update($id) {
    $post_data = json_decode(file_get_contents('php://input'));
    $this->Customer->update($id, $post_data);
  }

  public function delete($id) {
    $this->Customer->delete($id);
  }

}
