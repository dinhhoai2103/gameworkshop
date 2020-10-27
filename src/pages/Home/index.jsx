import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./styles.css";
import history from "../../util/history";
import moment from "moment";
import { Carousel } from "antd";
import {
  getGameList,
  updateWishlist,
  getCartData,
  addCart,
  getActionGame,
  getAdventureGame,
  getCasualGame,
  getMobileGame,
  getOther,
} from "../../redux/actions";
function Home({
  getGameList,
  gameList,
  updateWishlist,
  cartData,
  getCartData,
  addCart,
  getActionGame,
  getAdventureGame,
  getCasualGame,
  getMobileGame,
  getOther,
  actionGame,
  adventureGame,
  casualGame,
  mobileGame,
  other,
}) {
  useEffect(() => {
    getGameList();
    getActionGame({
      page: 1,
    });
    getAdventureGame({
      page: 1,
    });
    getCasualGame({
      page: 1,
    });
    getMobileGame({
      page: 1,
    });
    getOther({
      page: 1,
    });
  }, []);
  function format2(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const addToWishlist = (item) => {
    if (localStorage.length <= 0) {
      return <div>{history.push("/login")}</div>;
    } else {
      return updateWishlist({
        idUser: JSON.parse(localStorage.getItem(localStorage.key(0))).id,
        idGame: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        amount: item.amount,
      });
    }
  };

  const addToCart = (item) => {
    if (localStorage.length <= 0) {
      return <div>{history.push("/login")}</div>;
    } else {
      return addCart({
        idUser: JSON.parse(localStorage.getItem(localStorage.key(0))).id,
        idGame: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        amount: item.amount,
        soluong: 1,
        isPay: false,
        time: moment().format("HH:mm DD-MM-YYYY"),
      });
    }
  };
  const renderHotGame = () => {
    return gameList.map((item, index) => {
      return (
        item.hot && (
          <div
            key={`hot-${item.id}-${index}`}
            onClick={() => history.push(`/games/${item.id}`)}
          >
            <img src={item.hot} alt=""  style={{ width:'100%'}}/>
          </div>
        )
      );
    });
  };
  const renderActionGame = () => {
    return actionGame.map((item, index) => {
      return (
        <div className=" col-lg-3 col-md-6" key={`game-${item.id}-${index}`}>
          <div className="wrapper" style={{ marginLeft: 10 }}>
            <div className="card card-1">
              <img src={item.image} alt="" />
              <div className="card-info">
                <h5>{item.name}</h5>
                <p>{item.type}</p>
                <p>{format2(item.price)} VNĐ</p>
              </div>
              <div className="info text-center">
                <p
                  className="btn"
                  onClick={() => {
                    addToWishlist(item);
                  }}
                >
                  <i className="fa fa-heart btn-1"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <i className="fa fa-cart-plus btn-2"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => history.push(`/games/${item.id}`)}
                >
                  Chi tiết
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderAdventureGame = () => {
    return adventureGame.map((item, index) => {
      return (
        <div className=" col-lg-3 col-md-6" key={`game-${item.id}-${index}`}>
          <div className="wrapper" style={{ marginLeft: 10 }}>
            <div className="card card-1">
              <img src={item.image} alt="" />
              <div className="card-info">
                <h5>{item.name}</h5>
                <p>{item.type}</p>
                <p>{format2(item.price)} VNĐ</p>
              </div>
              <div className="info text-center">
                <p
                  className="btn"
                  onClick={() => {
                    addToWishlist(item);
                  }}
                >
                  <i className="fa fa-heart btn-1"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <i className="fa fa-cart-plus btn-2"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => history.push(`/games/${item.id}`)}
                >
                  Chi tiết
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderCasualGame = () => {
    return casualGame.map((item, index) => {
      return (
        <div className=" col-lg-3 col-md-6" key={`game-${item.id}-${index}`}>
          <div className="wrapper" style={{ marginLeft: 10 }}>
            <div className="card card-1">
              <img src={item.image} alt="" />
              <div className="card-info">
                <h5>{item.name}</h5>
                <p>{item.type}</p>
                <p>{format2(item.price)} VNĐ</p>
              </div>
              <div className="info text-center">
                <p
                  className="btn"
                  onClick={() => {
                    addToWishlist(item);
                  }}
                >
                  <i className="fa fa-heart btn-1"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <i className="fa fa-cart-plus btn-2"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => history.push(`/games/${item.id}`)}
                >
                  Chi tiết
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderMobileGame = () => {
    return mobileGame.map((item, index) => {
      return (
        <div className=" col-lg-3 col-md-6" key={`game-${item.id}-${index}`}>
          <div className="wrapper" style={{ marginLeft: 10 }}>
            <div className="card card-1">
              <img src={item.image} alt="" />
              <div className="card-info">
                <h5>{item.name}</h5>
                <p>{item.type}</p>
                <p>{format2(item.price)} VNĐ</p>
              </div>
              <div className="info text-center">
                <p
                  className="btn"
                  onClick={() => {
                    addToWishlist(item);
                  }}
                >
                  <i className="fa fa-heart btn-1"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <i className="fa fa-cart-plus btn-2"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => history.push(`/games/${item.id}`)}
                >
                  Chi tiết
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderOther = () => {
    return other.map((item, index) => {
      return (
        <div className=" col-lg-3 col-md-6" key={`game-${item.id}-${index}`}>
          <div className="wrapper" style={{ marginLeft: 10 }}>
            <div className="card card-1">
              <img src={item.image} alt="" />
              <div className="card-info">
                <h5>{item.name}</h5>
                <p>{item.type}</p>
                <p>{format2(item.price)} VNĐ</p>
              </div>
              <div className="info text-center">
                <p
                  className="btn"
                  onClick={() => {
                    addToWishlist(item);
                  }}
                >
                  <i className="fa fa-heart btn-1"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <i className="fa fa-cart-plus btn-2"></i>
                </p>
                <p
                  className="btn"
                  onClick={() => history.push(`/games/${item.id}`)}
                >
                  Chi tiết
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div>
        <Carousel autoplay style={{ paddingTop: 15 }}>
          {renderHotGame()}
        </Carousel>
      </div>

      <div className="games container row">
        <div className="col-lg-12 col-md-12">
          <div className="game-content">
            <div className="">
              <b>ACTION</b>
            </div>
            <div
              className="view-more"
              onClick={() => history.push("/type?type=Action")}
            >
              Xem thêm <i className="fa fa-caret-right"></i>
            </div>
          </div>
        </div>
        {renderActionGame()}
      </div>
      <div className="games container row">
        <div className="col-lg-12 col-md-12">
          <div className="game-content">
            <div className="">
              <b>ADVENTURE</b>
            </div>
            <div
              className="view-more"
              onClick={() => history.push("/type?type=Adventure")}
            >
              Xem thêm <i className="fa fa-caret-right"></i>
            </div>
          </div>
        </div>
        {renderAdventureGame()}
      </div>
      <div className="games container row">
        <div className="col-lg-12 col-md-12">
          <div className="game-content">
            <div className="">
              <b>CASUAL</b>
            </div>
            <div
              className="view-more"
              onClick={() => history.push("/type?type=Casual")}
            >
              Xem thêm <i className="fa fa-caret-right"></i>
            </div>
          </div>
        </div>
        {renderCasualGame()}
      </div>
      <div className="games container row">
        <div className="col-lg-12 col-md-12">
          <div className="game-content">
            <div className="">
              <b>MOBLIE</b>
            </div>
            <div
              className="view-more"
              onClick={() => history.push("/category?category=mobile")}
            >
              Xem thêm <i className="fa fa-caret-right"></i>
            </div>
          </div>
        </div>
        {renderMobileGame()}
      </div>
      <div className="games container row">
        <div className="col-lg-12 col-md-12">
          <div className="game-content">
            <div className="">
              <b>OTHER</b>
            </div>
            <div
              className="view-more"
              onClick={() => history.push("/category?category=other")}
            >
              Xem thêm <i className="fa fa-caret-right"></i>
            </div>
          </div>
        </div>
        {renderOther()}
      </div>
      {localStorage.length <= 0 && (
        <div className="high-line-container high-line-2">
          <div className="container">
            <div className="text-line-though">
              <span>Bạn là người mới?</span>
            </div>
            <div className="text">
              Hãy đăng kí tài khoản để cập nhật những ưu đãi mới nhất từ Website
            </div>
            <span onClick={() => history.push("/register")}>
              <button className="btn-aqua-bg">Đăng ký ngay</button>
            </span>
            <div className="text">
              Hoặc{" "}
              <span onClick={() => history.push("/login")}>
                <b style={{ color: "#fff", cursor: "pointer" }}>đăng nhập</b>
              </span>{" "}
              nếu bạn đã có tài khoản
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  const { gameList } = state.gameDataReducer;
  const { cartData } = state.cartDataReducer;
  const {
    actionGame,
    adventureGame,
    casualGame,
    mobileGame,
    other,
  } = state.homeReducer;
  return {
    gameList,
    cartData,
    actionGame,
    adventureGame,
    casualGame,
    mobileGame,
    other,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGameList: (params) => dispatch(getGameList(params)),
    updateWishlist: (params) => dispatch(updateWishlist(params)),
    getCartData: (params) => dispatch(getCartData(params)),
    addCart: (params) => dispatch(addCart(params)),
    getActionGame: (params) => dispatch(getActionGame(params)),
    getAdventureGame: (params) => dispatch(getAdventureGame(params)),
    getCasualGame: (params) => dispatch(getCasualGame(params)),
    getMobileGame: (params) => dispatch(getMobileGame(params)),
    getOther: (params) => dispatch(getOther(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
