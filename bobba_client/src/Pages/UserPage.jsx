import React from "react";
import Header from "../components/Header";
import Gallary from "../components/Gallary";
import SubscribersUserPanel from "../components/SubscribersUserPanel";
import SubscriptionUserPanel from "../components/SubscriptionUserPanel";
import NotFoundPage from "./NotFoundPage";
import "../styles/app.css";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,

      avaratlink: null,
      email: null,
      username: null,
      description: null,
      date: null,
      PostCount: null,
      id: null,
    };
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();
    var connect = new Client("https://localhost:7277");
    var UserData = connect.getUserByName(this.props.name);

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
            : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
        email: res.email,
        username: res.name,
        date: normDate,
        description: res.about,
        PostCount: res.postsCount,
        id: res.id,
        isLoaded: true,
        error: false,
      });
      return res.id;
    }).catch((error) => {
      console.log("usererror", error);
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
          <NotFoundPage />
        </>
      );
    } else if (!this.state.isLoaded) {
      return <div>Загрузка....</div>;
    } else {
      return (
        <>
          <Header />
          <section className="h-100 gradient-custom-2 ">
            <div className="container py-5 h-100 ">
              <div className="row d-flex justify-content-center align-items-center h-100 ">
                <div className="col col-lg-11 col-xl-11 ">
                  <div className="card ">
                    <div
                      className="rounded-top text-white d-flex flex-row"
                      style={{ backgroundColor: "#000", height: "200px" }}
                    >
                      <div className="ms-4 mt-5 d-flex flex-column">
                        <img
                          className="rounded-circle img-fluid img-thumbnail mt-4 mb-2"
                          //width="150px"

                          style={{ width: "150px", height: "150px", zIndex: 1 }}
                          //  className="rounded-circle img-fluid img-thumbnail mt-4 mb-2"
                          // style={{ width: "150px", height: "150px", zIndex: 1 }}
                          src={this.state.avaratlink}
                        />
                      </div>

                      <div className="ms-3" style={{ marginTop: "130px" }}>
                        <h5>{this.state.username}</h5>
                      </div>
                    </div>

                    <div
                      className="p-4 text-black"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-end text-center py-1">
                        <SubscribersUserPanel
                          user_id={this.state.id}
                          user_name={this.state.username}
                        />
                        <SubscriptionUserPanel user_id={this.state.id} />

                        <div>
                          <a
                            className=" nav-link  link-dark"
                            href={"/userposts/" + this.state.username}
                          >
                            <p className="mb-1 h5">{this.state.PostCount}</p>
                            <p className="small text-muted mb-0">Постов</p>
                          </a>
                        </div>

                        {/*    <div>
                          <p className="mb-1 h5">
                            11
                          </p>
                          <p className="small text-muted mb-0">Подписчиков</p>
                        </div>*/}
                      </div>
                    </div>

                    <div className="card-body p-4 text-black">
                      <div className="mb-5">
                        <p className="lead fw-normal mb-1">About</p>
                        <div
                          className="p-4"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="font-italic mb-1">
                            {this.state.description}
                          </p>
                          <p className="font-italic mb-1"></p>
                        </div>
                      </div>

                      <Gallary name={this.state.username} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }
}
