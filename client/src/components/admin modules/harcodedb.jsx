export const item = {
  transaction_details: [
    {
      transaction_info: {
        paypal_account_id: "KEFTLNWQLKSGJ",
        transaction_id: "8KH18346FX744384P",
        transaction_event_code: "T0006",
        transaction_initiation_date: "2022-04-07T05:12:08+0000",
        transaction_updated_date: "2022-04-07T05:12:08+0000",
        transaction_amount: {
          currency_code: "USD",
          value: "10.99",
        },
        fee_amount: {
          currency_code: "USD",
          value: "-1.04",
        },
        transaction_status: "S",
        transaction_subject: "Veneficios vip del usuarioF",
        ending_balance: {
          currency_code: "USD",
          value: "5009.95",
        },
        available_balance: {
          currency_code: "USD",
          value: "5009.95",
        },
        protection_eligibility: "01",
        instrument_type: "CREDITCARD",
        instrument_sub_type: "M",
      },
    },
  ],
  account_number: "WQHC6Z4DYEDVW",
  start_date: "2022-04-06T00:00:00+0000",
  end_date: "2022-04-16T00:59:59+0000",
  last_refreshed_datetime: "2022-04-16T00:59:59+0000",
  page: 1,
  total_items: 71,
  total_pages: 71,
  links: [
    {
      href: "https://api.sandbox.paypal.com/v1/reporting/transactions?end_date=2022-04-18T00%3A00%3A00Z&start_date=2022-04-06T00%3A00%3A00Z&page_size=1&page=71",
      rel: "last",
      method: "GET",
    },
    {
      href: "https://api.sandbox.paypal.com/v1/reporting/transactions?end_date=2022-04-18T00%3A00%3A00Z&start_date=2022-04-06T00%3A00%3A00Z&page_size=1&page=2",
      rel: "next",
      method: "GET",
    },
    {
      href: "https://api.sandbox.paypal.com/v1/reporting/transactions?end_date=2022-04-18T00%3A00%3A00Z&start_date=2022-04-06T00%3A00%3A00Z&page_size=1&page=1",
      rel: "self",
      method: "GET",
    },
  ],
};
