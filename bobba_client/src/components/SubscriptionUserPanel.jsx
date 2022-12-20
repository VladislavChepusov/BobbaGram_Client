import React from "react";

import "../styles/app.css";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";

export default class SubscriptionUserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,

      Subscriptions: [],
    };
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();
    var connect = new Client("https://localhost:7277");
    var requestSubscriptions = connect.getSubscription(this.props.user_id);
    requestSubscriptions
      .then((Subscriptions) => {
        console.log("resSubscriptions " + Subscriptions.length);
        this.setState({
          Subscriptions,
          isLoaded: true,
          error: false,
        });
      })
      .catch((errorSubscriptions) => {
        console.log("errorSubscriptions", errorSubscriptions);
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
          <div
            className="px-3"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            <p className="mb-1 h5">0</p>
            <p className="small text-muted mb-0">Подписок</p>
          </div>
        </>
      );
    } else if (!this.state.isLoaded) {
      return <div>Загрузка....</div>;
    } else {
      return (
        <>
          {" "}
          <div
            className="px-3"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            <p className="mb-1 h5">{this.state.Subscriptions.length}</p>
            <p className="small text-muted mb-0">Подписок</p>
          </div>
          <div
            className="modal fade"
            id="exampleModalLong"
            tabIndex="1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Список подписок
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

                {this.state.Subscriptions.length > 0 && (
                  <ul className="list-group  m-15">
                    {this.state.Subscriptions.map((_item) => (
                      <a
                        href={"/user/" + _item.subUser.name}
                        className=" nav-link  link-dark  "
                      >
                        <br></br>
                        <li key={_item.subUser.name}>
                          <div className="container border-bottom border-secondary  border-3 rounded-1 rounded-pill">
                            <div className="row">
                              <div className="col-2">
                                <img
                                  className="Storyimg "
                                  src={
                                    _item.subUser.avatarLink !== null
                                      ? "https://localhost:7277" +
                                        _item.subUser.avatarLink
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
                                  {_item.subUser.name}
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
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
