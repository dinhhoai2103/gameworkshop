import React, { useEffect } from "react";
import { connect } from "react-redux";
import banner from "../../../images/banner.png";
import user from "../../../images/user.svg";
import history from "../../../util/history";
import ListInfo from "../ListInfo";
import { getHistory, deleteHistory } from "../../../redux/actions";
import "./styles.css";
function History({
  getHistory,
  historyData,
  deleteHistory
}) {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(localStorage.key(0))))
    getHistory({
      id: JSON.parse(localStorage.getItem(localStorage.key(0))).id
    });
  }, []);
  function format2(n) {
    return  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const renderHistory = () => {
      return historyData.map((item, index) => {
           return (
            <tbody key={`wishlist-${item.id}-${index}`}>
              <tr>
                <td className="text-center">
                  <span onClick={() => history.push(`/games/${item.idGame}`)}>
                    <img
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
                  
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {item.time}
                    </span>
                  
                </td>
                <td className="text-center">{format2(item.price)} x {item.soluong} = {format2(item.price*item.soluong)} VNĐ </td>
                <td className="text-center">
                  
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteHistory({
                      id: item.id
                    })}
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
                  <h2>Lịch sử mua hàng</h2>
                  <hr />
                  <div className="table-responsive">
                    <table className="table table-bordered giao-dich-2">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">
                            Hình ảnh
                          </th>
                          <th scope="col" style={{ width: "20%" }} className="text-center">
                            Tên sản phẩm
                          </th>
                          <th scope="col" style={{ width: "20%" }}className="text-center">
                            Ngày mua
                          </th>
                          <th scope="col"  style={{ width: "30%" }} className="text-center">
                          Đơn giá x Số lượng
                          </th>
                          <th scope="col" className="text-center">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                    
                    {renderHistory()}
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
  const { historyData } = state.cartDataReducer;
  return {
    historyData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (params) => dispatch(getHistory(params)),
    deleteHistory: (params) => dispatch(deleteHistory(params)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
