import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { StockSelect, TClient, TStock } from "../types";
import { select2Config } from "../config/dataConfig";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { getFormJSON, toast } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import invoiceService from "../service/invoiceService";
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";

interface InvoiceModalProps {
  modelShow: boolean;
  handleClose: () => void;
  clientList: TClient[];
  stockList: any;
}

type Stock = {
  id: string | undefined;
  item: string;
  quantity: number;
  rate: number;
};
export const InvoiceModal = ({
  modelShow,
  handleClose,
  clientList,
  stockList,
}: InvoiceModalProps) => {
  const [itemList, setItemList] = useState<Stock[]>([]);
  const [total, setTotal] = useState<number>();
  const [stockId, setStockId] = useState<StockSelect>();
  const [crrDate, setCurrDate] = useState<Date | null>(new Date());
  const [dispatchedDate, setDispatchedDate] = useState<Date | null>(new Date());
  const [orderDate, setOrderDate] = useState<Date | null>(new Date());
  async function addItem(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!stockId?.value) {
      toast.error("Select item");
      return;
    }
    const data = getFormJSON(e.target);
    const stockName: StockSelect = stockList.find(
      (stock: StockSelect) => stock.value === stockId?.value
    );
    let newStock: Stock;
    newStock = {
      id: stockId?.value,
      item: stockName.value,
      quantity: data.quantity,
      rate: data.rate,
    };
    setItemList((pre) => [...pre, newStock]);
    const form = document.getElementById("itemForm") as HTMLFormElement;
    if (form) {
      form.reset();
      setStockId({ value: "", label: "Enter stock name" });
    }
  }

  const deleteItem = (value: Stock) => {
    setItemList((pre) => pre.filter((stock) => stock.id !== value.id));
  };

  const calculateTotal = () => {
    const total = itemList.reduce(
      (accumulator: number, currentValue: Stock) => {
        return (
          accumulator +
          Number(currentValue.rate) * Number(currentValue.quantity)
        );
      },
      0
    );
    setTotal((total * (6 + 6)) / 100 + total);
  };

  const createInvoice = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (itemList.length === 0) {
      toast.error("Item is Empty");
      return;
    }
    const body = getFormJSON(e.target);
    body.item = itemList;
    const response = await invoiceService.createInvoice(body);
    if (response.success) {
      toast.success(response.message);
      handleClose();
      const form = document.getElementById("invoiceForm") as HTMLFormElement;
      if (form) {
        form.reset();
        await getAllInvoice();
      }
    }
  };

  const getAllInvoice = async () => {};

  useEffect(() => {
    calculateTotal();
  }, [itemList]);

  const columns = [
    {
      name: "item",
      header: "Item",
      //minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "quantity",
      header: "Quantity",
      //minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "rate",
      header: "Rate",
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
            <DeleteOutlineOutlinedIcon
              className="delete-icon"
              onClick={() => deleteItem(data)}
            />
          </div>
        );
      },
    },
  ];
  const gridStyle = { minHeight: 300, marginTop: 10 };

  const resetForm = async () => {};

  return (
    <Modal size="lg" show={modelShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Invoice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="invoiceForm" onSubmit={createInvoice}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="invoiceNo">
                <Form.Label>Invoice No</Form.Label>
                <Form.Control type="text" name="invoiceNo" autoFocus readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="Date">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  className="form-control"
                  selected={crrDate}
                  dateFormat="yyyy-MM-dd"
                  name="date"
                  onChange={(date) => {
                    setCurrDate(date);
                  }}
                  required
                />
                {/* <Form.Control type="date" name="date" required value={date} /> */}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="orderDate">
                <Form.Label>Order Date</Form.Label>
                <DatePicker
                  name="orderDate"
                  selected={orderDate}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => {
                    setOrderDate(date);
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="dispatchedDate">
                <Form.Label>Dispatched Date</Form.Label>
                <DatePicker
                  name="dispatchedDate"
                  selected={dispatchedDate}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => {
                    setDispatchedDate(date);
                  }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="dispatchedThrough">
                <Form.Label>Dispatched Through</Form.Label>
                <Form.Select name="dispatchedThrough" required>
                  <option value="" disabled>
                    select
                  </option>
                  <option value="Direct">Direct</option>
                  <option value="Courier">Courier</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="orderNo">
                <Form.Label>Order No</Form.Label>
                <Form.Control
                  type="text"
                  name="orderNo"
                  value={"Verbal"}
                  readOnly
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="paymentType">
                <Form.Label>Mode/Terms of Payment</Form.Label>
                <Form.Control
                  type="text"
                  name="paymentType"
                  value={"-"}
                  readOnly
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="invoiceTo">
                <Form.Label>Invoice To</Form.Label>
                <Form.Select name="invoiceTo" required>
                  <option value="" disabled selected>
                    select
                  </option>
                  {clientList.map((data: TClient) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="termsOfDelivery">
                <Form.Label>Terms of Delivery</Form.Label>
                <Form.Control as="textarea" rows={3} name="termsOfDelivery" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <hr />
        <Form onSubmit={addItem} id="itemForm">
          <Row>
            <Col md={8}>
              <Form.Group className="mb-8" controlId="stockId">
                <Form.Label>Stock Name</Form.Label>
                <Select
                  options={stockList}
                  styles={select2Config}
                  className="select2"
                  name="stockId"
                  id="stockId"
                  value={stockId}
                  onChange={(value: any, action) => setStockId(value)}
                  placeholder="Enter Stock Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" min="0" required />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3" controlId="rate">
                <Form.Label>Rate</Form.Label>
                <Form.Control type="number" name="rate" min="0" required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Button className="button" type="submit">
              Add item
            </Button>
          </Row>
        </Form>

        <hr />

        <div className="invoice_preview">
          <div>
            <span>Item Preview</span>
          </div>
          <div className="table-view">
            <ReactDataGrid
              idProperty="id"
              columns={columns}
              dataSource={itemList}
              style={gridStyle}
            />
            <div className="total-preview">
              <div className="tax-preview">
                <span className="tax-name">SGST:</span>
                <span className="tax-value">6%</span>
              </div>
              <div className="tax-preview">
                <span className="tax-name">CGST:</span>
                <span className="tax-value">6%</span>
              </div>
              <div className="tax-preview">
                <span className="tax-name">Total: </span>
                <span className="tax-value">{total} </span>
              </div>
            </div>
          </div>
        </div>
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
          form="invoiceForm"
        >
          Create Invoice
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
