import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import history from "../../util/history";
import { connect } from 'react-redux'
import moment from "moment";
import { createUser } from '../../redux/actions'
import "./styles.css";

function Register({
  createUser
}) {
  useEffect(() => {
    if (localStorage.length > 0) history.push("/");
  }, [])
  const handleSubmitForm = (values) => {
    createUser({
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      phone: values.phone,
      money: 0,
      time: moment().format("DD-MM-YYYY"),
    });
};
 
  return (
    <div className="container register-main">
      <div className="register-header">VUI LÒNG ĐĂNG KÝ</div>
      <div className="register-divider"></div>
      <div className="row">
        <div className="col-lg-6">
          <div className="register-body-1">
            <h4>THÀNH VIÊN MỚI</h4>
            <div className="pt-2 pb-2">
              Đăng ký để nhận các quyền lợi đặc biệt như ...
            </div>
            <div className="register-list">
              <ul className="register-ul">
                <li>
                  <div className="register-img">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-express-checkout.png" />
                    <div className="register-desc">Thanh toán nhanh</div>
                  </div>
                </li>
                <li>
                  <div className="register-img">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-promotions.png" />
                    <div className="register-desc">Khuyến mại</div>
                  </div>
                </li>
                <li>
                  <div className="register-img">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-latest-news.png" />
                    <div className="register-desc">
                      Tin tức &amp; đánh giá mới nhất
                    </div>
                  </div>
                </li>
                <li>
                  <div className="register-img">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-stock-via-mail.png" />
                    <div className="register-desc">
                      Khả năng thiết lập thông báo còn hàng qua email
                    </div>
                  </div>
                </li>
                <li>
                  <div className="register-img">
                    <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-regst-wishlist.png" />
                    <div className="register-desc">Tạo danh sách mong muốn</div>
                  </div>
                </li>
                <div className="register-ul-divider"></div>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="register-body-2">
            <h4>TẠO TÀI KHOẢN</h4>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                repassword: "",
                phone: "",
                checkbox: "",
              }}
              validationSchema={Yup.object({
                firstname: Yup.string().required("Vui lòng nhập họ"),
                lastname: Yup.string().required("Vui lòng nhập tên"),
                email: Yup.string()
                  .email("Định dạng email không đúng")
                  .required("Bạn chưa nhập Email"),
                password: Yup.string()
                  .min(8, "Mật khẩu tối thiểu 8 kí tự")
                  .required("Bạn chưa nhập password"),
                repassword: Yup.string()
                  .min(8, "Mật khẩu tối thiểu 8 kí tự")
                  .required("Bạn chưa nhập password")
                  .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
                phone: Yup.string()
                  .required("Bạn chưa nhập số điện thoại")
                  .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ"
                  ),

                checkbox: Yup.string().required("Vui lòng đồng ý điều khoản"),
              })
              
              }
              onSubmit={(values) => 
                 handleSubmitForm(values)
                }
            >
              <Form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="email">First Name </label>
                    <Field
                      type="text"
                      className={`form-control`}
                      placeholder="First Name"
                      name="firstname"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage name="firstname" />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="password">Last Name</label>
                    <Field
                      type="text"
                      className={`form-control`}
                      placeholder="Last Name"
                      name="lastname"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage
                        className="text-danger mt-2 mr-1"
                        name="lastname"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="email">Email </label>
                    <Field
                      type="email"
                      className={`form-control`}
                      placeholder="Email"
                      name="email"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      className={`form-control`}
                      autoComplete="on"
                      placeholder="Password"
                      name="password"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage
                        className="text-danger mt-2 mr-1"
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="password">Confirm Password</label>
                    <Field
                      type="password"
                      className={`form-control`}
                      autoComplete="on"
                      placeholder="Confirm password"
                      name="repassword"
                    />
                    <div className="text-danger mt-2 mr-1">
                      <ErrorMessage
                        className="text-danger mt-2 mr-1"
                        name="repassword"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <Field
                    type="text"
                    className={`form-control`}
                    placeholder="Phone number"
                    name="phone"
                  />
                  <div className="text-danger mt-2 mr-1">
                    <ErrorMessage
                      className="text-danger mt-2 mr-1"
                      name="phone"
                    />
                  </div>
                </div>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    value="OK"
                    name="checkbox"
                  />
                  <label htmlFor="defaultCheck1">Đồng ý với điều khoản</label>
                </div>
                <div className="text-danger mt-2 mr-1">
                  <ErrorMessage name="checkbox" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Đăng ký
                </button>{" "}
              </Form>
            </Formik>
            <div className="pt-2 pl-1 link-to-login">
              Nếu đã có tài khoản?{" "}
              <a
                className="text-primary"
                onClick={() => history.push("/login")}
              >
                Nhấn vào đây
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userList } = state.userListReducer;
  return {
    userList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (params) => dispatch(createUser(params)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
