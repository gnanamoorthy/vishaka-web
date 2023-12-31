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
import Dialog from "./Dialog";
import { gstCalculate } from "../utils";

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
  const [cgstAmount, setCgstAmount] = useState<number>();
  const [sgstAmount, setSgstAmount] = useState<number>();
  const [stockId, setStockId] = useState<StockSelect>();
  const [crrDate, setCurrDate] = useState<Date | null>(new Date());
  const [dispatchedDate, setDispatchedDate] = useState<Date | null>(new Date());
  const [orderDate, setOrderDate] = useState<Date | null>(new Date());
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [gstType, setGstType] = useState("GST");

  async function addItem(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!stockId?.value) {
      toast.error("Select item");
      return;
    }
    const data = getFormJSON(e.target);
    const stock: StockSelect = stockList.find(
      (stock: StockSelect) => stock.value === stockId?.value
    );
    const taxableAmount = Number(data.quantity) * Number(data.rate);
    let gst;
    if (gstType == "GST") {
      gst = Number(data.cgst) + Number(data.sgst);
    } else {
      gst = Number(data.igst);
    }

    const gstAmount = gstCalculate(taxableAmount, gst);
    let newStock: any = {
      ...stock,
      ...data,
      taxableAmount,
      gst,
      gstAmount,
      amount: (taxableAmount + gstAmount).toFixed(2),
    };
    setItemList((pre) => [...pre, newStock]);
    const form = document.getElementById("itemForm") as HTMLFormElement;
    if (form) {
      form.reset();
      setStockId({ value: "", label: "Enter stock name" });
    }
  }

  const deleteItem = (value: Stock) => {
    Dialog.getConfirm(() => {
      setItemList((pre) => pre.filter((stock) => stock.id !== value.id));
    });
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
    setCgstAmount((total * 6) / 100);
    setSgstAmount((total * 6) / 100);

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
    body.netAmount = total;
    const response = await invoiceService.createInvoice(body);
    if (response.success) {
      toast.success(response.message);
      handleClose();
      const form = document.getElementById("invoiceForm") as HTMLFormElement;
      if (form) {
        form.reset();
        setItemList([]);
      }
    }
  };
  const stockOnChange = (value: any) => {
    setStockId(value);
    setItemQuantity(value.quantity);
  };
  useEffect(() => {
    calculateTotal();
  }, [itemList]);
  const getItem = () => {};
  const columns = [
    {
      name: "stockName",
      header: "Item",
    },
    {
      name: "quantity",
      header: "Quantity",
    },
    {
      name: "rate",
      header: "Rate",
    },
    {
      name: "marketPrice",
      header: "Mrp",
    },
    {
      name: "discount",
      header: "Dis %",
    },
    {
      name: "taxableAmount",
      header: "Taxable value",
    },
    {
      name: "gst",
      header: "GST",
    },
    {
      name: "gstAmount",
      header: "GST AMT",
    },
    {
      name: "amount",
      header: "Amount",
    },
    {
      name: "id",
      header: "Action",
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
                  <option value="" disabled defaultValue={""}>
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
                  onChange={(value: any, action) => stockOnChange(value)}
                  placeholder="Enter Stock Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  min="0"
                  max={itemQuantity}
                  placeholder={itemQuantity + " left"}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3" controlId="rate">
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3" controlId="gstType">
                <Form.Label>GstType</Form.Label>
                <Form.Select
                  name="gstType"
                  onChange={(e) => setGstType(e.target.value)}
                  required
                >
                  <option value="GST">GST</option>
                  <option value="IGST">IGST</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="discount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
            {gstType === "GST" && (
              <>
                <Col>
                  <Form.Group className="mb-3" controlId="cgst">
                    <Form.Label>CGST</Form.Label>
                    <Form.Control
                      type="number"
                      name="cgst"
                      min="0"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="sgst">
                    <Form.Label>SGST</Form.Label>
                    <Form.Control
                      type="number"
                      name="sgst"
                      min="0"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            {gstType === "IGST" && (
              <Col md={4}>
                <Form.Group className="mb-3" controlId="igst">
                  <Form.Label>IGST</Form.Label>
                  <Form.Control
                    type="number"
                    name="igst"
                    min="0"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>
            )}
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
              {/* <div className="tax-preview">
                <span className="tax-name">SGST:</span>
                <span className="tax-value">6%</span>
                <span className="tax-value">{sgstAmount}</span>
              </div>
              <div className="tax-preview">
                <span className="tax-name">CGST:</span>
                <span className="tax-value">6%</span>
                <span className="tax-value">{cgstAmount}</span>
              </div> */}
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
