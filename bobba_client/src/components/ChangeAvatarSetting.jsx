import React from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import { Client, FileParameter } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import "../styles/app.css";

export default class ChangeAvatarSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      success: null,
      avatar:
        "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    TokenMidelware();
    if (this.fileInput.current.files[0]) {
      var connect = new Client("https://localhost:7277");
      var ChangeAvaRequest = connect.uploadFiles([
        {
          data: this.fileInput.current.files[0],
          fileName: this.fileInput.current.files[0].name,
        },
      ]);

      ChangeAvaRequest.then((res) => {
        connect
          .addAvatarToUser(res[0])
          .then((res2) => {
            console.log("res2", res2);
            this.setState({
              success: "Выполненно успешно!",
              error: null,
            });
          })
          .catch((error2) => {
            console.log("error2", error2);
            this.setState({
              success: null,
              //error: error2.response.replace(/"/g, ""),
              error: "Произошла ошибка!",
            });
          });
      }).catch((error) => {
        this.setState({
          success: null,
          //error: error.response.replace(/"/g, ""),
          error: "Произошла ошибка!",
        });
      });
    }
  }

  render() {
    return (
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            className="rounded-circle mt-5"
            width="150px"
            src={this.state.avatar}
          />
          <br></br>
          <br></br>

          <div className="text-danger">{this.state.error}</div>
          <div className="text-success">{this.state.success}</div>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input
              type="file"
              ref={this.fileInput}
              class="form-control-file btn-info"
              accept="image/* ,video/*"
            />

            <br />
            <button type="submit" class="btn btn-success">
              Сохранить
            </button>
          </form>

          <br />
          <span className="font-weight-bold">
            Надо уметь вовремя изменить себя!
          </span>
          <span className="text-black-50">
            Смена имиджа — фундаментальный шаг к благоприятным переменам.
          </span>
          <span></span>
        </div>
      </div>
    );
  }
}
