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
  };

  const resetForm = async () => {
    setStockId(0);
    setStockNo("");
    setMarketPrice(0);
    setStockName("");
    setOurPrice(0);
    setQuantity(0);
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
    { name: "stockName", header: "Stock Name ", defaultFlex: 1 },
    { name: "stockNo", header: "Opening Stock No", defaultFlex: 1 },
    {
      name: "ourPrice",
      header: "Our Price",
      defaultWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "marketPrice",
      header: "Market Price ",
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
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
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
