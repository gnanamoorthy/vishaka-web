import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getFormJSON } from "../utils/utils";
import invoiceService from "../service/invoiceService";
import stockService from "../service/stockService";
import { toast } from "../utils";
import { APIResponse, TClient, TStock } from "../types";
import { InvoiceTemplate } from "../components/InvoiceTemplate";
import { InvoiceModal } from "../components/InvoiceModal";
import { api } from "../constant/constant";
const Invoice = () => {
  const [clientList, setClientList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [modelShow, setModelShow] = useState(false);

  const getClientNames = async () => {
    const response = await invoiceService.getAllClient();
    if (response.success) {
      setClientList(response.data.clientList);
    }
  };

  const getAllStock = async () => {
    const response = await stockService.getAllStock();
    if (response.success) {
      setStockList(
        response.data.stockList.map((data: any) => {
          return {
            value: data.id,
            label: data.stockName,
            ...data,
          };
        })
      );
    }
  };

  const getAllInvoice = async () => {
    const response = await invoiceService.getAllInvoice();
    if (response.success) {
      setInvoiceList(response.data.invoiceList);
    }
  };
  const viewInvoice = (data: any) => {
    window.open(api.baseUrl + "invoice/view/" + data.invoiceNo);
  };
  const downloadInvoice = (data: any) => {
    window.open(api.baseUrl + "invoice/download/" + data.invoiceNo);
  };

  useEffect(() => {
    getClientNames();
    getAllStock();
    getAllInvoice();
  }, []);

  const handleClose = async () => {
    setModelShow(false);
    getAllInvoice();
  };
  const handleShow = () => {
    setModelShow(true);
  };

  const gridStyle = { minHeight: 550, marginTop: 10 };

  const columns = [
    { name: "invoiceNo", header: "Invoice No", defaultFlex: 1 },
    {
      name: "client",
      header: "To",
      render: ({ data }: any) => {
        return data.client.name;
      },
    },
    {
      name: "date",
      header: "Date",
      defaultWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "orderDate",
      header: "Order Date",
      //minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "dispatchedDate",
      header: "Dispatched Date",
      //minWidth: 100,
      defaultFlex: 1,
    },
    {
      name: "netAmount",
      header: "Total",
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
            <Button
              className="button btn-secondary"
              onClick={() => viewInvoice(data)}
            >
              View
            </Button>
            <Button className="button" onClick={() => downloadInvoice(data)}>
              Download
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="page-heading">
        <span className="heading">Manage Invoice</span>
        <Button
          className="button"
          variant="primary"
          size="lg"
          onClick={handleShow}
        >
          New invoice
        </Button>
      </div>
      <div className="table-container">
        <ReactDataGrid
          idProperty="id"
          columns={columns}
          dataSource={invoiceList}
          style={gridStyle}
          pagination
          defaultLimit={10}
        />
      </div>
      <InvoiceModal
        modelShow={modelShow}
        handleClose={handleClose}
        clientList={clientList}
        stockList={stockList}
      />
    </>
  );
};

export default Invoice;
