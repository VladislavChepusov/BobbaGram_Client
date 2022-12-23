import React from "react";

import "../styles/app.css";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import { UserNameInToken } from "../LogicApi/Tokens";
export default class SubscribersUserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,

      IsMe: false,
      IsSubs: false,
      Subscribers: [],
    };

    this._unsubscribe = this._unsubscribe.bind(this);
    this._subscribe = this._subscribe.bind(this);
  }

  _unsubscribe() {
    var connect = new Client("https://localhost:7277");
    connect
      .unSubscribe({
        subUserId: this.props.user_id,
      })
      .then((res) => {
        window.location.href = "/user/" + this.props.user_name;
      })
      .catch((error) => {
        console.log("unSubscribe error " + error);
      });
  }
  _subscribe() {
    var connect = new Client("https://localhost:7277");
    connect
      .subscribe({
        subUserId: this.props.user_id,
      })
      .then((res) => {
        window.location.href = "/user/" + this.props.user_name;
      })
      .catch((error) => {
        console.log("_subscribe error " + error);
      });
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();
    var RealSlimShady = UserNameInToken();
    if (this.props.user_name === RealSlimShady) {
      this.setState({
        IsMe: true,
      });
    }

    var connect = new Client("https://localhost:7277");
    var requestSubscribers = connect.getSubscribers(this.props.user_id);
    requestSubscribers
      .then((Subscribers) => {
        //console.log("resSubscribers " + Subscribers.length);
        this.setState({
          Subscribers,
          isLoaded: true,
          error: false,
        });

        Subscribers.map(
          (_item) =>
            _item.user.name === RealSlimShady &&
            this.setState({
              IsSubs: true,
            })
        );
      })
      .catch((errorSubscribers) => {
        console.log("errorSubscribers", errorSubscribers);
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
          <div data-toggle="modal" data-target="#exampleModalLong2">
            <p className="mb-1 h5">0</p>
            <p className="small text-muted mb-0">Подписчиков</p>
          </div>
        </>
      );
    } else if (!this.state.isLoaded) {
      return <div>Загрузка....</div>;
    } else {
      return (
        <>
          {!this.state.IsMe && (
            <div className="container ">
              {(!this.state.IsSubs && (
                <button
                  type="button"
                  className="btn btn-primary btn-rounded float-left"
                  onClick={this._subscribe}
                >
                  {" "}
                  Подписаться
                </button>
              )) || (
                <button
                  type="button"
                  className="btn btn-primary btn-rounded float-left"
                  onClick={this._unsubscribe}
                >
                  {" "}
                  Отписаться
                </button>
              )}
            </div>
          )}{" "}
          <div data-toggle="modal" data-target="#exampleModalLong2">
            <p className="mb-1 h5">{this.state.Subscribers.length}</p>
            <p className="small text-muted mb-0">Подписчиков</p>
          </div>
          <div
            className="modal fade"
            id="exampleModalLong2"
            tabIndex="2"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Список подписчиков
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

                {this.state.Subscribers.length > 0 && (
                  <ul className="list-group  m-15">
                    {this.state.Subscribers.map((_item) => (
                      <a
                        href={"/user/" + _item.user.name}
                        className=" nav-link  link-dark  "
                      >
                        <br></br>
                        <li key={_item.user.name}>
                          <div className="container border-bottom border-secondary  border-3 rounded-1 rounded-pill">
                            <div className="row">
                              <div className="col-2">
                                <img
                                  className="Storyimg "
                                  src={
                                    _item.user.avatarLink !== null
                                      ? "https://localhost:7277" +
                                        _item.user.avatarLink
                                      : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                                  }
                                />
                              </div>
                              <div className="col-6 ">
                                <div
                                  className="float-left fs-5"
                                  style={{
                                    position: "absolute",
                                    bottom: "25%",
                                  }}
                                >
                                  {_item.user.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </a>
                    ))}

                    <br></br>
                  </ul>
                )}

                {/*

              <div className="modal-body">
                <ul className="float-left list-group ">
                  {this.state.Subscribers.map((_item) => (
                    <li key={_item.user.name} className="list-group-item ">
                      <a
                        href={"/user/" + _item.user.name}
                        className="link-dark"
                      >
                        <div class="container float-left">
                          <div class="row">
                            <div class="col-sm float-left">
                              <img
                                className="Storyimg"
                                src={
                                  _item.user.avatarLink !== null
                                    ? "https://localhost:7277" +
                                      _item.user.avatarLink
                                    : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                                }
                              />
                            </div>
                            <div class="col-sm">{_item.user.name}</div>
                            <div class="col-sm"> </div>
                          </div>
                        </div>
                      </a>
                      <br/>
                    </li>
                  ))}
                </ul>
              </div>

              */}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
