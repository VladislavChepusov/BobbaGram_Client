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
      countPost: 5,
    };
    this.NextData = this.NextData.bind(this);
  }

  NextData(event) {
    // Рефрешы токенов
    TokenMidelware();
    var connect = new Client("https://localhost:7277");
    var skip = this.state.countPost;
    var UserData = connect.getSubscriptionPosts(skip, 5);
    var oldCont = this.state.Contents;
    UserData.then((res) => {
      console.log("oldCont", oldCont);
      this.setState({
        Contents: oldCont.concat(res),
        countPost: skip + 5,

        isLoaded: true,
        error: false,
      });
      return res.id;
    })
      //.then( window.location.reload())
      .catch((error) => {
        console.log("NewFeedPageError", error);
        this.setState({
          error: true,
          isLoaded: true,
        });
      });

    event.preventDefault();
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
    var UserData = connect.getSubscriptionPosts(0, 5);
    UserData.then((res) => {
      console.log("startPageres", res);
      this.setState({
        Contents: res,
        isLoaded: true,
        error: false,
      });
      return res.id;
    }).catch((error) => {
      console.log("startPage Error", error);
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

          {this.state.Contents.length > 4 && (
            <div class="container px-4">
              <br></br>
              <br></br>
              <div class="row gx-5">
                <button
                  type="submit"
                  onClick={this.NextData}
                  class="btn btn-primary profile-button col-md-8 offset-md-2"
                >
                  Обновить ленту
                </button>
              </div>
              <br></br>
            </div>
          )}
        </>
      );
  }
}
