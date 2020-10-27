import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import qrcode from "../../../images/qr-code.svg";

import "./styles.css";
function QRPayment({
  isShowQRModal,
  handleHideQRModal,
  handleCompleteQR,
  qrModalData,
}) {
 
  return (
    <Modal show={isShowQRModal} onHide={handleHideQRModal}>
      <Modal.Header closeButton>
        <Modal.Title>Quét mã QR Code </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-qr-code">
          <img src={qrcode} alt="" />
          {qrModalData.type === "qr" ? (
            <p>
              Sử dụng tính năng Thanh toán bằng QRCode trên ứng dụng Mobile
              Banking của các ngân hàng để quét mã QRCode này. Sau đó nhấn "Xác
              Nhận Giao Dịch" để được cộng tiền.
            </p>
          ) : (
            <div>
              <p>
                Số điện thoại:<b>0123456789</b>{" "}
              </p>
              <p>
                Tên tài khoản: <b>Phạm Đình Hoài</b>
              </p>

              <p>
                Số tiền cần thanh toán:<b>{qrModalData.input} VNĐ</b>{" "}
              </p>
              <div className="form-group row">
                <p>
                  Sau khi chuyển tiền sẽ nhận được mã giao dịch từ Momo, nhập mã
                  vào đây để hoàn thành nạp coin
                </p>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mã giao dịch"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          variant="primary"
          onClick={() => {
            handleCompleteQR(qrModalData);
          }}
        >
          Xác nhận đã giao dịch
        </Button>
        <Button variant="secondary" onClick={() => handleHideQRModal()}>
          Hủy bỏ giao dịch
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRPayment;
