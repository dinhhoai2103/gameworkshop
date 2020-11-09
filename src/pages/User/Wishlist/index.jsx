import React, { useEffect } from "react";
import { connect } from "react-redux";
import banner from "../../../images/banner.png";
import user from "../../../images/user.svg";
import history from "../../../util/history";
import ListInfo from "../ListInfo";
import moment from "moment";
import {
  getUser,
  getWishlist,
  deleteWishlist,
  addCart,
} from "../../../redux/actions";

import "./styles.css";
function Wishlist({
  userList,
  getUser,
  getUserInfo,
  getWishlist,
  wishlist,
  deleteWishlist,
  addCart,
}) {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(localStorage.key(0))))
      getWishlist({
        id: JSON.parse(localStorage.getItem(localStorage.key(0))).id,
      });
  }, []);
  function format2(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const deleteGameWishlist = (item) => {
    deleteWishlist({
      id: item.id,
    });
  };

  const handleAddToCart = (item) => {
    return addCart({
      idUser: JSON.parse(localStorage.getItem(localStorage.key(0))).id,
      idGame: item.idGame,
      name: item.name,
      image: item.image,
      price: item.price,
      amount: item.amount,
      soluong: 1,
      isPay: false,
      time: moment().format("HH:mm DD-MM-YYYY"),
    });
  };
  const renderWishList = () => {
    return wishlist.map((item, index) => {
      return (
        <tbody key={`wishlist-${item.id}-${index}`}>
          <tr>
            <td className="text-center">
              <span onClick={() => history.push(`/games/${item.idGame}`)}>
                <img
                  alt=""
                  style={{ width: "100px", height: "auto" }}
                  src={item.image}
                />
              </span>
            </td>
            <td className="text-left">
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => history.push(`/games/${item.idGame}`)}
              >
                {item.name}
              </span>
            </td>
            <td className="text-center" style={{ maxWidth: "60%" }}>
              {item.amount > 0 ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Còn Hàng: {item.amount}
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Hết hàng
                </span>
              )}
            </td>
            <td className="text-center">{format2(item.price)} VNĐ</td>
            <td className="text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddToCart(item)}
              >
                <i className="fa fa-shopping-cart" />
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteGameWishlist(item)}
              >
                <i className="fa fa-times" />
              </button>
            </td>
          </tr>
        </tbody>
      );
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

            <div className="account-title">
              <div className="account-img">
                <div className="up-avatar"></div>
                <img alt="avatar" className="img-fit" src={user} />
              </div>
              <div className="account-name">
                <div className="full-name">
                  {
                    JSON.parse(localStorage.getItem(localStorage.key(0)))
                      .firstname
                  }{" "}
                  {
                    JSON.parse(localStorage.getItem(localStorage.key(0)))
                      .lastname
                  }
                </div>
                <div className="account-balance">
                  Số dư hiện tại:
                  <span>
                    {format2(
                      JSON.parse(localStorage.getItem(localStorage.key(0)))
                        .money
                    )}{" "}
                    VNĐ
                  </span>
                </div>
              </div>
            </div>
            <div className="account-info">
              <div className="account-info-item">
                Email:{" "}
                <span>
                  {JSON.parse(localStorage.getItem(localStorage.key(0))).email}
                </span>
              </div>
              <div className="account-info-item">
                Ngày đăng kí:{" "}
                <span>
                  {JSON.parse(localStorage.getItem(localStorage.key(0))).time}
                </span>
              </div>
              <div className="account-info-item">
                <span>Member</span>
              </div>
            </div>
          </div>
          <div className="container-main">
            <div className="container-body">
              <div className="container-body-side">
                <ListInfo />
              </div>
            </div>
            <div className="container-body-container tai-khoan">
              <h2>Danh sách yêu thích</h2>
              <hr />
              <div className="table-responsive">
                <table className="table table-bordered giao-dich-2">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        Hình ảnh
                      </th>
                      <th scope="col" style={{ width: "30%" }}>
                        Tên sản phẩm
                      </th>
                      <th scope="col" className="text-center">
                        Tình trạng
                      </th>
                      <th scope="col" className="text-center">
                        Đơn giá
                      </th>
                      <th scope="col" className="text-center">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  {renderWishList()}
                </table>
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
  const { wishlist } = state.wishlistReducer;
  return {
    userList,
    wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => dispatch(getUser(params)),
    getWishlist: (params) => dispatch(getWishlist(params)),
    deleteWishlist: (params) => dispatch(deleteWishlist(params)),
    addCart: (params) => dispatch(addCart(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
