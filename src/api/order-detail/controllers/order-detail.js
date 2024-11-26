"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::order-detail.order-detail",
  ({ strapi }) => ({
    /**
     * Override the default `create` method
     */
    async create(ctx) {
      try {
        // Step 1: Create the order detail using the default create method
        const { data, meta } = await super.create(ctx);

        // Log the created data to verify the structure
        console.log("Created Order Data:", data);

        // Get the total amount from the created order detail
        const totalAmount = data?.total;

        if (!totalAmount) {
          return ctx.badRequest(
            "Total amount is required to create a Razorpay order."
          );
        }

        // Step 2: Call the Razorpay service to create an order
        const razorpayService = strapi.service("api::order-detail.razorpay");
        const razorpayOrder = await razorpayService.createOrder(totalAmount);

        // Step 3: Update the created order detail with the Razorpay order ID
        const updatedEntity = await strapi.entityService.update(
          "api::order-detail.order-detail",
          data.id,
          {
            data: {
              razorpayOrderId: razorpayOrder.id,
            },
          }
        );

        // Return the updated entity with meta data
        return { data: updatedEntity, meta };
      } catch (error) {
        strapi.log.error("Error creating Razorpay order:", error);
        return ctx.internalServerError("Failed to create Razorpay order.");
      }
    },
  })
);
