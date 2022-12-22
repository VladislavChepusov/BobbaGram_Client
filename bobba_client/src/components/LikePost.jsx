

import React from "react";

export default class LikePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          color:"black",
        };
    
        this.rever = this.rever.bind(this);
      }
    
      rever(event){
        if (this.state.color === "red"){
            this.setState({
                color:"black"
              });   
        }
        else{
            this.setState({
                color:"red"
              });
        }
       

        event.preventDefault();
      }

      

    render(props) {
      return (<>
       {this.props.likes + " liked"}
       <i> </i>
      <i className="heart outline icon big" style={{color:this.state.color}} onClick ={this.rever}> </i></>);
    }
}