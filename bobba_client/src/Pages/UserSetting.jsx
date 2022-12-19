import React from "react";
import Header from "../components/Header";
import ChangeAvatarSetting from "../components/ChangeAvatarSetting";
import DeleteUserBtn from "../components/DeleteUserBtn";

import { Navigate } from "react-router-dom";
import { Client, ChangeUser, ChangeUserPassword } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import { RefreshToken } from "../LogicApi/RefreshToken";
import "../styles/app.css";

export default class UserSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorPass: null,
      redirect: false,
      success: null,

      oldPassword: "",
      newPassword: "",
      repeatPassword: "",

      email: "",
      avaratlink: null,
      username: "",
      password: "",
      retrypassword: "",
      date: "",
      description: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeUserData = this.changeUserData.bind(this);
    this.changeUserPassword = this.changeUserPassword.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  // Изменить инфу.
  changeUserData(event) {
    TokenMidelware();
    if (!/[^\s]/gim.test(this.state.username)) {
      this.setState({
        error: "Никнейм не может быть пустым",
      });
    } else {
      var connect = new Client("https://localhost:7277");
      let dateB = new Date(this.state.date);
      //let testDate = new Date("2022-12-17T10:25:40.059Z");
      var chageData = new ChangeUser({
        name: this.state.username,
        email: this.state.email,
        birthDate: dateB,
        about: this.state.description,
      });

      var ChangeUserRequest = connect.changeMyAccount(chageData);
      ChangeUserRequest.then((res) => {
        RefreshToken(localStorage.getItem("refreshToken"));
        this.setState({
          success: "Изменения приняты!",
          error: null,
        });
      }).catch((error) => {
        this.setState({
          success: null,
          //redirect: false,
          error: error.response.replace(/"/g, ""),
        });
      });
    }

    event.preventDefault();
  }

  // Изменить
  changeUserPassword(event) {
    //alert("ddddd")
    TokenMidelware();
    var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
    if (!regularExpression.test(this.state.newPassword)) {
      this.setState({
        errorPass:
          "Новый пароль недостаточно надежен. Необходимо сочетание заглавных букв со строчными, налчие цифр,количество символов от 8 до 15 ",
      });
    } else {
      if (this.state.newPassword !== this.state.repeatPassword) {
        this.setState({
          errorPass: "Пароли не совпадают!",
        });
      } else {
        var connect = new Client("https://localhost:7277");
        var dataPass = new ChangeUserPassword({
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
          retryPassword: this.state.repeatPassword,
        });
        var response = connect.changeMyPassword(dataPass);
        response
          .then((res) => {
            this.setState({
              redirect: true,
            });
          })
          .catch((error) => {
            this.setState({
              redirect: false,
              errorPass: error.response.replace(/"/g, ""),
            });
          });
      }
    }
    event.preventDefault();
  }

  // подгрузка старых данных
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();

    var connect = new Client("https://localhost:7277");
    var UserData = connect.getCurrentUser();
    UserData.then((res) => {
      let d = new Date(res.birthDate);
      var day = d.getDate();
      if (day < 10) day = "0" + day;
      var month = d.getMonth() + 1;
      if (month < 10) month = "0" + month;
      var year = d.getFullYear();
      let normDate = year + "-" + month + "-" + day;

      this.setState({
        avaratlink:
          res.avatarLink !== null
            ? "https://localhost:7277" + res.avatarLink
            : res.avatarLink,
        //avaratlink: 'https://localhost:7277' +res.avatarLink,
        email: res.email,
        username: res.name,
        date: normDate,
        description: res.about,
      });
    }).catch((error) => {
      console.log("usererror", error);
    });
  }

  render() {
    return (
      <>
        <Header />
        {this.state.redirect ? <Navigate push to="/" /> : null}
        <br></br>

        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <ChangeAvatarSetting avaratlink={this.state.avaratlink} />
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Данные пользователя</h4>
                </div>

                <div className="text-danger">{this.state.error}</div>
                <div className="row mt-3">
                  <form onSubmit={this.changeUserData}>
                    <div className="form-outline mb-3">
                      <input
                        className="form-control form-control-lg"
                        type="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name="username"
                        required
                      />
                      <label className="form-label" htmlFor="username">
                        Ваш никнейм
                      </label>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Ваш Email
                      </label>
                    </div>

                    <div className="form-outline mb-3">
                      <textarea
                        className="form-control"
                        // id="exampleFormControlTextarea1"
                        rows="2"
                        type="description"
                        id="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        name="description"
                      ></textarea>
                      <label className="form-label" htmlFor="description">
                        О вас
                      </label>
                    </div>

                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control"
                        min="1910-01-01"
                        max="2023-01-01"
                        required
                        id="date"
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        name="date"
                      />
                      <label htmlFor="inputDate">Введите дату рождения</label>
                    </div>

                    <div className="text-success">{this.state.success}</div>

                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="Submit"
                        //onClick={this.changeUserData}
                      >
                        Сохранить данные
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 py-5">
                <br></br>
                <form onSubmit={this.changeUserPassword}>
                  <div className="d-flex justify-content-between align-items-center experience">
                    <span>
                      <h5>Изменить пароль</h5>
                    </span>

                    <div className=" px-3 p-1 add-experience">
                      <button
                        className="btn btn-primary profile-button"
                        type="Submit"
                        //onClick={this.changeUserPassword}
                      >
                        Сохранить данные
                      </button>
                    </div>
                  </div>
                  <div className="text-danger">{this.state.errorPass}</div>
                  <br></br>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="oldPassword">
                      Старый Пароль
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="floatingPassword"
                      value={this.state.oldPassword}
                      onChange={this.handleInputChange}
                      name="oldPassword"
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="newPassword">
                      Новый пароль
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="newPassword"
                      value={this.state.newPassword}
                      onChange={this.handleInputChange}
                      name="newPassword"
                      required
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="repeatPassword">
                      Повторите пароль
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="repeatPassword"
                      value={this.state.repeatPassword}
                      onChange={this.handleInputChange}
                      name="repeatPassword"
                      required
                    />
                  </div>
                </form>
              </div>
              <br></br>
              <div class="container">
                <div class="row">
                  <div class="col-sm"></div>
                  <div class="col-sm">
                    <DeleteUserBtn />
                  </div>
                  <div class="col-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
