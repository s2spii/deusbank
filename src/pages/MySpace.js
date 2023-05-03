import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Chart from "react-google-charts";
import EditGraphic from "../components/EditGraphic";

const MySpace = () => {
  const bills = useSelector((state) => state.bills);
  const salaryValue = useSelector((state) => state.user.current.salary);
  const [data, setData] = useState([["Mes factures", "Prix"]]);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    let salary = salaryValue;
    const newData = [["Mes factures", "Prix"]];

    bills.forEach((bill) => {
      newData.push([bill.typeOfBill, bill.costofBill]);
      salary -= bill.costofBill;
    });

    if (salary < 0) {
      salary = 0;
    }

    newData.push(["Argent Restant", salary]);
    setData(newData);
  }, [bills, salaryValue]);

  return (
    <>
      <Header isEdit={isEdited} setIsEdit={setIsEdited} />
      <div className="my-space">
        <div className="graphic">
          <Chart
            key={data}
            className="rect"
            chartType="PieChart"
            data={data}
            options={{ title: "Mes factures" }}
            width={"500px"}
            height={"500px"}
          />
        </div>
        <EditGraphic setIsEdit={setIsEdited} />
      </div>
    </>
  );
};

export default MySpace;
