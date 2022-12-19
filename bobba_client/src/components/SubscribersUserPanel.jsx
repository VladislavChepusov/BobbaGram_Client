import React from "react";

import "../styles/app.css";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";

export default class SubscribersUserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Subscribers: [],
    };
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();
    var connect = new Client("https://localhost:7277");
    var requestSubscribers = connect.getSubscribers(this.props.user_id);
    requestSubscribers
      .then((Subscribers) => {
        console.log("resSubscribers " + Subscribers.length);
        this.setState({
          Subscribers,
        });
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
    return (
      <>
        {" "}
        <div>
          <p className="mb-1 h5">{this.state.Subscribers.length}</p>
          <p className="small text-muted mb-0">Подписчиков</p>
        </div>
      </>
    );
  }
}

/*


    .then((id) =>{

          var requestSubscription = connect.getSubscription(id);
          requestSubscription
          .then((subscriptions)=>{
            console.log("resSubscription "+ subscriptions[0].userId);
            console.log("resSubscription "+ subscriptions.length);
            this.setState({
              subscriptions
            });
          })
          .catch((errorSubscriptions) =>{
            console.log("errorSubscriptions", errorSubscriptions);
            this.setState({
              error: true,
              isLoaded: true,
            });
          });
          return id;
    })

    .then((id) =>{

      var requestSubscribers = connect.getSubscribers(id);
      requestSubscribers
      .then((Subscribers)=>{
        
        console.log("resSubscribers "+ Subscribers.length);
        this.setState({
          Subscribers
        });
      })
      .catch((errorSubscribers) =>{
        console.log("errorSubscribers", errorSubscribers);
        this.setState({
          error: true,
          isLoaded: true,
        });
      });
      return id;
})
*/
