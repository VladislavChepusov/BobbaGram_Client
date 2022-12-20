import React from "react";
import NotFoundPage from "./NotFoundPage";
import "../styles/app.css";
import Header from "../components/Header";
import { Client } from "../LogicApi/ApiModels";
import { TokenMidelware } from "../LogicApi/RefreshToken";
import Container from "react-bootstrap/Container";
import Content from "../components/content";

export default class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,

      post: null,
    };
  }

  componentDidMount(prevProps) {
    TokenMidelware();
    var connect = new Client("https://localhost:7277");
    var UserData = connect.getPostById(this.props.id);
    UserData.then((res) => {
      console.log("Post", res);
      this.setState({
        post: res,
        isLoaded: true,
        error: false,
      });
    }).catch((error) => {
      console.log("errorPost", error);
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
          <Container>
            <div className="Main">
              <Content
                name={this.state.post.author.name}
                time={this.state.post.created}
                contents={this.state.post.contents}
                user={
                  this.state.post.author.avatarLink !== null
                    ? "https://localhost:7277" +
                      this.state.post.author.avatarLink
                    : "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
                }
                likes="5k liked"
                description={this.state.post.description}
              />
            </div>
          </Container>
        </>
      );
    }
  }
}
