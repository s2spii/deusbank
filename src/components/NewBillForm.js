import { Input, Button } from "@nextui-org/react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newBills } from "../actions/bills.action";

const NewBillForm = ({ setIsEdit }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.current.id);
  const nameRef = useRef();
  const costRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const cost = costRef.current.value;

    dispatch(newBills({ id, name, cost }));
    setIsEdit(true);
  };

  return (
    <form className="bill-form" onSubmit={handleForm}>
      <h1>Ajouter</h1>
      <Input
        labelLeft={<i className="fa-sharp fa-solid fa-sheet-plastic"></i>}
        placeholder="Loyer"
        ref={nameRef}
        aria-label="name"
      />
      <Input
        labelLeft={<i className="fa-solid fa-euro-sign"></i>}
        placeholder="500€"
        ref={costRef}
        aria-label="cost"
      />

      <Button color="primary" ghost type="submit">
        Ajouter une facture
      </Button>
    </form>
  );
};

export default NewBillForm;
