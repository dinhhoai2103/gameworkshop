import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import history from "../../util/history";
import "./styles.css";
import { connect } from "react-redux";
import {
  getCartData,
  getUserLogout,
  getSearchData,
  getUser,
} from "../../redux/actions";
import { Select } from "antd";
const { Option } = Select;
function Header({
  getUserLogout,
  cartData,
  getUser,
  getCartData,
  getSearchData,
  searchData,
}) {
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(localStorage.key(0)))) {
      getUser({
        email: JSON.parse(localStorage.getItem(localStorage.key(0))).email
      });
      getCartData({
        id: JSON.parse(localStorage.getItem(localStorage.key(0))).id
      })
    }
  }, []);
  
  const menuList = [
    {
      title: "Thể loại",
      path: "/type",
      dropdown: [
        {
          data: "Action",
          path: "/type?type=Action",
        },
        {
          data: "Adventure",
          path: "/type?type=Adventure",
        },
        {
          data: "Sport",
          path: "/type?type=Sport",
        },
        {
          data: "Racing",
          path: "/type?type=Racing",
        },
        {
          data: "Casual",
          path: "/type?type=Casual",
        },
        {
          data: "Simulator",
          path: "/type?type=Simulator",
        },
      ],
    },
    {
      title: "Danh mục",
      path: "/category",
      dropdown: [
        {
          data: "Game steam",
          path: "/category?category=steam",
        },
        {
          data: "Game Origin",
          path: "/category?category=origin",
        },
        {
          data: "Battle.net",
          path: "/category?category=battle",
        },
        {
          data: "Game mobile",
          path: "/category?category=mobile",
        },
        {
          data: "Play Station",
          path: "/category?category=ps",
        },
        {
          data: "Xbox",
          path: "/category?category=xbox",
        },
        {
          data: "Package steam",
          path: "/category?category=package",
        },
        {
          data: "Wallet Code",
          path: "/category?category=code",
        },
        {
          data: "Khác",
          path: "/category?category=other",
        },
      ],
    },
    {
      title: "Thông tin",
      path: "/information",
      dropdown: [
        {
          data: "Hướng dẫn",
          path: "/information/tutorial",
        },
        {
          data: "Tin tức",
          path: "/information/news",
        },
      ],
    },
    {
      title: "Liên hệ",
      path: "/contact",
    },
  ];
  function format2(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const checkLoginSuccess = () => {
    return localStorage.length <= 0 ? (
      <div>
        <div className="show-more-signup">
          <a className="show-more-1" onClick={() => history.push("/login")}>
            <p className="border border-primary text-primary">ĐĂNG NHẬP</p>
          </a>
          <div className="show-more-register">
            <div>Thành viên mới?</div>
            <a
              className="text-primary"
              onClick={() => history.push("/register")}
            >
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    ) : (
      <div className="show-more-signup">
        <a className="show-more-2 pt-2">
          <p>
            {format2(
              JSON.parse(localStorage.getItem(localStorage.key(0))).money
            )}{" "}
            <i className="fa fa-money"></i>
          </p>
        </a>
        <a
          className="show-more-2 pb-2"
          onClick={() => history.push("/payment")}
        >
          Nạp tiền
        </a>
        <a className="show-more-2 pb-2" onClick={() => history.push("/user")}>
          Tài khoản
        </a>
        <a
          className="show-more-2 pb-2"
          onClick={() => history.push("/wishlist")}
        >
          Danh sách yêu thích
        </a>
        <a className="show-more-2 " onClick={() => history.push("/history")}>
          Lịch sử mua hàng
        </a>
        <a
          className="show-more-1"
          onClick={() => {
            getUserLogout();
            history.push("/")
          }}
        >
          <p className="border border-danger text-primary">Đăng xuất</p>
        </a>
      </div>
    );
  };

  const renderSearchResult = () => {
    return searchData.map((item, index) => {
      return (
        <Option key={`search-${item.id}-${index}`} value={`games/${item.id}`}>
          {item.name}
        </Option>
      );
    });
  };

  const renderCartItem = () => {
    if (localStorage.length <= 0) {
      return (
        <div className="cart-container mr-4 ml-2">
          <div className="cart-box" onClick={() => history.push("/login")}>
            <div className="icon-cart">
              <i className="fa fa-shopping-basket"></i>
            </div>
            <div className="HeaderBoxdivider"></div>
            <div className="cart-info">
              <span className="cart-value">Giỏ hàng</span>
              <span className="cart-items"></span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        
        <div className="cart-container mr-4 ml-2">
          <div className="cart-box" onClick={() => history.push("/cart")}>
            <div className="icon-cart">
              <i className="fa fa-shopping-basket"></i>
            </div>
            <div className="HeaderBoxdivider"></div>
            <div className="cart-info">
              <span className="cart-value">Giỏ hàng </span>
              <span className="cart-items text-danger"></span>
            </div>
          </div>
        </div>
        
      );
    }
  };

  const renderMenu = () => {
    return menuList.map((item, index) => {
      return (
        <li key={`menu-${index}`}>
          <label htmlFor={`drop-${index}`} className="toggle">
            {item.title}
          </label>
          <a
            href
            onClick={() => history.push(item.path)}
            className="menu-title"
          >
            {item.title}
          </a>
          <input type="checkbox" id={`drop-${index}`} />
          <ul key={`menu-drop-${index}`} className="ul-menu"> 
            {(item.dropdown || []).map((data, index2) => {
              return (
                <li
                  onClick={() => history.push(data.path)}
                  key={`menuDrop-${index2}`}
                  className="menu-drop"
                >
                  <a>{data.data}</a>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  };

  return (
    <>
      <div id="header">
        <div className="free-header col-md-12 col-lg-7 d-flex">
          <div className="header-support">
            <i className="fa fa-info-circle">&nbsp;&nbsp;</i>
            <span>HỖ TRỢ 24/7</span>
          </div>
          <div className="header-links">
            <i className="fa fa-envelope">&nbsp;</i>
            <span>&nbsp;&nbsp;Subscribe&nbsp;&nbsp;</span>
            <span> |&nbsp;&nbsp;</span>
            <i className="fa fa-phone"></i>
            <span>&nbsp;&nbsp;0123-456-789&nbsp;&nbsp;</span>
            <span> | </span>
            <span>&nbsp;&nbsp;Blog&nbsp;&nbsp;</span>
            <span> | </span>
            <span>&nbsp;&nbsp;Địa chỉ cửa hàng&nbsp;&nbsp;</span>
          </div>
        </div>
        <div className="header container">
          <div className="logo" onClick={() => history.push("/")}>
            <img src={logo} alt="" />
          </div>
          <div className="header-search">
            <Select
              size="large"
              showSearch
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={(value) => {
                getSearchData({ input: value });
              }}
              onChange={(id) => history.push(`/${id}`)}
              notFoundContent={"Không có kết quả"}
              placeholder="Search for games"
              style={{ width: 450 }}
            >
              {renderSearchResult()}
            </Select>
          </div>
          <div className="d-flex">
          {renderCartItem()}
          <div className="signin-container">
            
            <div className="signin-box">
              <div className="icon-signup">
                <i className="fa fa-user"></i>
              </div>
              <span className="HeaderBoxdivider"></span>
              <div className="signin-txt">
                {localStorage.length <= 0 ? (
                  <div className="signin-text" onClick={() => history.push("/login")}>Đăng nhập</div>
                ) : (
                  <div className="signin-text" onClick={() => history.push("/user")}>
                    Hi,{" "}
                    <b>
                      {
                        JSON.parse(localStorage.getItem(localStorage.key(0)))
                          .lastname
                      }{" "}
                    </b>
                  </div>
                )}
                {checkLoginSuccess()}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <nav>
        <label htmlFor="drop" className="toggle">
          Menu
        </label>
        <input type="checkbox" id="drop" />
        <ul className="menu">{renderMenu()}</ul>
      </nav>
    </>
  );
}
const mapStateToProps = (state) => {
  const { cartData } = state.cartDataReducer;
  const { searchData } = state.searchReducer;
  const { userList } = state.userListReducer;
  return {
    cartData,
    searchData,
    userList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => dispatch(getUser(params)),
    getUserLogout: (params) => dispatch(getUserLogout(params)),
    getCartData: (params) => dispatch(getCartData(params)),
    getSearchData: (params) => dispatch(getSearchData(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
