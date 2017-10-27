/* ------ ZODAKA URL ------ */

export const ZODAKA_API_BASE_URL = process.env.ZODAKA_API_BASE_URL || 'https://sandbox.zodaka.com/api/orders'

/* ------ REQUEST AUTH HEADERS ------ */

/**
 * The headers of 'X-Zodaka-Application-Token' and 'X-Zodaka-Merchant-Token' are required
 * for your server to access the Zodaka Payments API.
 *
 * Tokens for your production environment are included in your welcome email.
 * In the future, you will be able to create merchant tokens on the Zodaka Merchant Client.
 *
*/
export const ZODAKA_API_TOKENS_HEADERS = {
  headers: {
    'X-Zodaka-Application-Token': process.env.ZODAKA_APPLICATION_TOKEN,
    'X-Zodaka-Merchant-Token': process.env.ZODAKA_MERCHANT_TOKEN
  }
}
