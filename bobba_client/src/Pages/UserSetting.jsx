import React from "react";
import Header from "../components/Header";

import { Client, ChangeUser } from "../LogicApi/ApiModels";

import { TokenMidelware } from "../LogicApi/RefreshToken";
import "../styles/app.css";

export default class UserSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorPass: null,
      redirect: false,
      success: null,

      email: "",
      username: "",
      password: "",
      retrypassword: "",
      date: "",
      description: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeUserData = this.changeUserData.bind(this);
    //this.changeUserData = this.changeUserData(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  // Submit....
  changeUserData(event) {

    if (!/[^\s]/gim.test(this.state.username)) {
      
      this.setState({
        error: "Никнейм не может быть пустым",
      });
    }
    else{
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
      console.log("res then !!!", res);
      //if (res.ok){
      this.setState({
        success: "Изменения приняты!",
        error: null,
      });
      //}
    }).catch((error) => {
      //console.log("error !!!", error);
      this.setState({
        success: null,
        redirect: false,
        error: error.response.replace(/"/g, ""),
      });
    });

    }

    

    event.preventDefault();
  }

 

  // подгрузка старых данных
  componentDidMount(prevProps) {
    // alert("отстой" );
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
      //description....
      this.setState({
        email: res.email,
        username: res.email,
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
        <br></br>
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="font-weight-bold">Тут может быть кнопка</span>
                <span className="text-black-50">или типо того</span>
                <span></span>
              </div>
            </div>

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
                <div className="d-flex justify-content-between align-items-center experience">
                  <span>Изменить пароль</span>
                  <span className="border px-3 p-1 add-experience">
                    <i className="fa fa-plus"></i>&nbsp;Experience
                  </span>
                </div>
                <div className="col-md-12">
                  <label className="labels">Experience in Designing</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="experience"
                    value=""
                  />
                </div>{" "}
                <br></br>
                <div className="col-md-12">
                  <label className="labels">Additional Details</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="additional details"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
