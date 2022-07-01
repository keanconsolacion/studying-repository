import React from "react";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

// Getting Context By Consumer

class Button extends React.Component {
  //static contextType = LanguageContext; // By setting contextType, the context object can be accessed through this.context

  renderButton(color) {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {({ language }) => (language === "english" ? "Submit" : "Voorleggen")}
        </LanguageContext.Consumer>
      </button>
    );
  }

  render() {
    // const text = this.context === "english" ? "Submit" : "Voorleggen";
    // return <button className="ui button primary">{text}</button>;

    return (
      <ColorContext.Consumer>
        {(color) => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;
