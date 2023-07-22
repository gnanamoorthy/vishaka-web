import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getFormJSON } from "../utils/utils";
import clientService from "../service/clientService";
import { toast } from "../utils";
import { TClient, TStock } from "../types";

const Client = () => {
  const [clientList, setClientList] = useState([]);
  const [clientId, setClientId] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [phoneNo, setPhoneNo] = useState(0);
  const [altPhoneNo, setAltPhoneNo] = useState(0);
  const addClient = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = getFormJSON(e.target);
    let response;
    if (clientId === 0) {
      response = await clientService.createClient(body);
    } else {
      response = await clientService.updateClient(body);
    }

    if (response.success) {
      toast.success(response.message);
      resetForm();
    } else {
      toast.error(response.message);
    }
  };

  const deleteClient = async (id: number) => {
    const response = await clientService.deleteClient(id);
    if (response.success) {
      toast.success(response.message);
      await getAllClient();
    }
  };

  const editOnClick = async (data: TClient) => {
    handleShow();
    setClientId(data.id);
    setClientName(data.name);
    setClientAddress(data.address);
    setGstNo(data.gstNo);
    setPhoneNo(data.phoneNo);
    setAltPhoneNo(data.altPhoneNo);
  };

  const resetForm = async () => {
    setClientId(0);
    setClientName("");
    setClientAddress("");
    setGstNo("");
    setPhoneNo(0);
    setAltPhoneNo(0);
  };

  useEffect(() => {
    getAllClient();
  }, []);

  const getAllClient = async () => {
    const response = await clientService.getAllClient();
    setClientList(response.data.clientList);
  };

  const [modelShow, setModelShow] = useState(false);
  const handleClose = async () => {
    setModelShow(false);
    await getAllClient();
  };
  const handleShow = () => {
    setModelShow(true);
    setClientId(0);
    setClientName("");
    setClientAddress("");
    setGstNo("");
    setPhoneNo(0);
    setAltPhoneNo(0);
  };
  const gridStyle = { minHeight: 550, marginTop: 10 };

  const columns = [
    { name: "name", header: "Client Name ", defaultFlex: 1 },
    { name: "address", header: "Address", defaultFlex: 1 },
    {
      name: "phoneNo",
      header: "Phone No",
      defaultWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "altPhoneNo",
      header: "Alternative Phone No",
      //minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "id",
      header: "Action",
      minWidth: 40,
      render: ({ data }: any) => {
        return (
          <div className="action-icons">
            <EditOutlinedIcon
              className="edit-icon"
              onClick={() => editOnClick(data)}
            />
            <DeleteOutlineOutlinedIcon
              className="delete-icon"
              onClick={() => deleteClient(data.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="page-heading">
        <span className="heading">Manage Clients</span>
        <Button
          className="button"
          variant="primary"
          size="lg"
          onClick={handleShow}
        >
          Add
        </Button>
      </div>
      <div className="table-container">
        <ReactDataGrid
          idProperty="id"
          columns={columns}
          dataSource={clientList}
          style={gridStyle}
          pagination
          defaultLimit={10}
        />
      </div>
      <Modal show={modelShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addClient} id="clientForm">
          <input type="hidden" value={clientId} name="id" />
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="clientName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    autoFocus
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="clientGstNo">
                  <Form.Label>GST No</Form.Label>
                  <Form.Control
                    type="text"
                    name="gstNo"
                    value={gstNo}
                    onChange={(e) => setGstNo(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="clientPhoneNo">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    type="number"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="clientAltPhoneNo">
                  <Form.Label>Alternative Phone No</Form.Label>
                  <Form.Control
                    type="number"
                    name="altPhoneNo"
                    value={altPhoneNo}
                    onChange={(e) => setAltPhoneNo(Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="clientAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="textarea"
                    name="address"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="button"
              size="sm"
              type="reset"
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button
              className="button"
              variant="primary"
              size="sm"
              type="submit"
            >
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Client;
