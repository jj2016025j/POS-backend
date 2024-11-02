
async function getOrderInfo(orderId) {
    const [orders] = await pool.query(`SELECT id, trade_no, trade_amt FROM table_orders WHERE id = ?`, [orderId]);
    if (orders.length === 0) throw new Error("Order not found");
    return orders[0];
}


// module.exports = orderOperations;

  //一鍵結帳全部

// OneClickCheckoutAll: () => {
//     return new Promise((resolve, reject) => {
//       pool.query(
//         UPDATE table_orders 
//                  SET food_price = ?, 
//                  service_fee = ?, 
//                  trade_amt = ?, 
//                  order_status = ?, 
//                  payment_at = CURRENT_TIMESTAMP 
//                  WHERE order_status = ?,
//         [0, 0, 0, 2, 1], (error, results) => {
//           if (error) {
//             reject(error);
//             return;
//           }
//           // console.log(results);
//           resolve(results);
//         });
//     });
//   },  //完成現金付款
//   confirmPaymentByCash: (order_id) => {
//     return new Promise(async (resolve, reject) => {
//       console.log("取得訂單資訊 ")
//       const order = await pool.getOrderById(order_id);
//       const order_foods = await pool.getOrderFoods(order_id);
//       console.log("檢查是否有資料 ")
//       if (order && order_foods.length) {
//         console.log("有資料，整理結帳後訂單所需資訊")
//         const food_price = order_foods.map((x) => x.quantity * x.unit_price).reduce((x, y) => x + y, 0);
//         const service_fee = Math.round(food_price * 10 / 100);
//         const trade_amt = food_price + service_fee;
//         const order_status = 2;
//         console.log("改變訂單狀態為以結帳 ")
//         pool.query('UPDATE table_orders SET food_price = ?, service_fee = ?, trade_amt = ?, order_status = ?, payment_at = CURRENT_TIMESTAMP WHERE id = ?', [food_price, service_fee, trade_amt, order_status, order_id], (error, results) => {
//           if (error) {
//             reject(error);
//             return;
//           }
//           resolve(true);
//         });
//       } else {
//         reject('查無訂單或訂單無品項')
//         return
//       }
//     })

//   },