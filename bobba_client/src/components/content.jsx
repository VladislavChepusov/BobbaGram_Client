import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "../styles/app.css";
export default class Content extends React.Component {
  render(props) {
    return (
      <>
        <div class="ui card">
          <div class="content">
            <div class="right floated meta">{this.props.time}</div>
            <img class="ui avatar image" src={this.props.user} />
            {this.props.name}
          </div>

          <div class="image">
            <img className="Storyimg" src={this.props.url} />
          </div>

          <div class="content">
            <span class="right floated">
              <i class="bookmark outline icon big"></i>
            </span>
            <i class="heart outline icon big"></i>
            <i class="comment outline icon big"></i>
            <i class="paper plane outline icon big"></i>
          </div>
          <div class="extra content">
            <div class="ui large transparent left icon input">
              <i class="heart outline icon"></i>
              <input type="text" placeholder="Add Comment..." />
            </div>
          </div>
        </div>
      </>
    );
  }
}
