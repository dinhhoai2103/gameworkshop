import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import history from "../../util/history";
import "./styles.css";
import { connect } from "react-redux";

import { getUserLogin } from "../../redux/actions";

function Login({ getUserLogin }) {
  useEffect(() => {
    if (localStorage.length > 0) history.push("/");
  }, []);

  const checkUserLogin = (values) => {
    getUserLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="container login-main">
      <div className="login-header">VUI LÒNG ĐĂNG NHẬP</div>
      <div className="login-divider"></div>
      <div className="row">
        <div className="col-lg-6">
          <div className="login-body-1">
            <h4>TẠO TÀI KHOẢN MỚI</h4>
            <div className="login-ul-divider"></div>

            <div className="login-list">
              <div className="pt-2 pb-2">
                Đăng ký để nhận các quyền lợi đặc biệt như ...
              </div>
              <ul className="login-ul">
                <li>
                  <div className="login-img">
                    <img
                      alt=""
                      src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-access.png"
                    />

                    <div className="login-desc">Truy cập thanh toán nhanh</div>
                  </div>
                </li>
                <li>
                  <div className="login-img">
                    <img
                      alt=""
                      src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-reward-points.png"
                    />
                    <div className="login-desc">Theo dõi đơn hàng</div>
                  </div>
                </li>
                <li>
                  <div className="login-img">
                    <img
                      alt=""
                      src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/image/icon-sign-up1.png"
                    />
                    <div className="login-desc">
                      Đăng ký nhận tin tức và ưu đãi độc quyền
                    </div>
                  </div>
                </li>
                <li>
                  <div className="login-img">
                    <a
                      href
                      onClick={() => history.push("/register")}
                      className="btn btn-primary mt-2"
                    >
                      Tạo tài khoản
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="login-body-2">
            <h4 className="login">ĐĂNG NHẬP</h4>
            <div className="login-divider"></div>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Định dạng email không đúng")
                  .required("Bạn chưa nhập Email"),
                password: Yup.string().required("Bạn chưa nhập password"),
              })}
              onSubmit={(values) => {
                checkUserLogin(values);
              }}
            >
              <Form>
                <div className="form-row mt-1">
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
                </div>

                <button type="submit" className="btn btn-primary">
                  Đăng nhập
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userList } = state.userListReducer;
  return {
    userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserLogin: (params) => dispatch(getUserLogin(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
