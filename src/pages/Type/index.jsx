import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.css";
import moment from "moment";
import { getGameByType, updateWishlist, addCart } from "../../redux/actions";
import history from "../../util/history";

function Type({ getGameByType, gameType, updateWishlist, addCart }) {
  function format2(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const sortPrice = [
    {
        title: "Nổi bật",
        sort: "",
        order: "",
    },
    {
        title: "Giá (Thấp > Cao)",
        sort: "price",
        order: "asc",
    },
    {
        title: "Giá (Cao > Thấp)",
        sort: "price",
        order: "desc",
    },
    {
      title: "Tên (A-Z)",
      sort: "name",
      order: "asc",
  },
  {
    title: "Tên (Z-A)",
    sort: "name",
    order: "desc",
  }
]


  const [productPage, setProductPage] = useState(1);
  const [productFilter, setProductFilter] = useState({
    sort: "",
    order: "",
});
  const urlParams = new URL(window.location.href);
  const productType = urlParams.searchParams.get("type");
  useEffect(() => {
    const objectProduct = productType && { type: productType };
    getGameByType({
      more: false,
      page: 1,
      sort: "",
      order: "",
      ...objectProduct,
    });
    setProductPage(1)
  }, [productType]);
  const handleLoadMoreProducts = () => {
    getGameByType({
      more: true,
      page: productPage + 1,
      sort: productFilter.sort,
      order: productFilter.order,
      ...(productType && { type: productType }),
    });
    setProductPage(productPage + 1);
  };
  const handleClickPriceFilter = (item) => {
    getGameByType({
        more: false,
        page: 1,
        sort: item.sort,
        order: item.order,
        ...productType && { type: productType }
    });
    setProductFilter({
      sort: item.sort,
      order: item.order,
  });
    setProductPage(1);
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

  const renderGame = () => {
    return gameType.map((item, index) => {
      return (
        <div className=" col-lg-3 col-md-6" key={`game-${item.id}-${index}`}>
          <div className="wrapper">
            <div className="card">
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
  const renderSort = () => {
    return sortPrice.map((item, index) => {
      return (
        <span 
        key={`sort-${index}`}
        onClick={() => handleClickPriceFilter(item)}
        >
          {item.title}
        </span>
      )
    })
  }
  return (
    <>
      <div className="container row col-lg-12 card-main">
        <div
          className="col-lg-12 col-md-12"
          style={{ padding: 10, marginLeft: 5, marginRight: 10 }}
        >
          <div className="game-content">
            <div style={{ textTransform: "uppercase" }}>
              {!productType ? "GAME BY TYPE" : productType}
            </div>
            <div className="sort-content">
            {renderSort()}
            </div>
          </div>
        </div>
        {renderGame()}
      </div>
      <div className="btn-more">
        {gameType.length > 91 ? (
          <div className="btn btn-danger">Đã tải xong</div>
        ) : (
          <div
            className="btn btn-primary"
            onClick={() => handleLoadMoreProducts()}
          >
            Hiển thị thêm
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { gameType } = state.gameDataReducer;
  const { userList } = state.userListReducer;
  const { cartData } = state.cartDataReducer;
  return {
    gameType,
    userList,
    cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGameByType: (params) => dispatch(getGameByType(params)),
    updateWishlist: (params) => dispatch(updateWishlist(params)),
    addCart: (params) => dispatch(addCart(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Type);
