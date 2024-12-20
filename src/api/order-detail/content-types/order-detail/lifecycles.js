module.exports = {
    beforeCreate(event) {
      const { data } = event.params;
      if (!data.orderItems || data.orderItems.length === 0) {
        throw new Error("Each order detail must have at least one order item.");
      }
    },
  };
  