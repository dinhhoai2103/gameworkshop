import React, { useEffect } from "react";
import { connect } from "react-redux";
import banner from "../../../images/banner.png";
import user from "../../../images/user.svg";
import history from "../../../util/history";
import ListInfo from "../ListInfo";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { changePassword } from "../../../redux/actions";

import "./styles.css";
function User({ userList, changePassword }) {
  function format2(n) {
    return  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const submitChangePass = (values, item) => {
    changePassword({
      password: values.password,
      id: item.id,
    });
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
                <div className="container-body-container tai-khoan">
                  <h2>Thay đổi mật khẩu</h2>

                  <hr />
                  <Formik
                    initialValues={{
                      password: "",
                      repassword: "",
                    }}
                    validationSchema={Yup.object({
                      password: Yup.string()
                        .required("Vui lòng nhập mật khẩu")
                        .min(8, "Mật khẩu tối thiểu 8 kí tự"),
                      repassword: Yup.string()
                        .required("Vui lòng nhập mật khẩu")
                        .min(8, "Mật khẩu tối thiểu 8 kí tự")
                        .oneOf(
                          [Yup.ref("password"), null],
                          "Mật khẩu không khớp"
                        ),
                    })}
                    onSubmit={(values, { resetForm }) => {
                      submitChangePass(values, JSON.parse(localStorage.getItem(localStorage.key(0))));
                      resetForm({ values: "" });
                    }}
                  >
                    <Form>
                      <div className="form-row mt-1">
                        <div className="form-group col-md-7">
                          
                          <Field
                            type="password"
                            className={`form-control`}
                            placeholder="Mật khẩu mới"
                            name="password"
                          />
                          <div className="text-danger mt-2 mr-1">
                            <ErrorMessage name="password" />
                          </div>
                        </div>
                        <div className="form-group col-md-7">
                          
                          <Field
                            type="password"
                            className={`form-control`}
                            autoComplete="on"
                            placeholder="Xác nhận mật khẩu mới"
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

                      <button type="submit" className="btn btn-primary">
                        Thay đổi
                      </button>
                    </Form>
                  </Formik>
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
    changePassword: (params) => dispatch(changePassword(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
