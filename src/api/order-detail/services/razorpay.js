const Razorpay = require('razorpay');

module.exports = {
  createOrder: async (amount) => {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);  // Log the error for debugging
      throw new Error(`Failed to create Razorpay order: ${error.message}`);
    }
  },
};
