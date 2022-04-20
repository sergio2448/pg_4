import StatusCard from "./StatusCard";
import Nav from "../Nav";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getTransactions } from "../../redux/actions";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import houseBackground from '../../styles/images/house-back.jpg';

export default function Dashadmin() {

  const transactions = useSelector((state) => state.transactions);
  const userDB = useSelector((state) => state.user)
  var adminEmail = userDB.user.email;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions(adminEmail));
  }, []);
  return (
    < div className="bg-sky-800">
      <div className='z-1 absolute bg-black w-full h-screen shadow-black shadow-2xl'>
                <img className='opacity-60 z-2 object-cover w-full h-full blur-sm' src={houseBackground} />
            </div>
            <div className='relative z-6'>
                <div className=' relative z-20 '>
                    <Nav />
                </div>
            </div>
      <div className="px-3 md:px-8 h-40 relative" />

      <div className="px-3 md:px-8 -mt-24 relative">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14"></div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14"></div>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 relative">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 z-10 lg:grid-cols-2 xl:grid-cols-4 mb-4">
            <StatusCard
              color="blue"
              icon="trending_up"
              title="Transactions"
              amount={
                Object.keys(transactions).length !== 0
                  ? transactions.total_items
                  : 0
              }
              percentage="3.48"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Total transactions"
            />
            <StatusCard
              color="blue"
              icon="paid"
              title="Sales"
              amount={
                Object.keys(transactions).length !== 0
                  ? transactions.transaction_details
                      .map((item) =>
                        parseFloat(
                          item.transaction_info.transaction_amount.value
                        )
                      )
                      .reduce((prev, curr) => prev + curr, 0)
                      .toFixed(2)
                  : 0
              }
              percentage="1.10"
              percentageIcon="arrow_upward"
              percentageColor="orange"
              date="Total sales"
            />
            <StatusCard
              color="blue"
              icon="poll"
              title="CREDITCARD"
              amount={
                Object.keys(transactions).length !== 0
                  ? (transactions.transaction_details.filter(
                      (item) =>
                        item.transaction_info.instrument_type === "CREDITCARD"
                    ).length /
                      73) *
                      100 +
                    "%"
                  : 0 + "%"
              }
              date="Card type percentage"
            />
            <StatusCard
              color="blue"
              icon="poll"
              title="DEBITCARD"
              amount={
                Object.keys(transactions).length !== 0
                  ? (transactions.transaction_details.filter(
                      (item) =>
                        item.transaction_info.instrument_type === "DEBITCARD"
                    ).length /
                      73) *
                      100 +
                    "%"
                  : 0 + "%"
              }
              date="Card type percentage"
            />
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto relative">
        <div className="container mx-auto max-w-full">
          <div className="">
            <div className="px-0 mb-14 pb-16">
              <Card>
                <CardHeader color="blue" contentPosition="none">
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Transaction Info</h2>
                    <Button
                      color="transparent"
                      buttonType="link"
                      size="lg"
                      style={{ padding: 0 }}
                    >
                      See More
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            Transaction ID
                          </th>
                          <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            Amount (USD)
                          </th>
                          <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            Status
                          </th>
                          <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            Instrument Type
                          </th>
                          <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            Initiation
                          </th>
                          <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            Updated
                          </th>
                        </tr>
                      </thead>
                      {Object.keys(transactions).length !== 0
                        ? transactions.transaction_details.map(
                            (transaction) => (
                              <tbody>
                                <tr>
                                  <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {
                                      transaction.transaction_info
                                        .transaction_id
                                    }
                                  </th>

                                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {
                                      transaction.transaction_info
                                        .transaction_amount.value
                                    }
                                  </td>

                                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {
                                      transaction.transaction_info
                                        .transaction_status
                                    }
                                  </td>

                                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {
                                      transaction.transaction_info
                                        .instrument_type
                                    }
                                  </td>
                                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {
                                      transaction.transaction_info
                                        .transaction_initiation_date
                                    }
                                  </td>

                                  <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    {
                                      transaction.transaction_info
                                        .transaction_updated_date
                                    }
                                  </td>
                                </tr>
                              </tbody>
                            )
                          )
                        : null}
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
