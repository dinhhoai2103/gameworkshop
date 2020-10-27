import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputNumber } from "antd";
import { Button, Input } from 'antd'
import history from "../../util/history";
import CartModal from './modal'
import moment from "moment";
import { getCartData, updateCart, deleteCartData, completeCartPayment, paymentCart } from "../../redux/actions";

import "./styles.css";
function Cart({  getCartData, cartData, updateCart, deleteCartData, completeCartPayment, paymentCart }) {
  useEffect(() => {
    if (localStorage.getItem(localStorage.key(0)))
    getCartData({
      id: JSON.parse(localStorage.getItem(localStorage.key(0))).id
    });
    
  }, []);
  function format2(n) {
    return  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleHideModal = () => {
    setIsShowModal(false);
    setModalData({});
  };
  const handleShowModal = (price, money) => {
    setIsShowModal(true);
    setModalData({
      money: money - price
    });
  };

  const handleCompletePayment = (item) => {
    completeCartPayment({
      id: JSON.parse(localStorage.getItem(localStorage.key(0))).id,
      money: item.money
    })
    setTimeout(function(){
      for (let i = 0; i <= cartData.length; i++) {
        if (cartData[i]) {
          paymentCart({
            time: moment().format("HH:mm DD-MM-YYYY"),
            isPay: true,
            id: cartData[i].id
          })
        }
      }     
    }, 100);
    setIsShowModal(false);
    history.push('/success')
  };

  
  function onChangeNumber(item, value) {
      return updateCart({
        id: item.id,
        amount: item.amount,
        soluong: value,
      });
  }
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(!show);
  };
  const cardStyle = {
    opacity: show == true ? 0 : 1,
    transition: "all .5s ease-in",
  };

  const totalPrice = () => {
    let itemPrice = 0;
      cartData.map((item) => {
        if (item.isPay === false) {
        return (JSON.parse(localStorage.getItem(localStorage.key(0))).id  === item.idUser) &&
          (itemPrice =  (item.price * item.soluong) + itemPrice)
        }
      });
      return itemPrice
  };
  const renderCart = () => {
      return cartData.map((item, index) => {
        return (item.isPay === false) &&
        (
            <div
              className="row cart-detail col-12"
              key={`cart-${item.idUser}-${index}`}
            >
              <div className="col-md-12 hidden-sm hidden-xs item cart-detail-1">
                <div className="col-md-3">
                  <span style={{ cursor:"pointer" }} onClick={() => history.push(`/games/${item.idGame}`)}>
                    <img src={item.image} />
                  </span>
                </div>
                <div className="col-md-5">
                  <span style={{ fontSize: 20, fontWeight: "bold" }} onClick={() => history.push(`/games/${item.idGame}`)}>
                    {item.name}
                  </span>
                  <br />
                  <div className="item-status">
                    Tình trạng: <span className="con-hang">{item.amount}</span>
                  </div>
                  <span style={{ color: "red", cursor:"pointer" }} className="poiter" 
                  onClick={() => deleteCartData({id: item.id})}>
                    Xóa
                  </span>
                </div>
                <div className="col-md-2">
                  <InputNumber
                    min={1}
                    defaultValue={item.soluong}
                    onChange={(value) => onChangeNumber(item, value)}
                   
                  />
                </div>
                <div className="col-md-2 text-right">
                  <span
                    style={{
                      fontSize: "16px",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    {format2(item.soluong * item.price)} VNĐ
                  </span>
                  <br />
                </div>
              </div>
            </div>
        );
      });
  };
  return (
    (localStorage.length <= 0) ? (
      <div>{history.push('/login')}</div>
    ) :
    (<div className="container">
      <div className="cart-main">
        <div className="container-title">
          
            <span className="sp"><h2 className="mr-2">Giỏ Hàng </h2>{cartData && <span>{cartData.length} Sản phẩm</span>}</span>
            
          
          <div className="sort">
            <button
              className="btn btn-primary"
              onClick={() => history.push(`/`)}
            >
              Tiếp tục mua hàng
            </button>
          </div>
        </div>

        <div className="thanh-toan-container">
          {renderCart()}

          <div className="mb15" />
          <div className="thanh-toan">
            <div className="row">
              <div className="col-md-12 col-xs-12 p-0 row">
                <div className="col-md-6 col-xs-12 p-0">
                  <div className="panel-group">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              className="receiver_email"
                              name="receiver_email"
                              defaultValue={0}
                              onClick={() => handleClick()}
                              defaultChecked
                            />
                            <span>Mua cho chính mình</span>
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input
                              type="radio"
                              className="receiver_email"
                              name="receiver_email"
                              defaultValue={1}
                              onClick={() => handleClick()}
                            />
                            <span>Tặng cho bạn bè</span>
                          </label>
                        </div>
                        <div id="receive_email_form" style={cardStyle}>
                          <div className="input-group">
                            <Input
                              type="email"
                              name="friend_email"
                              placeholder="Nhập email người nhận..."
                              className="form-control mr-2"
                            />
                            
                            <Button size='large' type="primary">Xác nhận</Button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="order-total">
                    <div className="panel panel-default">
                      <div
                        className="panel-heading"
                        style={{ borderColor: "transparent" }}
                      >
                        <h4 className="panel-title">
                          <strong>THÔNG TIN THANH TOÁN</strong>
                        </h4>
                      </div>
                      <div className="panel-body">
                        <div className="row">
                          {/* Thành Tiền */}
                          <div className="col-md-12 col-sm-12 col-xs-12 padd-0 margin-item">
                            <div className="total-card">
                              <p>Thành tiền sản phẩm</p>
                              <p>{format2(totalPrice())} VNĐ</p>
                            </div>
                          </div>
                          <hr />
                          {/* Border Bottom Nét Đứt */}
                  
                          <div className="col-md-12 col-sm-12 col-xs-12 margin-border-dash border-bottom-dash" />
                          {/* Tổng Tiền */}
                          
                          <div className="col-md-12 col-sm-12 col-xs-12 padd-0 margin-item">
                            <div className="total-card">
                              <b>TỔNG TIỀN</b>
                              <p className="text-danger">{format2(totalPrice())} VNĐ</p>
                            </div>
                          </div>
                          <hr />
                          {/* Border Bottom Nét Đứt */}
                          <div className="col-md-12 col-sm-12 col-xs-12  margin-border-dash border-bottom-dash" />
                          <div className="col-md-12 col-sm-12 col-xs-12  total-card margin-item">
                          <div className="total-card">
                              <p className="text-gray">Số dư hiện tại</p>
                            </div>
                            
                              <p className="thanh-tien">
                                {format2(JSON.parse(localStorage.getItem(localStorage.key(0))).money)} VNĐ
                                <i
                                  className="icon-coin-dollar"
                                  style={{ color: "#000" }}
                                />
                              </p>
                           
                          </div>
                   
                          <div className="col-md-12 col-sm-12 col-xs-12  margin-border-dash border-bottom-dash" />
                      
                         {(totalPrice() > JSON.parse(localStorage.getItem(localStorage.key(0))).money ) && (
                            <div className="col-md-12 col-sm-12 col-xs-12  margin-item">
                            <div className="total-card">
                                <p className="h16-md-26 text-gray-900">
                                  SỐ TIỀN CẦN NẠP THÊM
                                </p>
                         
                              
                                <div className="h16-bo-26 text-primary">
                                  {format2(totalPrice() - (JSON.parse(localStorage.getItem(localStorage.key(0))).money))}{" "}VNĐ
                                  <i
                                    className="icon-coin-dollar"
                                    style={{ color: "#000" }}
                                  />
                                </div>
                              
                            </div>
                              <button
                                type="button"
                                className="btn btn-danger col-md-6 col-sm-6 col-xs-6"
                                onClick={() => history.push('/payment')}
                              >
                                <strong style={{ color: "#fff" }}>
                                  Nạp Thêm Tiền
                                </strong>
                              </button>
                            </div>
                         )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="buttons clearfix">
            <div className="pull-right">
              {cartData.length > 0 && (
                <button className="btn btn-primary" onClick={() => {
                  handleShowModal(
                    totalPrice(),
                    JSON.parse(localStorage.getItem(localStorage.key(0))).money,
                  )}
                }
                >Thanh toán</button>
              )}
              <CartModal
                isShowModal={isShowModal}
                handleHideModal={handleHideModal}
                modalData={modalData}
                handleCompletePayment={handleCompletePayment}
              />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  )
}

const mapStateToProps = (state) => {
  const { cartData } = state.cartDataReducer;
  return {
    cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (params) => dispatch(getCartData(params)),
    updateCart: (params) => dispatch(updateCart(params)),
    deleteCartData: (params) => dispatch(deleteCartData(params)),
    completeCartPayment: (params) => dispatch(completeCartPayment(params)),
    paymentCart:(params) => dispatch(paymentCart(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
