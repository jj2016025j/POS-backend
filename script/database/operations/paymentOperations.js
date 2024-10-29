
async function getOrderInfo(orderId) {
    const [orders] = await pool.query(`SELECT id, trade_no, trade_amt FROM table_orders WHERE id = ?`, [orderId]);
    if (orders.length === 0) throw new Error("Order not found");
    return orders[0];
}


module.exports = orderOperations;