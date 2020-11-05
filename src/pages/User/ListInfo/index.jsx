import React, { useState } from "react";
import history from "../../../util/history";

import "./styles.css";
function ListInfo() {
 

  const userInfo = [
    {
      title: "Thông tin tài khoản",
      title2: "Quản lí thông tin cá nhân",
      icon: "fa fa-info",
      color: "#f4b844",
      path: "/user"
    },
    {
      title: "Thay đổi mật khẩu",
      title2: "Cập nhật mật khẩu mới",
      icon: "fa fa-key",
      color: "#ad4025",
      path: "/password"
    },
    {
      title: "Lịch sử giao dịch",
      title2: "Thông tin thanh toán",
      icon: "fa fa-history",
      color: "#48a163",
      path: "/history"
    },
    {
      title: "Nạp tiền",
      title2: "Nạp tiền vào tài khoản",
      icon: "fa fa-money",
      color: "gray",
      path: "/payment"
    },
    {
      title: "Sản phẩm yêu thích",
      title2: "Sản phẩm đã đánh dấu",
      icon: "fa fa-heart",
      color: "#ea3a4b",
      path: "/wishlist"
    }
  ]

  const [sidebarActiveIndex, setSidebarActiveIndex] = useState();

  const renderInfoList = () => {
    return userInfo.map((item, index) => {
      return (
        <div key={index}
          className={`side-item ${
            sidebarActiveIndex === index ? "sidebar-active" : ""
          }`}
          onClick={() =>{ 
            setSidebarActiveIndex(index)
            history.push(item.path)
          }}
        >
          <div className="side-item-icon fix-width-icon">
            <i className={`${item.icon} fa-2x`} style={{ color: item.color }} />
          </div>
          <div className="side-item-title">
            <div>
              <b>{item.title}</b>
            </div>
            <div>{item.title2}</div>
          </div>
        </div>
      );
    });
  };
  
  return renderInfoList();
}

export default ListInfo;
