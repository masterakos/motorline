<?php

class Vehicle_model extends CI_Model {

    public function __construct() {
      parent::__construct();

      $this->load->database();
    }

    public function get($id) {
      if (is_array($id)) {
        $query = $this->db->get_where('vehicles', $id);
        $vehicle = $query->row_array();
      } else {
        $query = $this->db->get_where('vehicles', array('id' => $id));
        $vehicle = $query->row_array();
      }

      if ($vehicle) {
        $vehicle['customers'] = $this->getCustomers($vehicle['id']);
      }
      return $vehicle;
    }

    public function get_all($offset, $limit) {
      $query = $this->db->order_by('id', 'desc')->get('vehicles', $limit, $offset);
      $vehicles = $query->result();
      return $vehicles;
    }

    public function search($query) {
      $this->db->or_like(array(
        'brand' => $query,
        'model' => $query,
        'plate' => $query,
        'chassis' => $query,
      ));
      $query = $this->db->get('vehicles');
      $vehicles = $query->result();
      return $vehicles;
    }

    public function insert($data) {
      $insert = $this->db->insert('vehicles', $data);
      if ($insert) {
        return $this->db->insert_id();
      } else {
        return false;
      }
    }

    public function update($id, $data) {
      return $this->db->update('vehicles', $data, array('id' => $id));
    }

    public function delete($id) {
      return $this->db->delete('vehicles', array('id' => $id));
    }

    private function getCustomers($id) {
      $query = $this->db->select('*')->from('customers')
        ->join('customer_vehicles', 'customer_vehicles.customer_id = customers.id')
        ->where('vehicle_id', $id)
        ->get();

      $customers = $query->result();
      return $customers;
    }
}
