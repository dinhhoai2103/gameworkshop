import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.css";
import history from "../../util/history";
import moment from "moment";
import {
  getGameByCategory,
  updateWishlist,
  addCart,
} from "../../redux/actions";
function Category({ gameData, getGameByCategory, updateWishlist, addCart }) {
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
    },
  ];
  function format2(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [productPage, setProductPage] = useState(1);
  const [productFilter, setProductFilter] = useState({
    sort: "",
    order: "",
  });
  const urlParams = new URL(window.location.href);
  const productType = urlParams.searchParams.get("category");

  useEffect(() => {
    const objectProduct = productType && { type: productType };
    getGameByCategory({
      more: false,
      page: 1,
      sort: "",
      order: "",
      ...objectProduct,
    });
    setProductPage(1);
  }, [productType]);

  const handleLoadMoreProducts = () => {
    getGameByCategory({
      more: true,
      page: productPage + 1,
      sort: productFilter.sort,
      order: productFilter.order,
      ...(productType && { type: productType }),
    });
    setProductPage(productPage + 1);
  };
  const handleClickPriceFilter = (item) => {
    getGameByCategory({
      more: false,
      page: 1,
      sort: item.sort,
      order: item.order,
      ...(productType && { type: productType }),
    });
    setProductFilter({
      sort: item.sort,
      order: item.order,
    });
    setProductPage(1);
  };
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
  const renderSort = () => {
    return sortPrice.map((item, index) => {
      return (
        <span
          key={`sort-${index}`}
          onClick={() => handleClickPriceFilter(item)}
        >
          {item.title}
        </span>
      );
    });
  };
  const renderCategoryGame = () => {
    return gameData.map((item, index) => {
      return (
        item.category && (
          <div
            className=" col-lg-3 col-md-6"
            key={`category-${item.id}-${index}`}
          >
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
                    href=""
                    className="btn"
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    <i className="fa fa-cart-plus btn-2"></i>
                  </p>
                  <p
                    href=""
                    className="btn"
                    onClick={() => history.push(`/games/${item.id}`)}
                  >
                    Chi tiết
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      );
    });
  };
  return (
    <>
      <div className="container row col-lg-12 card-main">
        <div
          className="col-lg-12 col-md-12"
          style={{
            padding: 10,
            marginLeft: 5,
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <div className="game-content">
            <div style={{ textTransform: "uppercase" }}>
              {!productType ? "GAME BY CATEGORY" : productType}
            </div>
            <div className="sort-content">{renderSort()}</div>
          </div>
        </div>
        {renderCategoryGame()}
      </div>
      <div className="btn-more">
        {gameData.length > 142 ? (
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
  const { gameData } = state.gameDataReducer;
  return {
    gameData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGameByCategory: (params) => dispatch(getGameByCategory(params)),
    updateWishlist: (params) => dispatch(updateWishlist(params)),
    addCart: (params) => dispatch(addCart(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
