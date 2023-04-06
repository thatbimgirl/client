import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";


class Facade extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false   } ;
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState(prevState => ({
          toggle: !prevState.toggle
        }));
      }

    render() {
        if (this.state.toggle==true){
        return(
            <div>
            <button class="refinebutton" onClick={this.handleClick} >Close</button>
            <form class= "dropdown">
                  <label class="label">
                  Material Facade 1: 
                  <select >
                      <option value="default">Default</option>
                      <option value="glass">Curtain Wall / Glazing</option>
                      <option value="concreteFac">Solid Wall - Concrete</option>
                      <option value="masonryFac">Solid Wall - Masonry</option>

                  </select>
                  </label>
                  <label class="label">
                  Material Facade 2: 
                  <select >
                      <option value="default">Default</option>
                      <option value="glass">Curtain Wall / Glazing</option>
                      <option value="concreteFac">Solid Wall - Concrete</option>
                      <option value="masonryFac">Solid Wall - Masonry</option>

                  </select>
                  </label>
                  <label class="label">
                  Material Facade 3: 
                  <select >
                      <option value="default">Default</option>
                      <option value="glass">Curtain Wall / Glazing</option>
                      <option value="concreteFac">Solid Wall - Concrete</option>
                      <option value="masonryFac">Solid Wall - Masonry</option>

                  </select>
                  </label>
                  <label class="label">
                  Material Facade 4: 
                  <select >
                      <option value="default">Default</option>
                      <option value="glass">Curtain Wall / Glazing</option>
                      <option value="concreteFac">Solid Wall - Concrete</option>
                      <option value="masonryFac">Solid Wall - Masonry</option>

                  </select>
                  </label>
                  <input type="submit" value="Submit" />        
              </form>
              
              </div>
        )
        }

        else{
            return (
            <button class="refinebutton" onClick={this.handleClick} >Refine Facade</button>
            )
        }


        }

}
export default Facade;