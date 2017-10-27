class MockDatabase {
  orders = {}

  save(order) {
    const { order_token, ...orderDetails} = order
    this.orders[order_token] = orderDetails
  }

  update(token, fields) {
    const orderToUpdate = this.orders[token]
    this.orders[token] = { ...orderToUpdate, ...fields }
  }
}

export const mockDatabase = new MockDatabase()