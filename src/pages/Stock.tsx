import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getFormJSON } from "../utils/utils";
import stockService from "../service/stockService";
import { toast } from "../utils";
import { TStock } from "../types";
import Dialog from "../components/Dialog";
const Stock = () => {
  const [stocklist, setStocklist] = useState([]);
  const [stockId, setStockId] = useState(0);
  const [stockNo, setStockNo] = useState("");
  const [stockName, setStockName] = useState("");
  const [ourPrice, setOurPrice] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [discount, setDiscount] = useState(0);
  const addStock = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const body = getFormJSON(e.target);
    let response;
    if (stockId === 0) {
      response = await stockService.createStock(body);
    } else {
      response = await stockService.updateStock(body);
    }
    if (response.success) {
      toast.success(response.message);
      resetForm();
    } else {
      toast.error(response.message);
    }
  };

  const deleteStock = async (id: number) => {
    Dialog.getConfirm(async () => {
      const response = await stockService.deleteStock(id);
      if (response.success) {
        toast.success(response.message);
        await getAllStock();
      }
    });
  };

  const editOnClick = async (data: TStock) => {
    handleShow();
    setStockId(Number(data.id));
    setStockNo(data.stockNo);
    setMarketPrice(data.marketPrice);
    setStockName(data.stockName);
    setOurPrice(data.ourPrice);
    setQuantity(data.quantity);
    setCgst(data.cgst);
    setSgst(data.sgst);
    setDiscount(data.discount);
  };

  const resetForm = async () => {
    setStockId(0);
    setStockNo("");
    setMarketPrice(0);
    setStockName("");
    setOurPrice(0);
    setQuantity(0);
    setCgst(0);
    setSgst(0);
    setDiscount(0);
  };

  useEffect(() => {
    getAllStock();
  }, []);

  const getAllStock = async () => {
    const response = await stockService.getAllStock();
    setStocklist(response.data.stockList);
  };

  const [modelShow, setModelShow] = useState(false);
  const handleClose = async () => {
    setModelShow(false);
    await getAllStock();
  };
  const handleShow = () => {
    setModelShow(true);
    resetForm();
  };
  const gridStyle = { minHeight: 550, marginTop: 10 };

  const columns = [
    { name: "code", header: "Code" },
    { name: "stockName", header: "Stock Name" },
    { name: "stockNo", header: "Opening Stock No" },
    {
      name: "ourPrice",
      header: "Our Price",
      defaultWidth: 100,
    },
    {
      name: "marketPrice",
      header: "Market Price",
      //minWidth: 100,
    },
    {
      name: "cgst",
      header: "CGST",
      //minWidth: 100,
    },
    {
      name: "sgst",
      header: "SGST",
      //minWidth: 100,
    },
    {
      name: "discount",
      header: "Discount",
      //minWidth: 100,
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
              onClick={() => deleteStock(data.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="page-heading">
        <span className="heading">Manage Stocks</span>
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
          dataSource={stocklist}
          style={gridStyle}
          pagination
          defaultLimit={10}
        />
      </div>
      <Modal show={modelShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Stock</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addStock} id="stockForm">
          <input type="hidden" value={stockId} name="id" />
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="stockNo">
                  <Form.Label>Opening Stock No</Form.Label>
                  <Form.Control
                    type="text"
                    name="stockNo"
                    value={stockNo}
                    onChange={(e) => setStockNo(e.target.value)}
                    autoFocus
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="stockName">
                  <Form.Label>Stock Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="stockName"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="ourPrice">
                  <Form.Label>Our Price </Form.Label>
                  <Form.Control
                    type="number"
                    name="ourPrice"
                    min={0}
                    value={ourPrice}
                    onChange={(e) => setOurPrice(Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="marketPrice">
                  <Form.Label>Market Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="marketPrice"
                    min={0}
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    min={0}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="cgst">
                  <Form.Label>CGST </Form.Label>
                  <Form.Control
                    type="number"
                    name="cgst"
                    min={0}
                    value={cgst}
                    onChange={(e) => setCgst(Number(e.target.value))}
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
                    min={0}
                    value={sgst}
                    onChange={(e) => setSgst(Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="discount">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    value={discount}
                    min={0}
                    onChange={(e) => setDiscount(Number(e.target.value))}
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

export default Stock;
