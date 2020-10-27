import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import banner from "../../../images/banner.png";
import user from "../../../images/user.svg";
import history from "../../../util/history";
import ListInfo from '../ListInfo'
import { updateInfo } from "../../../redux/actions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";
function UserInfo({ updateInfo }) {
  function format2(n) {
    return  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const submitUpdateInfo = (values, item) => {
    updateInfo({
      firstname: values.firstname,
      lastname: values.lastname,
      phone: values.phone,
      id: item.id
    })
    setShow(true)
  }
  
  const [show, setShow] = useState(true);
  
  const handleClick = () => {
    setShow(!show);
  };
  const cardStyle = {
    display: (show === true) ? "none" : "block",
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
                  <img className="img-fit" alt="img" src={user} />
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
                  <div className="thong-tin">
                  <h2>Thông tin cá nhân</h2>
                  
                  <button className="btn btn-primary" onClick={() =>handleClick()}>
                  {show ? "Thay đổi thông tin" : "Hủy bỏ"}
                  </button>
                  </div>
                  
                  <hr />
                  <div className="form-group">
                    <label className="col-form-label">
                      Email đăng nhập: {JSON.parse(localStorage.getItem(localStorage.key(0))).email}
                    </label>
                  </div>
                  <div className="form-group"></div>
                  <div className="form-group">
                    <label className="col-form-label">
                      {" "}
                      <span
                        style={{ color: "red" }}
                        className="info_edit"
                      ></span>{" "}
                      Họ và tên:{" "}
                    </label>
                    <span className="text info_detail">
                      {JSON.parse(localStorage.getItem(localStorage.key(0))).firstname} {JSON.parse(localStorage.getItem(localStorage.key(0))).lastname}
                    </span>
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">
                      Số điện thoại: {JSON.parse(localStorage.getItem(localStorage.key(0))).phone}
                    </label>
                    <hr />
                  </div>
                  <div className="update-info" style={cardStyle}>

                  
                  <h2>Thay đổi thông tin</h2>
                  
                
                  <hr />
                  <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                phone: ""
              }}
              validationSchema={Yup.object({
                firstname: Yup.string()
                  .required("Bạn chưa nhập họ"),
                lastname: Yup.string()
                  .required("Bạn chưa nhập tên"),
                phone: Yup.string()
                  .required("Bạn chưa nhập số điện thoại")
                  .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ"
                  )
              })}
              onSubmit={(values, {resetForm}) => {
                submitUpdateInfo(values, JSON.parse(localStorage.getItem(localStorage.key(0))))
                resetForm({ values: ''})
              }}
            >
              <Form>
                <div className="form-row mt-1">
                  <div className="form-group col-md-7">
                    <Field
                      type="text"
                      className={`form-control`}
                      placeholder="Nhập họ"
                      name="firstname"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage name="firstname" />
                    </div>
                  </div>
                  <div className="form-group col-md-7">
                    <Field
                      type="text"
                      className={`form-control`}
                      placeholder="Nhập tên"
                      name="lastname"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage
                        className="text-danger mt-2 mr-1"
                        name="lastname"
                      />
                    </div>
                    <Field
                      type="text"
                      className={`form-control`}
                      placeholder="Nhập số điện thoại"
                      name="phone"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage
                        className="text-danger mt-2 mr-1"
                        name="phone"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </Form>
            </Formik>
            </div>
                </div>
              </div>
            </div>
        );
    
    }
  };
  return renderInfoUser();
}

const mapStateToProps = (state) => {
  const { userList } = state.userListReducer;
  return {
    userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (params) => dispatch(updateInfo(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
