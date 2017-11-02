<?php

class Customer_model extends CI_Model {

    public function __construct() {
      parent::__construct();

      $this->load->database();
    }

    public function get($id) {
      if (is_array($id)) {
        $query = $this->db->get_where('customers', $id);
        $customer = $query->row_array();
      } else {
        $query = $this->db->get_where('customers', array('id' => $id));
        $customer = $query->row_array();
      }

      if ($customer) {
        $customer['vehicles'] = $this->getVehicles($customer['id']);
      }
      return $customer;
    }

    public function get_all($offset, $limit) {
      $query = $this->db->order_by('id', 'desc')->get('customers', $limit, $offset);
      $customers = $query->result();
      return $customers;
    }

    public function search($query) {
      $this->db->or_like(array(
        // 'firstname' => $query,
        'lastname' => $query,
        'afm' => $query,
        'phone' => $query,
        'mobile' => $query,
      ));
      $query = $this->db->get('customers');
      $customers = $query->result();
      return $customers;
    }

    public function insert($data) {
      $insert = $this->db->insert('customers', $data);
      if ($insert) {
        return $this->db->insert_id();
      } else {
        return false;
      }
    }

    public function update($id, $data) {
      return $this->db->update('customers', $data, array('id' => $id));
    }

    public function delete($id) {
      return $this->db->delete('customers', array('id' => $id));
    }

    private function getVehicles($id) {
      $query = $this->db->select('*')->from('vehicles')
        ->join('customer_vehicles', 'vehicle_id = vehicles.id')
        ->where('customer_id', $id)
        ->get();

      $vehicles = $query->result();
      return $vehicles;
    }
}
