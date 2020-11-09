import React from "react";
import { Button } from "antd";
import history from "../../util/history";
import "./styles.css";
import { connect } from "react-redux";

function NotFound() {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="col-lg-12 col-md-12 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>The page you are looking for not avaible!</p>
                <Button type="danger" onClick={() => history.push("/")}>
                  Go to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const mapStateToProps = (state) => {
  const { userList } = state.userListReducer;
  return {
    userList,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };
export default connect(mapStateToProps)(NotFound);
