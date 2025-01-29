const { initiatePayment, confirmPayment } = require("./services/linePay");
const { getPayRequestStatus } = require("./services/linePayStatus");

async function main() {
  try {
    const paymentUrl = await initiatePayment("test_order_1", 100);
    console.log("Payment URL:", paymentUrl);
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }
  
  setTimeout(async () => {
    try {
      const status = await getPayRequestStatus("test_order_1");
      console.log("Payment status:", status);
    } catch (error) {
      console.error("Payment status check failed:", error);
    }
  }, 2000);
}

main();
