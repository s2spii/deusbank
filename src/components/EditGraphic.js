import { Button, Collapse, Input, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import NewBillForm from "./NewBillForm";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { deleteBill, editBills } from "../actions/bills.action";

const EditGraphic = ({ setIsEdit }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const bills = useSelector((state) => state.bills);
  const salary = useSelector((state) => state.user.current.salary);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();

  const handler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteBill(id));
    setIsEdit(true);
  };

  const handleEdit = (id) => {
    const bill = {
      id,
      name,
      price,
    };

    dispatch(editBills(bill));
    setIsEdit(true);
  };

  return (
    <div className="edit-graphic">
      <div className="top-infos">
        <h2>Modifier</h2>
        <h4>Salaire: {salary}</h4>
      </div>
      <Collapse.Group>
        {!isEmpty(bills) &&
          bills.map((bill) => (
            <Collapse key={bill.id} title={bill.typeOfBill}>
              <div className="form-edit-group">
                <Input
                  labelLeft={<i className="fa-solid fa-tag"></i>}
                  placeholder={bill.typeOfBill}
                  aria-label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  labelLeft={<i className="fa-solid fa-euro-sign"></i>}
                  placeholder={bill.costofBill.toLocaleString() + "€"}
                  aria-label="cost"
                  contentRight={
                    <Button
                      color="success"
                      auto
                      style={{ transform: "translateX(-45%)" }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                  }
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="my-space-button">
                  <Button.Group ghost color="primary">
                    <Button onPress={() => handleEdit(bill.id)} auto>
                      Modifier
                    </Button>
                    <Button onPress={() => handleDelete(bill.id)}>
                      Supprimer
                    </Button>
                  </Button.Group>
                </div>
              </div>
            </Collapse>
          ))}
      </Collapse.Group>

      <Button onPress={handler} color="primary" ghost>
        Ajouter
      </Button>
      <Modal aria-label="New-bill" open={open} onClose={closeHandler}>
        <NewBillForm setIsEdit={setIsEdit} />
      </Modal>
    </div>
  );
};

export default EditGraphic;
