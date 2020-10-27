import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.css";
import Carousel from "react-bootstrap/Carousel";
import history from "../../util/history";
import { InputNumber, Image } from "antd";
import {
  getGameDetail,
  getComment,
  createComment,
  getGameData,
  addCart,
  updateWishlist,
  getSameGame,
} from "../../redux/actions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
function GameInfo({
  gameDetail,
  getGameDetail,
  match,
  getComment,
  createComment,
  comment,
  game,
  getGameData,
  addCart,
  updateWishlist,
  getSameGame,
  sameGame,
}) {
  useEffect(() => {
    getGameData({
      id: match.params.id,
    });
    getGameDetail({
      id: match.params.id,
    });
    getComment();
  }, [match.params.id]);
  useEffect(() => {
    getSameGame({
      type: game[0]?.type,
      page: 1,
    });
  }, [game]);
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
  function format2(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [valueNumber, setValueNumber] = useState(1);
  function onChange(value) {
    setValueNumber(value);
  }
  const onChangeNumber = (item) => {
    if (localStorage.length <= 0) {
      return <div>{history.push("/login")}</div>;
    } else {
      addCart({
        idUser: JSON.parse(localStorage.getItem(localStorage.key(0))).id,
        idGame: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        amount: item.amount,
        soluong: valueNumber,
        isPay: false,
        time: moment().format("HH:mm DD-MM-YYYY"),
      });
    }
  };
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const createAComment = (values, item) => {
    createComment({
      idCMT: item.id,
      fullname:
        JSON.parse(localStorage.getItem(localStorage.key(0))).firstname +
        " " +
        JSON.parse(localStorage.getItem(localStorage.key(0))).lastname,
      content: values.comment,
      rate: values.rate,
      time: moment().format("HH:mm DD-MM-YYYY"),
    });
  };

  const renderSlideImage = () => {
    return game.map((item, index) => {
      return !item.slide ? (
        <Carousel.Item key={`image-${index}-${item.id}`}>
          <img
            className="d-block image-slide"
            src={item.image}
            style={{ width: "100%", height: 340 }}
          />
        </Carousel.Item>
      ) : (
        item.slide.map((item2, index2) => {
          return (
            <Carousel.Item key={`imageSlide-${item.id}-${index2}`}>
              <Image
                className="d-block image-slide"
                src={item2}
                style={{ width: "100%", height: 340 }}
              />
            </Carousel.Item>
          );
        })
      );
    });
  };

  const renderDetail = () => {
    return game.map((itemGame) => {
      return gameDetail.map((item) => {
        return itemGame.id !== item.id
          ? null
          : item.detail.map((item2) => {
              return (
                <div className="info-body-detail">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<p>${item2.content}</p>`,
                    }}
                  />
                  <img src={item2.image1} alt="" className="col-12 mb-2" />
                </div>
              );
            });
      });
    });
  };
  const renderComment = () => {
    return game.map((itemGame) => {
      return comment.map((item) => {
        return (
          itemGame.id === item.idCMT && (
            <div className="row user-comment">
              <div
                className="col-md-1 col-sm-2 col-xs-2"
                style={{ paddingLeft: "15px" }}
              >
                <img
                  src="https://divineshop.vn/assets/icon/icon-account.png"
                  alt=""
                />
              </div>
              <div className="col-md-11 col-sm-10 col-xs-10">
                <div className="detail_rating d-flex">
                  <b>{item.fullname}</b>
                  <span>
                    <div dangerouslySetInnerHTML={{ __html: `${item.rate}` }} />
                  </span>
                </div>
                <div style={{ paddingBottom: "5px" }} />
                <div className="text-review">{item.content}</div>
                <div style={{ marginTop: "5px", display: "flex" }}>
                  <div style={{ color: "#a37878", fontSize: "16px" }}>
                    <small>{item.time}</small>
                  </div>
                </div>
              </div>
            </div>
          )
        );
      });
    });
  };
  const renderSystem = () => {
    return game.map((itemGame) => {
      return gameDetail.map((item, index2) => {
        return (
          itemGame.id === item.id && (
            <>
              <iframe
                className="p-3 col-lg-12 col-md-12"
                width={1060}
                height={720}
                src={item.video}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <hr />
              <div
                className="info-body"
                key={`game-system-${item.id}-${index2}`}
              >
                <h1 className="p-3">Chi tiết sản phẩm</h1>
                {renderDetail()}

                <hr />
                <h1 className="p-3">{item.name}</h1>
                <div className="pl-3 pr-3">
                  <div className="specs-ner">
                    <ul style={{ listStyle: "none" }}>
                      <li className="gnrl gnrl-dv">Cấu hình tối thiểu</li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">OS</div>
                        <div className="spec-brand spcs-tdr1">{item.os}</div>
                      </li>
                      <li className="grid-row grid-rw-gr">
                        <div className="spec-brand spcs-tdr">Processor</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.processor}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">Memory</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.memory}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-gr">
                        <div className="spec-brand spcs-tdr">Graphics</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.graphics}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">DirectX</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.direct}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-gr">
                        <div className="spec-brand spcs-tdr">Storage</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.storage}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">Network</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.network}
                        </div>
                      </li>

                      <li className="gnrl gnrl-dv">Cấu hình đề nghị</li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">OS</div>
                        <div className="spec-brand spcs-tdr1">{item.os2}</div>
                      </li>
                      <li className="grid-row grid-rw-gr">
                        <div className="spec-brand spcs-tdr">Processor</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.processor2}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">Memory</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.memory2}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-gr">
                        <div className="spec-brand spcs-tdr">Graphics</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.graphics2}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-wh">
                        <div className="spec-brand spcs-tdr">DirectX</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.direct2}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-gr">
                        <div className="spec-brand spcs-tdr">Storage</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.storage2}
                        </div>
                      </li>
                      <li className="grid-row grid-rw-wh pb-0">
                        <div className="spec-brand spcs-tdr">Network</div>
                        <div className="spec-brand spcs-tdr1">
                          {item.network2}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
        );
      });
    });
  };
  const renderGameDetail = () => {
    return game.map((item, index2) => {
      return (
        <div className="info-main" key={`game-detail-${item.id}-${index2}`}>
          <div className="cls-cmbheader-otr col-lg-12 col-md-12">
            <div className="cls-cmbheader-left" />
            <div className="cls-cmbheader-middle">THÔNG TIN GAME</div>
            <div className="cls-cmbheader-right" />
          </div>
          <div className="info-header container row">
            <Carousel
              fade={true}
              activeIndex={index}
              onSelect={handleSelect}
              className="col-lg-6 pt-2"
              interval={3000}
              style={{ height: 350 }}
            >
              {renderSlideImage()}
            </Carousel>
            <div className="info-name col-lg-6 ">
              <h1>{item.name}</h1>
              <h4>Thể loại: {item.type}</h4>
              <div className="sp-info-top">
                <div className="sp-info-top-item col-md-4 col-xs-4 col-sm-4">
                  <div className="sp-info-top-item-icon">
                    <img
                      style={{ width: "20px" }}
                      src="https://divineshop.vn//assets/resources/item-icon-1.png"
                    />
                  </div>
                  <div className="text-wrap">
                    <div className="text">
                      Mã sản phẩm: <span className="text-1">{item.id}</span>
                    </div>
                  </div>
                </div>
                <div className="sp-info-top-item col-md-4 col-xs-4 col-sm-4">
                  <div className="sp-info-top-item-icon">
                    <img
                      style={{ width: "20px" }}
                      src="https://divineshop.vn//assets/resources/item-icon-2.png"
                    />
                  </div>
                  <div className="text-wrap">
                    <div className="text">Tình trạng</div>
                    <span style={{ color: "#53af2e", fontWeight: "bold" }}>
                      Kho: {item.amount}
                    </span>
                  </div>
                </div>
                <div className="sp-info-top-item col-md-4 col-xs-4 col-sm-4">
                  <div className="sp-info-top-item-icon">
                    <img
                      style={{ width: "35px" }}
                      src="https://divineshop.vn//assets/resources/item-icon-3.png"
                    />
                  </div>
                  <div className="text-wrap">
                    <div className="text">Link gốc</div>
                    <p>
                      <a
                        href="https://store.steampowered.com/app/1097150/Fall_Guys_Ultimate_Knockout/?snr=1_7_7_151_150_1"
                        target="_blank"
                        rel="nofollow"
                      >
                        Sản phẩm
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="sp-price-text">Giá sản phẩm</div>
              <div className="price">{format2(item.price)} VNĐ</div>
              <div id="product">
                <hr />
                <div className="row bar-info-product d-flex">
                  <div
                    className="col-md-3 col-xs-12"
                    style={{ padding: "0 0 10px 15px" }}
                  >
                    <label>Số lượng:</label>
                    <br />
                    <InputNumber
                      min={1}
                      defaultValue={1}
                      onChange={(value) => onChange(value)}
                    />
                  </div>
                  <div className="col-md-9 col-xs-12 bar-buy-product">
                    <button
                      className="btn-cart btn btn-success mr-2"
                      onClick={() => {
                        onChangeNumber(item);
                        if (item.amount > 0) {
                          setTimeout(function () {
                            history.push("/cart");
                          }, 100);
                        }
                      }}
                    >
                      <span>Mua ngay</span>
                    </button>
                    <button
                      className="btn-cart btn btn-info"
                      onClick={() => onChangeNumber(item)}
                    >
                      <span>
                        <i className="fa fa-shopping-cart"> </i> &nbsp;Thêm vào
                        giỏ
                      </span>
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="cls-cmbheader-otr col-lg-12 col-md-12">
            <div className="cls-cmbheader-left" />
            <div className="cls-cmbheader-middle">GIỚI THIỆU GAME</div>
            <div className="cls-cmbheader-right" />
          </div>

          {renderSystem()}
          <hr />

          <h2
            className="col-lg-8 col-md-8"
            style={{
              margin: "auto",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {" "}
            Gửi câu hỏi và ý kiến của bạn về sản phẩm (Chúng tôi sẽ phản hồi
            trong 5 phút)
          </h2>

          <hr />

          {localStorage.length <= 0 ? (
            <button
              className="btn btn-info m-3"
              onClick={() => history.push("/login")}
            >
              Đăng nhập để bình luận
            </button>
          ) : (
            <div className="form-group col-lg-12 col-md-12 p-3">
              <Formik
                initialValues={{
                  rate: "",
                  comment: "",
                }}
                validationSchema={Yup.object({
                  rate: Yup.string().required("Vui lòng đánh giá"),
                  comment: Yup.string().required("Vui lòng viết nhận xét"),
                })}
                onSubmit={(values, { resetForm }) => {
                  createAComment(values, item);
                  resetForm({ values: "" });
                }}
              >
                <Form>
                  <div className="stars">
                    <form action>
                      <Field
                        className="star star-5"
                        id="star-5"
                        type="radio"
                        name="rate"
                        value="<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>"
                      />
                      <label className="star star-5" htmlFor="star-5" />
                      <Field
                        className="star star-4"
                        id="star-4"
                        type="radio"
                        name="rate"
                        value="<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>"
                      />
                      <label className="star star-4" htmlFor="star-4" />
                      <Field
                        className="star star-3"
                        id="star-3"
                        type="radio"
                        name="rate"
                        value="<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>"
                      />
                      <label className="star star-3" htmlFor="star-3" />
                      <Field
                        className="star star-2"
                        id="star-2"
                        type="radio"
                        name="rate"
                        value="<i class='fa fa-star'></i><i class='fa fa-star'></i>"
                      />
                      <label className="star star-2" htmlFor="star-2" />
                      <Field
                        className="star star-1"
                        id="star-1"
                        type="radio"
                        name="rate"
                        value="<i class='fa fa-star'></i>"
                      />
                      <label className="star star-1" htmlFor="star-1" />
                      <div className="text-danger m-2">
                        <ErrorMessage name="rate" />
                      </div>
                    </form>
                  </div>
                  <div className="form-row mt-1">
                    <div className="form-group col-md-12">
                      <Field
                        type="text"
                        className={`form-control`}
                        placeholder="Viết nhận xét"
                        name="comment"
                        as="textarea"
                      />
                      <div className="text-danger m-2">
                        <ErrorMessage name="comment" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-success">
                    Gửi nhận xét
                  </button>
                </Form>
              </Formik>
            </div>
          )}
          <hr />
          {renderComment()}
          <div className="games container row">
            <div className="col-lg-12 col-md-12">
              <div className="game-content">
                <div className="">
                  <b>SẢN PHẨM TƯƠNG TỰ</b>
                </div>
                <div
                  className="view-more"
                  onClick={() => history.push(`/type?type=${game[0]?.type}`)}
                >
                  Xem thêm <i className="fa fa-caret-right"></i>
                </div>
              </div>
            </div>
            {renderSameGame()}
          </div>
        </div>
      );
    });
  };
  const renderSameGame = () => {
    return sameGame.map((item, index) => {
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
  return <div className="container">{renderGameDetail()}</div>;
}

const mapStateToProps = (state) => {
  const { gameDetail, game } = state.gameDataReducer;
  const { comment } = state.commentReducer;
  const { sameGame } = state.homeReducer;
  return {
    gameDetail,
    comment,
    game,
    sameGame,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGameData: (params) => dispatch(getGameData(params)),
    getGameDetail: (params) => dispatch(getGameDetail(params)),
    getComment: (params) => dispatch(getComment(params)),
    createComment: (params) => dispatch(createComment(params)),
    addCart: (params) => dispatch(addCart(params)),
    updateWishlist: (params) => dispatch(updateWishlist(params)),
    getSameGame: (params) => dispatch(getSameGame(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
