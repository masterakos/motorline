<?php

class Vehicles extends CI_Controller {

  public function __construct() {
    parent::__construct();

    $this->load->model('Vehicle_model', 'Vehicle');

    $this->load->database();
  }

  public function index() {
    $page = $this->input->get('page');
    $limit = 10;
    if (!$page) $page = 1;
    $vehicles = $this->Vehicle->get_all(($page - 1) * 10, $limit);
    print json_encode($vehicles);
  }

  public function get($id) {
    $vehicle = $this->Vehicle->get($id);

    $query = $this->db->order_by('id', 'desc')->get_where('orders', array('vehicle_id' => $vehicle['id']));
    $orders = $query->result_array();
    foreach($orders as &$order) {
      $order['products'] = $this->db->select('*')
        ->join('orders', 'orders.id = orders_products.order_id')
        ->get_where('orders_products', array('id' => $order['id']))->result_array();
      $order['customer'] = $this->db->get_where('customers', array('id' => $order['customer_id']))->row_array();
      $order['vehicle'] = $this->db->get_where('vehicles', array('id' => $order['vehicle_id']))->row_array();
    }
    $vehicle['orders'] = $orders;

    print json_encode($vehicle);
  }

  public function search() {
    $q = $this->input->get('q');
    $vehicles = $this->Vehicle->search($q);
    print json_encode($vehicles);
  }

  public function insert() {
    $post_data = json_decode(file_get_contents('php://input'));
    $properties_exist = property_exists($post_data, 'brand');
    $properties_exist = property_exists($post_data, 'model');
    $properties_exist = property_exists($post_data, 'plate');

    if ($properties_exist) {
      // check if already exists
      $already_exists = $this->Vehicle->get(array('plate' => $post_data->plate));
      if ($already_exists) {
        print json_encode(array(
          'status' => "error",
          'error' => "already exists"
        ));
        exit;
      }

      $insert = $this->Vehicle->insert($post_data);
      if ($insert) {
        $vehicle = $this->Vehicle->get($insert); // get with new insert id
        print json_encode(array(
          'status' => "ok",
          'vehicle' => $vehicle
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
    $this->Vehicle->update($id, $post_data);
  }

  public function delete($id) {
    $this->Vehicle->delete($id);
  }

}
