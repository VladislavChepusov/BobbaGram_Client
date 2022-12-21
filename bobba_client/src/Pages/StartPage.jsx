import React from "react";
import Header from "../components/Header";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware, IsAuthTokens } from "../LogicApi/RefreshToken";
import "../styles/app.css";
import NotFoundPage from "./NotFoundPage";
import { Navigate } from "react-router-dom";
import ListPost from "../Pages/ListPost";
export default class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      redirect: false,
      redirecLogin: false,
      Contents: null,
    };
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    if (!IsAuthTokens()) {
      this.setState({
        redirecLogin: true,
      });
    }
    // Рефрешы токенов
    TokenMidelware();

    var connect = new Client("https://localhost:7277");
    var UserData = connect.getSubscriptionPosts();
    UserData.then((res) => {
      console.log("startPageres", res);
      this.setState({
        Contents: res,
        isLoaded: true,
        error: false,
      });
      return res.id;
    }).catch((error) => {
      console.log("startPageError", error);
      this.setState({
        error: true,
        isLoaded: true,
      });
    });
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <Header />
          {this.state.redirecLogin ? <Navigate push to="/" /> : null}
          <NotFoundPage />
        </>
      );
    } else if (!this.state.isLoaded) {
      return (
        <div>
          {" "}
          {this.state.redirecLogin ? <Navigate push to="/" /> : null}
          Загрузка....
        </div>
      );
    } else
      return (
        <>
          {this.state.redirecLogin ? <Navigate push to="/" /> : null}
          {this.state.Contents != null && (
            <ListPost POSTS={this.state.Contents} />
          )}
        </>
      );
  }
}
