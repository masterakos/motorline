<?php

class Invoices extends CI_Controller {

  public function __construct() {
    parent::__construct();

    $this->load->database();
  }

  public function index() {
    $query = $this->db->limit(10)->order_by('id', 'asc')->get('invoices');
    $invoices = $query->result_array();
    foreach($invoices as &$invoice) {
      $invoice['products'] = $this->db->select('*')
        ->get_where('invoices_products', array('invoices_products.invoice_id' => $invoice['id']))->result_array();
    }
    print json_encode($invoices);
  }

  public function search() {
    $q = $this->input->get('q');
    $from = $this->input->get('from');
    $to = $this->input->get('to');

    if ($q) {
      $this->db->or_like('name', $q);
      $this->db->or_like('afm', $q);
    } else if ($from && $to) {
      $this->db->where('date >=', $from);
      $this->db->where('date <=', $to);
    }
    $query = $this->db->get('invoices');
    $invoices = $query->result_array();
    // foreach($invoices as &$invoice) {
    //   $invoice['products'] = $this->db->select('*')
    //     ->get_where('invoices_products', array('invoices_products.invoice_id' => $invoice['id']))->result_array();
    // }
    print json_encode($invoices);
  }

  public function get($id) {
    $query = $this->db->get_where('invoices', array('id' => $id));
    $invoice = $query->row_array();
    $invoice['products'] = $this->db->select('*')
      ->get_where('invoices_products', array('invoices_products.invoice_id' => $id))->result_array();
    print json_encode($invoice);
  }

  public function insert() {
    $post_data = json_decode(file_get_contents('php://input'));

    $this->db->insert('invoices', array(
      'place' => $post_data->place,
      'date' => $post_data->date,
      'name' => $post_data->name,
      'profession' => $post_data->profession,
      'address' => $post_data->address,
      'city' => $post_data->city,
      'doy' => $post_data->doy,
      'afm' => $post_data->afm
    ));
    $invoice_id = $this->db->insert_id();

    foreach($post_data->products as $product) {
      $this->db->insert('invoices_products', array(
        'invoice_id' => $invoice_id,
        'code' => $product->code,
        'description' => $product->description,
        'quantity' => $product->quantity,
        'price' => $product->price
      ));
    }

    print $invoice_id;
  }

}
