import React from "react";
import history from "../../util/history";
import "./styles.css";

function Footer() {
  return (
    <div id="footer">
      <div className="footer-top">
        <div className="container mt-0">
          <div className="row">
            <div className="col-md-3 col-sm-12 d-flex">
              <div className="img ">
                <img
                  src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Footer/service1.png"
                  alt="GIAO HÀNG SIÊU TỐC"
                />
              </div>
              <div className="footer-content">
              <span>
                  GIAO HÀNG SIÊU TỐC
                </span>
                <p>
                  Hệ thống giao hàng tự động chỉ trong 3 phút
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 d-flex">
              <div className="img">
                <img
                  src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Footer/service2.png"
                  alt="BẢO HÀNH NHANH CHÓNG"
                />
              </div>
              <div className="footer-content">
                <span>
                  BẢO HÀNH NHANH CHÓNG
                </span>
                <p>
                  Mọi yêu cầu hỗ trợ sẽ được đội ngũ tư vấn giải quyết trực
                  tiếp.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 d-flex">
              <div className="img">
                <img
                  src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Footer/service3.png"
                  alt="UY TÍN 5 SAO"
                />
              </div>
              <div className="footer-content">
              <span>
                  UY TÍN 5 SAO
                </span>
                <p>
                  Được cộng đồng bình chọn là shop game uy tín
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 d-flex">
              <div className="img">
                <img
                  src="https://hgeqic7azi.vcdn.com.vn/image/catalog/Footer/service4.png"
                  
                  alt="HỖ TRỢ TẬN TÌNH"
                />
              </div>
              <div className="footer-content">
              <span>
                  HỖ TRỢ TẬN TÌNH
                </span>
                <p>
                  Hệ thống hỗ trợ online liên tục từ 8h - 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-body ml-2">
      <div className="container">
        <div className="row position-relative service">
          <div className="col-md-6 col-lg-3 flex-column">
            <div className="paragraph">GAME WORKSHOP</div>
            <ul>
              <li><a>Game bản quyền là gì?</a></li>
              <li><a>Giới thiệu Shop</a></li>
              <li><a>Điều khoản dịch vụ</a></li>
              <li><a>Chính sách bảo mật</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 flex-column">
            <div className="paragraph">TÀI KHOẢN</div>
            <ul>
              <li>
                <a>Giỏ hàng</a>
              </li>
              <li><a>Đăng kí</a></li>
              <li onClick={() => history.push('/login')}><a>Đăng nhập</a></li>
              <li><a>Sản phẩm đã mua</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 flex-column">
            <div className="paragraph">LIÊN HỆ</div>
            <ul>
              <li>
                <a>Địa chỉ giao dịch trực tiếp</a>
              </li>
              <li>Hotline: <a>0123-456-789</a></li>
              <li>Email: hotro@abc.vn</li>
              <li><a>Fanpage</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3">
          <div  className="social-menu">
            <div className="paragraph">KẾT NỐI VỚI CHÚNG TÔI</div>
            <ul>
              <li><a><i className="fa fa-facebook" /></a></li>
              <li><a><i className="fa fa-envelope" /></a></li>
              <li><a><i className="fa fa-instagram" /></a></li>
              <li><a><i className="fa fa-youtube" /></a></li>
            </ul>
          </div>
          </div>
        </div>
      </div>
      </div>
      <div className="footer-bottom">
        <div className="container-fluid footer-copyright">
        Copyright © 2020 - All rights reserved
        </div>
      </div>
    </div>
  );
}

export default Footer;
