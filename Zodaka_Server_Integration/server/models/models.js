import axios from 'axios'
import uuid from 'uuid/v1'

import { mockDatabase } from './mockDatabase'

import {
  ZODAKA_API_BASE_URL,
  ZODAKA_API_TOKENS_HEADERS
} from './constants'

/**
 * This is a sample Zodaka Payments API interface.
 *
 * In the REMOTE-E-COMMERCE flow for the merchant
 * server, one needs to only create a new order and verify it.
 * The status route may be used to check for payment completion.
 *
 */

class ZodakaAPI {
  async newOrder(amount) {
    /**
     * The newOrderRequestBody is the required body keys and values
     * to create a new order in the Zodaka System.
     */
    const newOrderRequestBody = {
      merchant_id: 1,
      merchant_order_value: amount,
      merchant_callback_url: process.env.MERCHANT_CALLBACK_URL || 'https://mjdemo-remote.zodaka.com/callback',
      merchant_order_id: uuid(),
      merchant_order_metadata: { some_data: 'data' },
      merchant_order_type: 'REMOTE-E-COMMERCE'
    }

    try {
      /**
       * POST request with appropriate headers and body for the
       * Zodaka Payments API.
      */
      const { data: order } = await axios.post(
        ZODAKA_API_BASE_URL,
        newOrderRequestBody,
        ZODAKA_API_TOKENS_HEADERS
      )
      
      /**
       * New order response from the Zodaka API is console logged
       * for easy viewing during test integration.
      */
      console.log('New order :::- ', order)

      /**
       * This mockDatabase is just that, a mock. The intention here
       * is to show that the order information will need to be saved
       * for future retrieval in the manner the merchant deems fit
       * for their backend.
       */
      mockDatabase.save(order)

      return { token: order.order_token }

    } catch (error) {
      console.log('Error occured:', error.message)
      throw error
    }
  }

  async verifyOrder(token) {
    /**
     * The verifyOrderRequestBody is the required body key and value
     * to verify an order in the Zodaka System.
     */
    const verifyOrderRequestBody = {
      merchant_id: 1
    }

    /* Zodaka API endpoint to hit for verification */
    const ZODAKA_VERIFY_URL = `${ZODAKA_API_BASE_URL}/${token}/verify`

    try {
      /**
       * PATCH request with appropriate headers and body to the
       * Zodaka Payments API.
       */
      const { data: verification } = await axios.patch(
        ZODAKA_VERIFY_URL,
        verifyOrderRequestBody,
        ZODAKA_API_TOKENS_HEADERS
      )

      /**
       * The order verification response is console logged for easy viewing
       * during test integration.
       */
      console.log('Verification details :::- ', verification)

      /* Mock database call to imitate update of relevant data */
      mockDatabase.update(
        token,
        verification
      )

      /* Fake return for demo purposes. */
      return true

    } catch (error) {
      console.log('Error occured:', error.message)
      throw error
    }
  }

  async orderStatusFor(token) {
    /* Zodaka API endpoint to hit for order status */
    const ZODAKA_ORDER_STATUS_URL = `${ZODAKA_API_BASE_URL}/${token}/status`

    try {
      /* Getting the order status, no auth headers required */
      const { data: orderStatus } = await axios.get(ZODAKA_ORDER_STATUS_URL)

      /**
       * The order status response is console logged for easy viewing
       * during test integration.
       */
      console.log('Order status details :::- ', orderStatus)

      /* Mock database call to imitate update of relevant data */
      mockDatabase.update(
        token,
        orderStatus
      )

      return orderStatus.payment_completed

    } catch (error) {
      console.log('Error occured :', error.message)
      throw error
    }
  }
}

export const zodakaAPI = new ZodakaAPI()