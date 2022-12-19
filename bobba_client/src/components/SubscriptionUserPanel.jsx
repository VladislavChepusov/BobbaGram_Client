import React from "react";

import "../styles/app.css";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";


export default class SubscriptionUserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        subscriptions: [],
    };
  }

  // подгрузка данных
  componentDidMount(prevProps) {
    // Рефрешы токенов
    TokenMidelware();
    
    var connect = new Client("https://localhost:7277");
    var requestSubscription = connect.getSubscription(this.props.user_id);
    requestSubscription
    .then((subscriptions)=>{
    
    
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
  }

  render() {
    return (
      <>
        {" "}
        <div className="px-3">
          <p className="mb-1 h5">{this.state.subscriptions.length}</p>
          <p className="small text-muted mb-0">Подписок</p>
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
