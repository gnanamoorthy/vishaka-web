import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { api, gridStyle } from "../../constant/constant";
import paymentService from "../../service/PaymentService";
import { timeStampToDate } from "../../utils";

const PaymentPaidTable = () => {
  const [paymentList, setPaymentList] = useState([]);
  const loadPaidPayments = async () => {
    const response = await paymentService.getPaidPayments();
    if (response.success) {
      setPaymentList(response.data.paidPaymentList);
    }
  };

  const viewInvoice = (data: any) => {
    window.open(api.baseUrl + "invoice/view/" + data.invoiceNo);
  };

  useEffect(() => {
    loadPaidPayments();
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
      name: "paymentType",
      header: "Payment Mode",
      defaultFlex: 1,
    },
    {
      name: "paidDate",
      header: "Paid Date",
      defaultFlex: 1,
      render: ({ data }: any) => {
        return timeStampToDate(data.paidDate);
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
    </>
  );
};

export default PaymentPaidTable;
