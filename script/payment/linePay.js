const axios = require("axios");
const { LINEPAY_SITE, LINEPAY_VERSION, LINEPAY_RETURN_HOST, LINEPAY_RETURN_CONFIRM_URL, LINEPAY_RETURN_CANCEL_URL } = require("../config");
const { createHeaders } = require("./linePayUtils");

async function initiatePayment(orderId, amount = 100) {
  const uri = "/payments/request";
  const body = {
    amount,
    currency: "TWD",
    orderId,
    packages: [
      {
        id: "package-1",
        amount,
        name: "Sample Package",
        products: [{ id: "product-1", productName: "Sample Product", quantity: 1, price: amount }],
      },
    ],
    redirectUrls: {
      confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
      cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
    },
  };
  
  const headers = createHeaders(uri, body);
  const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
  const response = await axios.post(url, body, { headers });
  
  if (response.data.returnCode === "0000") {
    return response.data.info.paymentUrl.web;
  } else {
    throw new Error("LinePay request failed");
  }
}

async function confirmPayment(transactionId, amount = 100) {
  const uri = `/payments/${transactionId}/confirm`;
  const body = { amount, currency: "TWD" };
  const headers = createHeaders(uri, body);
  const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
  
  const response = await axios.post(url, body, { headers });
  if (response.data.returnCode === "0000") {
    return response.data;
  } else {
    throw new Error("LinePay confirmation failed");
  }
}

module.exports = { initiatePayment, confirmPayment };
