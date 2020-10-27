import React, { useEffect, useState } from "react";
import history from "../../../util/history";
import banner from "../../../images/banner.png";
import user from "../../../images/user.svg";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ListInfo from "../ListInfo";
import QRPayment from "./QRPayment";
import { getUser, completePayment } from "../../../redux/actions";
import "antd/dist/antd.css";
import "./styles.css";
import { connect } from "react-redux";
import { Collapse } from "antd";
const { Panel } = Collapse;

function Payment({ completePayment, getUser }) {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(localStorage.key(0))))
    getUser({
      email: JSON.parse(localStorage.getItem(localStorage.key(0))).email
    });
  }, []);
  function format2(n) {
    return  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [isShowQRModal, setIsShowQRModal] = useState(false);
  const [qrModalData, setQrModalData] = useState({});
  const handleShowQRModal = (type, values, item) => {
    setIsShowQRModal(true);
    setQrModalData({
      type: type,
      input: values.money,  
      money: values.money + item.money,
      id: item.id,
    });
  };
  const handleHideQRModal = () => {
    setIsShowQRModal(false);
    setQrModalData({});
  };
  const handleCompleteQR = (item) => {
    completePayment({
      money: item.money,
      id: item.id
    });
    setIsShowQRModal(false);
  };

  const renderInfoUser = () => {
    if (localStorage.length <= 0) {
      return <div>{history.push("/")}</div>;
    } else {

        return (
            <div className="container">
              <div className="container-header">
                <img src={banner} alt="" />
              </div>
              <div className="account-title">
                <div className="account-img">
                  <div className="up-avatar"></div>
                  <img className="img-fit" src={user} />
                </div>
                <div className="account-name">
                  <div className="full-name">
                    {JSON.parse(localStorage.getItem(localStorage.key(0))).firstname} {JSON.parse(localStorage.getItem(localStorage.key(0))).lastname}
                  </div>
                  <div className="account-balance">
                    Số dư hiện tại:
                    <span>
                    {format2(JSON.parse(localStorage.getItem(localStorage.key(0))).money)} VNĐ
                    </span>
                  </div>
                </div>
              </div>
              <div className="account-info">
                <div className="account-info-item">
                  Email: <span>{JSON.parse(localStorage.getItem(localStorage.key(0))).email}</span>
                </div>
                <div className="account-info-item">
                  Ngày đăng kí: <span>{JSON.parse(localStorage.getItem(localStorage.key(0))).time}</span>
                </div>
                <div className="account-info-item">
                  <span>Member</span>
                </div>
              </div>
              <div className="container-main">
                <div className="container-body">
                  <div className="container-body-side">
                    <ListInfo />
                  </div>
                </div>
                <div className="container-body-container">
                  <span className="gradient-text">NẠP COIN VÀO TÀI KHOẢN</span>

                  <hr />

                  <p>
                    <b>Phương thức nạp tiền:</b> 1 COIN = 1 VNĐ
                  </p>
                  <Collapse accordion>
                    <Panel
                      header={
                        <div className="payment-container">
                          <img
                            src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Logo-bank/qrpay2.png"
                            height="40px"
                            width="40px"
                          />
                          <div className="payment-element">
                            <span style={{ fontSize: "18px" }}>
                              <strong>Thanh toán bằng QR Pay</strong>
                            </span>
                            <span style={{ fontSize: "16px" }}>
                              Thanh toán bằng QR Code (VNPay)
                            </span>
                          </div>
                        </div>
                      }
                      key="1"
                    >
                      <p style={{ fontSize: "16px" }}>
                        Nạp coin bằng QR Code
                      </p>
                      <Formik
                        initialValues={{
                          money: "",
                        }}
                        validationSchema={Yup.object({
                          money: Yup.string()
                          .required("Bạn chưa nhập"),
                        })}
                        onSubmit={(values, {resetForm}) => {
                          handleShowQRModal("qr", values, JSON.parse(localStorage.getItem(localStorage.key(0))));
                          resetForm({ values: ''})
                        }}
                      >
                        <Form>
                          <div className="form-row mt-1">
                            <div className="form-group col-md-12">
                              <div className="form-group col-md-8">
                                
                                <Field
                                  type="number"
                                  className={`form-control`}
                                  autoComplete="on"
                                  placeholder="Nhập số Coin muốn nạp"
                                  name="money"
                                />
                                <div className="text-danger mt-2 mr-1">
                                  <ErrorMessage
                                    className="text-danger mt-2 mr-1"
                                    name="money"
                                  />
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary m-3"
                              >
                                Nạp Coin
                              </button>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </Panel>
                    <Panel
                      header={
                        <div className="payment-container">
                          <img
                            src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Logo-bank/Viettel.png"
                            height="40px"
                            width="40px"
                          />
                          <div className="payment-element">
                            <span style={{ fontSize: "18px" }}>
                              <strong>
                                Nạp thẻ Viettel ( Cần nạp tối thiểu 100.000 VNĐ
                                )
                              </strong>
                            </span>
                            <span style={{ fontSize: "16px" }}>
                              Nạp tiền qua thẻ cào Viettel, chiết khấu 30%
                            </span>
                          </div>
                        </div>
                      }
                      key="2"
                    >
                      <p>eeeee</p>
                    </Panel>
                    <Panel
                      header={
                        <div className="payment-container">
                          <img
                            src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Logo-bank/Garena-trang.png"
                            height="40px"
                            width="40px"
                          />
                          <div className="payment-element">
                            <span style={{ fontSize: "18px" }}>
                              <strong>
                                Nạp thẻ Garena ( Cần nạp 100.000 VNĐ)
                              </strong>
                            </span>
                            <span style={{ fontSize: "16px" }}>
                              Nạp coin bằng thẻ cào Garena
                            </span>
                          </div>
                        </div>
                      }
                      key="3"
                    >
                      <p>eeeee</p>
                    </Panel>
                    <Panel
                      header={
                        <div className="payment-container">
                          <img
                            src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Logo-bank/Momo.png"
                            height="40px"
                            width="40px"
                          />
                          <div className="payment-element">
                            <span style={{ fontSize: "18px" }}>
                              <strong>Chuyển khoản qua App Momo</strong>
                            </span>
                            <span style={{ fontSize: "16px" }}>
                              Nạp coin tự động thông qua chuyển khoản trên ứng
                              dụng Momo, cần điền mã giao dịch.
                            </span>
                          </div>
                        </div>
                      }
                      key="4"
                    >
                       <p style={{ fontSize: "16px" }}>
                        Nạp coin qua Momo
                      </p>
                      <Formik
                        initialValues={{
                          money: "",
                        }}
                        validationSchema={Yup.object({
                          money: Yup.string()
                          .required("Bạn chưa nhập"),
                        })}
                        onSubmit={(values, {resetForm}) => {
                          handleShowQRModal("momo", values, JSON.parse(localStorage.getItem(localStorage.key(0))));
                          resetForm({ values: ''})
                        }}
                      >
                        <Form>
                          <div className="form-row mt-1">
                            <div className="form-group col-md-12">
                              <div className="form-group col-md-8">
                                
                                <Field
                                  type="number"
                                  className={`form-control`}
                                  autoComplete="on"
                                  placeholder="Nhập số Coin muốn nạp"
                                  name="money"
                                />
                                <div className="text-danger mt-2 mr-1">
                                  <ErrorMessage
                                    className="text-danger mt-2 mr-1"
                                    name="money"
                                  />
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="btn btn-primary m-3"
                              >
                                Nạp Coin
                              </button>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                    </Panel>
                    <Panel
                      header={
                        <div className="payment-container">
                          <img
                            src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Logo-bank/bank.png"
                            height="40px"
                            width="40px"
                          />
                          <div className="payment-element">
                            <span style={{ fontSize: "18px" }}>
                              <strong>Chuyển khoản ngân hàng</strong>
                            </span>
                            <span style={{ fontSize: "16px" }}>
                              Chuyển tiền online hoặc tại quầy giao dịch
                            </span>
                          </div>
                        </div>
                      }
                      key="5"
                    >
                      <p>eeeee</p>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <QRPayment
                isShowQRModal={isShowQRModal}
                handleHideQRModal={handleHideQRModal}
                handleCompleteQR={handleCompleteQR}
                qrModalData={qrModalData}
              />
            </div>
        );
    }
  };
  return renderInfoUser();
}

const mapStateToProps = (state) => {
  const { userList } = state.userListReducer;
  return {
    userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => dispatch(getUser(params)),
    completePayment: (params) => dispatch(completePayment(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
