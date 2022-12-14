import React, { Component, Key, ReactNode } from "react";
import { Client, PostModel } from "../LogicApi/ApiModels";

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
