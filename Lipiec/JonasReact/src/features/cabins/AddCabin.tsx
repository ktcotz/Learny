import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="cabins-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabins-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};
