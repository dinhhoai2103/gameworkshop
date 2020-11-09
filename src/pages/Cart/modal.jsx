import React from "react";
import { Button, Modal } from "react-bootstrap";
import history from "../../util/history";

import "./styles.css";
function CartModal({
  isShowModal,
  handleHideModal,
  modalData,
  handleCompletePayment,
}) {
  return (
    <Modal show={isShowModal} onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán giỏ hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalData.money < 0
          ? "Tài khoản không đủ tiền vui lòng nạp thêm"
          : "Xác nhận giao dịch và thanh toán"}
      </Modal.Body>
      <Modal.Footer>
        {modalData.money < 0 ? (
          <Button
            type="submit"
            variant="danger"
            onClick={() => history.push("/payment")}
          >
            Nạp tiền
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            onClick={() => handleCompletePayment(modalData)}
          >
            Xác nhận giao dịch
          </Button>
        )}

        <Button variant="secondary" onClick={() => handleHideModal()}>
          Hủy bỏ giao dịch
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
