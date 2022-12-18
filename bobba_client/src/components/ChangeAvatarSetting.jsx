import React from "react";
import Header from "../components/Header";
import { Navigate } from "react-router-dom";
import { Client, ChangeUser, ChangeUserPassword } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import "../styles/app.css";

export default class ChangeAvatarSetting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null,
    };
  }

  render() {
    return (
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
    );
  }
}
