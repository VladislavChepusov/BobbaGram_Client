import React from "react";
import Header from "./Header";
import { Navigate } from "react-router-dom";
import { Client, ChangeUser, ChangeUserPassword } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import "../styles/app.css";

export default class DeleteUserBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      redirect: null,
    };

    this.DeleteMe = this.DeleteMe.bind(this);
  }
  DeleteMe(event) {
    TokenMidelware();

    var connect = new Client("https://localhost:7277");
    connect
      .deleteMyAccount()
      .then((res) => {
        this.setState({
          redirect: true,
        });
      })
      .catch((error) => {
        this.setState({
          redirect: false,
          error: error.response.replace(/"/g, ""),
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Navigate push to="/" /> : null}

        <div className="text-danger">{this.state.error}</div>
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Удалить профиль
        </button>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Удаление профиля
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Вы уверены,что хотите удалить аккаунт на BobbaGram?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={this.DeleteMe}
                >
                  Да
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
