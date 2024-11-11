const { requestOfflineAPI } = require("./linePayUtils");

let intervalId = null;

async function getPayRequestStatus(orderId) {
  if (!orderId) throw new Error("Order ID is required!");

  const response = await requestOfflineAPI({
    method: "GET",
    apiPath: `/v2/payments/orders/${orderId}/check`,
  });

  switch (response.info.status) {
    case "AUTH_READY":
      console.log("In progress");
      break;
    case "COMPLETE":
      console.log("Finished");
      clearInterval(intervalId);
      break;
    case "CANCEL":
      console.log("Cancelled");
      clearInterval(intervalId);
      break;
    case "FAIL":
      console.log("Failed");
      clearInterval(intervalId);
      break;
    default:
      console.log("Unknown status");
      clearInterval(intervalId);
  }
}

module.exports = { getPayRequestStatus };
