import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="https://static.coindesk.com/wp-content/uploads/2021/04/dogecoin-710x458.jpg"
          width="300"
          height="450"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i>presents</i>
        </h5>
        <h1>React + Django Job Board</h1>
      </div>
    );
  }
}

export default Header;