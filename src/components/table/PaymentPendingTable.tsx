import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { api, gridStyle } from "../../constant/constant";
import paymentService from "../../service/PaymentService";
import { getFormJSON, toast } from "../../utils";
import Dialog from "../Dialog";

const PaymentPendingTable = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [invoiceId, setInvoiceId] = useState<string>("");
  const handleClose = async () => {
    setModelShow(false);
    await loadPendingPayments();
  };
  const openModal = (data: any) => {
    setModelShow(true);
    setInvoiceId(data.invoiceNo);
  };
  const loadPendingPayments = async () => {
    const response = await paymentService.getPendingPayments();
    if (response.success) {
      setPaymentList(response.data.pendingPaymentList);
    }
  };

  const updatePayment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = getFormJSON(e.target);
    Dialog.getConfirm(async () => {
      const response = await paymentService.updatePayment(invoiceId, body);
      if (response.success) {
        toast.success(response.message);
        handleClose();
      } else {
        toast.error(response.message);
      }
    });
  };

  const viewInvoice = (data: any) => {
    window.open(api.baseUrl + "invoice/view/" + data.invoiceNo);
  };

  useEffect(() => {
    loadPendingPayments();
  }, []);
  const columns = [
    { name: "invoiceNo", header: "InvoiceNo", defaultFlex: 1 },
    { name: "orderDate", header: "BillDate", defaultFlex: 1 },
    {
      name: "client",
      header: "Client Name",
      render: ({ data }: any) => {
        return data.client.name;
      },
    },
    {
      name: "items",
      header: "Items",
      defaultWidth: 100,
      render: ({ data }: any) => {
        return (
          <div className="action-icons">
            <Button
              variant="primary"
              size="sm"
              onClick={() => viewInvoice(data)}
            >
              View
            </Button>
          </div>
        );
      },
    },
    {
      name: "netAmount",
      header: "Amount",
      defaultFlex: 1,
    },
    {
      name: "id",
      header: "Action",
      minWidth: 40,
      render: ({ data }: any) => {
        return (
          <div className="action-icons">
            <Button variant="primary" size="sm" onClick={() => openModal(data)}>
              Update Payment
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={paymentList}
        style={gridStyle}
        pagination
        defaultLimit={10}
      />
      <Modal show={modelShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updatePayment} id="paymentUpdateForm">
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="paymentMode">
                  <Form.Label>Payment Mode</Form.Label>
                  <Form.Select name="paymentMode" required>
                    <option value="" disabled>
                      select
                    </option>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="netTransfer">Net Transfer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button"
              variant="primary"
              size="sm"
              type="submit"
            >
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentPendingTable;
