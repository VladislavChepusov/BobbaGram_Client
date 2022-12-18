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
          class="btn btn-danger"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Удалить профиль
        </button>

        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Удаление профиля
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Вы уверены,что хотите удалить аккаунт на BobbaGram?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
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
