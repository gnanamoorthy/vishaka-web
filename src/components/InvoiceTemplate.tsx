import React from "react";
export const InvoiceTemplate = () => {
  return (
    <div className="cs-container">
      <div className="cs-invoice cs-style1">
        <div className="cs-invoice_in" id="download_section">
          <div className="cs-invoice_head cs-type1 cs-mb25">
            <div className="cs-invoice_left">
              <p className="cs-invoice_number cs-primary_color cs-mb0 cs-f16">
                <b className="cs-primary_color">Invoice No:</b> #SM75692
              </p>
            </div>
            <div className="cs-invoice_right cs-text_right">
              <div className="cs-logo cs-mb5">
                <img
                  src="assets/img/logo.jpg"
                  width="200px"
                  height="150px"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
          <div className="cs-invoice_head cs-mb10">
            <div className="cs-invoice_left">
              <b className="cs-primary_color">VISHAKA MEDICAL INDUSTRIES</b>
              <p className="cs-mb8">
                5/83,E3, <br />
                Janarthanan Nagar ,<br />
                Mettupalayam Coimbatore - 641301
              </p>
            </div>
            <div className="cs-invoice_right cs-text_right">
              <b className="cs-primary_color">IVONNE HOSPITAL</b>
              <p>
                237 Roanoke Road, North York, <br />
                Ontario, Canada <br />
                demo@email.com <br />
                +1-613-555-0141
              </p>
            </div>
          </div>
          <div className="cs-heading cs-style1 cs-f18 cs-primary_color cs-mb25 cs-semi_bold">
            Patient Information
          </div>
          <ul className="cs-grid_row cs-col_3 cs-mb5">
            <li>
              <p className="cs-mb20">
                <b className="cs-primary_color">Date:</b> <br />
                <span className="cs-primary_color">Micle Richard</span>
              </p>
              <p className="cs-mb20">
                <b className="cs-primary_color">Delivery Note:</b> <br />
                <span className="cs-primary_color">
                  32 Years Old - 22 July 1991
                </span>
              </p>
              <p className="cs-mb20">
                <b className="cs-primary_color">Mode/Terms of Paymentd:</b>
                <br />
                <span className="cs-primary_color">WPS</span>
              </p>
            </li>
            <li>
              <p className="cs-mb20">
                <b className="cs-primary_color">Order No:</b> <br />
                <span className="cs-primary_color">123456789</span>
              </p>
              <p className="cs-mb20">
                <b className="cs-primary_color">Order Date:</b> <br />
                <span className="cs-primary_color">Dental Treatment</span>
              </p>
              <p className="cs-mb20">
                <b className="cs-primary_color">Dispatched Date:</b> <br />
                <span className="cs-primary_color">25 Feb 2022</span>
              </p>
            </li>
            <li>
              <p className="cs-mb20">
                <b className="cs-primary_color">Dispatched Through:</b> <br />
                <span className="cs-primary_color">
                  4 Balmy Beach Road, Owen Sound, Ontario, Canada
                </span>
              </p>
              <p className="cs-mb20">
                <b className="cs-primary_color">Terms Of Delivery:</b> <br />
                <span className="cs-primary_color">-</span>
              </p>
            </li>
          </ul>
          <div className="cs-table cs-style2">
            <div className="cs-round_border">
              <div className="cs-table_responsive">
                <table>
                  <thead>
                    <tr className="cs-focus_bg">
                      <th className="cs-semi_bold cs-primary_color">S.no</th>
                      <th className="cs-semi_bold cs-primary_color">
                        Discription Of Goods
                      </th>
                      <th className="cs-semi_bold cs-primary_color">
                        Quantity
                      </th>
                      <th className="cs-semi_bold cs-primary_color">
                        HSN Code
                      </th>
                      <th className="cs-semi_bold cs-primary_color">Rate</th>
                      <th className="cs-semi_bold cs-primary_color cs-text_right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">1</td>
                      <td className="cs-width_8">Dental Treatment</td>
                      <td className="cs-width_2">$60</td>
                      <td className="cs-width_2 cs-text_right cs-primary_color">
                        $60
                      </td>
                    </tr>
                    <tr>
                      <td className="">1</td>
                      <td className="cs-width_8">Bed Charge</td>
                      <td className="cs-width_2">$120</td>
                      <td className="cs-width_2 cs-text_right cs-primary_color">
                        $120
                      </td>
                    </tr>
                    <tr>
                      <td className="">1</td>
                      <td className="cs-width_8">Consultant Surgeon Fee</td>
                      <td className="cs-width_2">$25</td>
                      <td className="cs-width_2 cs-text_right cs-primary_color">
                        $25
                      </td>
                    </tr>
                    <tr>
                      <td className="">1</td>
                      <td className="cs-width_8">Medical Hospital Supply</td>
                      <td className="cs-width_2">$30</td>
                      <td className="cs-width_2 cs-text_right cs-primary_color">
                        $30
                      </td>
                    </tr>
                    <tr>
                      <td className="">1</td>
                      <td className="cs-width_8">Nursing Service Charge</td>
                      <td className="cs-width_2">$20</td>
                      <td className="cs-width_2 cs-text_right cs-primary_color">
                        $20
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="cs-table cs-style2">
            <div className="cs-table_responsive">
              <table>
                <tbody>
                  <tr className="cs-table_baseline">
                    <td className="cs-width_5">
                      <b className="cs-primary_color">Amount In Words:</b>
                      <br />
                      Credit Card - 236***************** <br />
                      Amount: $ 113 - Due: $ 0
                    </td>
                    <td className="cs-width_5 cs-text_right">
                      <p className="cs-mb5 cs-mb5 cs-f15 cs-primary_color cs-semi_bold">
                        SGST:
                      </p>
                      <p className="cs-mb5 cs-mb5 cs-f15 cs-primary_color cs-semi_bold">
                        CGST:
                      </p>
                      <p className="cs-primary_color cs-bold cs-f16 cs-m0">
                        Total Amount:
                      </p>
                    </td>
                    <td className="cs-width_2 cs-text_rightcs-f16">
                      <p className="cs-mb5 cs-mb5 cs-text_right cs-f15 cs-primary_color cs-semi_bold">
                        $13
                      </p>
                      <p className="cs-mb5 cs-mb5 cs-text_right cs-f15 cs-primary_color cs-semi_bold">
                        $13
                      </p>
                      <p className="cs-primary_color cs-bold cs-f16 cs-m0 cs-text_right">
                        $273
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="cs-invoice_head cs-mb10 acc">
            <div className="cs-invoice_left">
              <b className="cs-primary_color">Company Info</b>
              <p className="cs-mb8">
                PAN - DCKPK7308L <br />
                GST - 33DCKPK7308L1ZB
              </p>
            </div>
            <div className="cs-invoice_right cs-text_right">
              <b className="cs-primary_color">Account Details</b>
              <p>
                Vishaka Medical Industries <br />
                Acc No - 1188120020000193
                <br />
                IFSC - UJVN0001188 , <br />
                Bank - Ujjivan Small Finance Bank
              </p>
            </div>
          </div>
        </div>
        <div className="cs-invoice_btns cs-hide_print">
          <a
            href="javascript:window.print()"
            className="cs-invoice_btn cs-color1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <rect
                x="128"
                y="240"
                width="256"
                height="208"
                rx="24.32"
                ry="24.32"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <circle cx="392" cy="184" r="24" />
            </svg>
            <span>Print</span>
          </a>
          <button id="download_btn" className="cs-invoice_btn cs-color2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <title>Download</title>
              <path
                d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M176 272l80 80 80-80M256 48v288"
              />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
