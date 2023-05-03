import { Button, Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSalary } from "../actions/user.action";

const SalarySet = () => {
  const dispatch = useDispatch();
  const salaryDefault = useSelector((state) => state.user.current.salary);
  const salaryRef = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();

    const salary = salaryRef.current.value;
    dispatch(setSalary(salary));
  };

  if (salaryDefault === 0) {
    return (
      <div className="salary-set-overlay">
        <div className="salary-set">
          <h1>Salaire</h1>
          <form onSubmit={handleUpdate}>
            <Input
              aria-label="salary"
              labelLeft={<i className="fa-solid fa-euro-sign"></i>}
              placeholder="Indiquez votre salaire"
              ref={salaryRef}
            />
            <Button type="submit" color="success" auto ghost>
              Valider
            </Button>
          </form>
        </div>
      </div>
    );
  }
};

export default SalarySet;
