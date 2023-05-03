import { Button } from "@nextui-org/react";
import React from "react";

const ChangeSet = ({ isEdit }) => {
  if (isEdit) {
    return (
      <div className={isEdit ? "is-change is-change-visible" : "is-change"}>
        <h3>Modification</h3>
        <p>
          Vous avez des modifications en cours, actualisez la page pour les
          appliquer.
        </p>
        <Button onPress={() => window.location.reload()}>Actualiser</Button>
      </div>
    );
  }
};

export default ChangeSet;
