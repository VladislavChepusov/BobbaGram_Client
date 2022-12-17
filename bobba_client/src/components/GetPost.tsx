import React, { Component, Key, ReactNode } from "react";
import { Client, PostModel } from "../LogicApi/ApiModels";
import { withCookies, Cookies } from "react-cookie";
interface UserPosts {
  items: any; //replace any with suitable type
  error: any;
  isLoaded: any;
  // value: string;
}

export default class TestData2 extends Component<{}, UserPosts> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount(): void {
    var connect = new Client("https://localhost:7277");
    var test = connect.getAllPosts(undefined, undefined);

    /*
    let d = new Date();
    var cookies = new Cookies();
    d.setTime(d.getTime() + (60*1000));
    cookies.set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwic2Vzc2lvbklkIjoiMjJmZDYzYjctNjdhNy00YTQwLWI3NjYtNDAzZTAyZjUwNmMyIiwiaWQiOiI3NmRlYzk0OC03YmQzLTRmOTEtOGRkZS1hNWM1OGY2NTJjN2EiLCJuYmYiOjE2NzEyMTAyNTgsImV4cCI6MTY3MTIyMzc1OCwiaXNzIjoiRGlnRGVzIiwiYXVkIjoibW9iaWxlQXBwIn0.Tc9HS_m2ju7uer93zmLP_W_qWgU3mK9ItTN6eovAuec", {path: "/", expires: d});
    */
    //cookies.set('name', name, { path: '/' });

    var test2 = connect.getCurrentUser();
    test2
      .then((res) => {
        console.log("user ok", res);
      })
      .catch((error) => {
        console.log("usererror", error);
      });

    test
      .then((res) => {
        this.setState({
          items: res,
          isLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({
          error,
          isLoaded: true,
        });
      });
  }

  render(): React.ReactNode {
    const { error, items, isLoaded } = this.state;
    if (error) {
      return <div>Возникла ошибка {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка....</div>;
    } else {
      return (
        <ul>
          {items.map((_item: PostModel) => (
            <li key={_item.id}>
              {_item.id} <br></br>
              {_item.author?.email} <br></br>
              {_item.description}
            </li>
          ))}
        </ul>
      );
    }
  }
}
