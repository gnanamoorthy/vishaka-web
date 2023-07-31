export type Login = {
  username: string;
  passwprd: string;
};
export type TStock = {
  id: number;
  stockName: string;
  stockNo: string;
  ourPrice: number;
  marketPrice: number;
  quantity: number;
  cgst: number;
  sgst: number;
  discount: number;
};

export type TClient = {
  id: number;
  name: string;
  address: string;
  gstNo: string;
  phoneNo: number;
  altPhoneNo: number;
};
export interface APIResponse {
  status: number;
  success: boolean;
  message: string;
  data: any;
}
export type StockSelect = {
  value: string;
  label: string;
  id?: number;
  stockName?: string;
  stockNo?: string;
  ourPrice?: number;
  marketPrice?: number;
  quantity?: number;
  cgst?: number;
  sgst?: number;
  discount?: number;
};

export type InvoiceForm = {
  invoiceNo: string;
  invoiceTo: string;
  orderDate: string;
  orderNo: string;
  paymentType: string;
  dispatchedThrough: string;
  dispatchedDate: string;
  termsOfDelivery: string;
  item: any;
};
