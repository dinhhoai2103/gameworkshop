import React, { useEffect } from "react";
import { Button } from "antd";
import history from "../../util/history";
import "./styles.css";
import { connect } from "react-redux";

function Success() {
  useEffect(() => {
    if (localStorage.length <= 0) history.push("/login");
  }, []);

  return (
    <div
      className="container"
      style={{ background: "white", paddingBottom: 10 }}
    >
      <div className="success-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="svg-success"
          viewBox="0 0 24 24"
        >
          <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}>
            <circle
              className="success-circle-outline"
              cx={12}
              cy={12}
              r="11.5"
            />
            <circle className="success-circle-fill" cx={12} cy={12} r="11.5" />
            <polyline className="success-tick" points="17,8.5 9.5,15.5 7,13" />
          </g>
        </svg>
      </div>
      <h2 className="text-center">Thanh toán thành công</h2>
      <p className="text-payment">
        Thông tin thanh toán đã được gửi qua Email của bạn
      </p>
      <p className="text-payment">
        Hướng dẫn kích hoạt game nhấn vào
        <span className="text-primary" style={{ cursor: "pointer" }}>
          {" "}
          đây
        </span>
      </p>
      <p className="text-payment">Cảm ơn bạn đã mua hàng tại website</p>
      <div className="btn-class">
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          onClick={() => history.push("/")}
        >
          Tiếp tục mua hàng
        </Button>
        <Button type="primary" onClick={() => history.push("/history")}>
          Xem lịch sử mua hàng
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { cartData } = state.cartDataReducer;
  return {
    cartData,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };
export default connect(mapStateToProps)(Success);
