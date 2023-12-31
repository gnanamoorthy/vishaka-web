import React, { useEffect, useState } from "react";
import { Accordion, Card, Tab, Row, Col, Nav } from "react-bootstrap";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PaymentPendingTable from "../components/table/PaymentPendingTable";
import PaymentPaidTable from "../components/table/PaymentPaidTable";
const Payment = () => {
  const [key, setKey] = React.useState<any>("pending");

  const loadTable = (key: any) => {
    switch (key) {
      case "pending":
        return <PaymentPendingTable />;
      case "paid":
        return <PaymentPaidTable />;
      default:
        return <PaymentPendingTable />;
    }
  };
  return (
    <div>
      <Accordion className="custom-accordion" defaultActiveKey="0">
        <Card className="accordion-card">
          <Card.Header className="accordion-card-header">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="accordion-header-text">Payments</span>
              </Accordion.Header>
            </Accordion.Item>
          </Card.Header>
          <Tab.Container
            unmountOnExit={true}
            activeKey={key}
            onSelect={(k) => {
              console.log(k);
              setKey(k);
            }}
          >
            <Row>
              <Col>
                <Nav>
                  <Nav.Item>
                    <Nav.Link eventKey="pending">
                      <ChevronRightIcon /> Pending
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="paid">
                      <ChevronRightIcon /> Paid
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Tab.Container>
        </Card>
      </Accordion>
      <div className="table-container">{loadTable(key)}</div>
    </div>
  );
};

export default Payment;
