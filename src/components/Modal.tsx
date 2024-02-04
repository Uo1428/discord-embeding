import React, { FunctionComponent } from "react";
import { Modal, Button, Text } from "@nextui-org/react";
//import { URL } from "../lib/constants";

type Props = {
  modalContent: {
    text: string;
    button: string;
    url?: string;
  };
  visible: boolean;
  closeHandler: () => void;
};

const SuccessModal: FunctionComponent<Props> = ({
  modalContent,
  visible,
  closeHandler
}) => {
  return (
    <>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text h3>
            {modalContent.text}
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button
            auto
            onClick={() => {
              closeHandler();
              {modalContent.url && navigator.clipboard.writeText(modalContent.url)}
            }}
          >
            {modalContent.button}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuccessModal;
