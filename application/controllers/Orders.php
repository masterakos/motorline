<?php

class Orders extends CI_Controller {

  public function __construct() {
    parent::__construct();

    $this->load->database();
  }

  public function index() {
    $query = $this->db->limit(10)->order_by('id', 'desc')->get('orders');
    $orders = $query->result_array();
    foreach($orders as &$order) {
      $order['products'] = $this->db->select('*')
        ->join('orders', 'orders.id = orders_products.order_id')
        ->get_where('orders_products', array('id' => $order['id']))->result_array();
      $order['customer'] = $this->db->get_where('customers', array('id' => $order['customer_id']))->row_array();
      $order['vehicle'] = $this->db->get_where('vehicles', array('id' => $order['vehicle_id']))->row_array();
    }
    print json_encode($orders);
  }

  public function get($id) {
    $query = $this->db->order_by('id', 'desc')->get_where('orders', array('id' => $id));
    $order = $query->row_array();
    $order['products'] = $this->db->select('*')
      ->join('orders', 'orders.id = orders_products.order_id')
      ->get_where('orders_products', array('orders_products.order_id' => $order['id']))->result_array();
    $order['customer'] = $this->db->get_where('customers', array('id' => $order['customer_id']))->row_array();
    $order['vehicle'] = $this->db->get_where('vehicles', array('id' => $order['vehicle_id']))->row_array();
    print json_encode($order);
  }

  public function search() {
    $q = $this->input->get('q');
    $from = $this->input->get('from');
    $to = $this->input->get('to');

    if ($q) {
      $query = $this->db->select('orders.id, orders.date, orders.customer_id, orders.vehicle_id, customers.lastname, customers.afm, vehicles.plate')
        ->from('orders')
        ->join('customers', 'orders.customer_id = customers.id')
        ->join('vehicles', 'orders.vehicle_id = vehicles.id')
        ->or_like('customers.lastname', $q)
        ->or_like('customers.afm', $q)
        ->or_like('vehicles.plate', $q)
        ->get();
      $orders = $query->result_array();

      foreach($orders as &$order) {
        $order['products'] = $this->db->select('code, description, quantity, price')
          ->from('orders_products')
          ->join('orders', 'orders.id = orders_products.order_id')
          ->get()->result_array();
        $order['customer'] = $this->db->get_where('customers', array('id' => $order['customer_id']))->row_array();
        $order['vehicle'] = $this->db->get_where('vehicles', array('id' => $order['vehicle_id']))->row_array();
      }
      print json_encode($orders);
    } elseif($from && $to) {
      $query = $this->db->select('orders.id, orders.date, orders.customer_id, orders.vehicle_id, customers.lastname, customers.afm, vehicles.plate')
        ->from('orders')
        ->join('customers', 'orders.customer_id = customers.id')
        ->join('vehicles', 'orders.vehicle_id = vehicles.id')
        ->where('orders.date >= ', $from)
        ->where('orders.date <= ', $to)
        ->get();
      $orders = $query->result_array();

      foreach($orders as &$order) {
        $order['products'] = $this->db->select('code, description, quantity, price')
          ->from('orders_products')
          ->join('orders', 'orders.id = orders_products.order_id')
          ->get()->result_array();
        $order['customer'] = $this->db->get_where('customers', array('id' => $order['customer_id']))->row_array();
        $order['vehicle'] = $this->db->get_where('vehicles', array('id' => $order['vehicle_id']))->row_array();
      }
      print json_encode($orders);
    }
  }

  public function insert() {
    $post_data = json_decode(file_get_contents('php://input'));

    $this->db->insert('orders', array(
      'customer_id' => $post_data->customer->id,
      'vehicle_id' => $post_data->vehicle->id,
      'date' => $post_data->date
    ));

    $order_id = $this->db->insert_id();

    foreach($post_data->products as $product) {
      $this->db->insert('orders_products', array(
        'order_id' => $order_id,
        'code' => $product->code,
        'description' => $product->description,
        'quantity' => $product->quantity,
        'price' => $product->price
      ));
    }

    print $order_id;
  }
}
