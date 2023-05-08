import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";


class Facade extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            toggle: false,
            selectedOption: ""   
        } ;
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    handleClick() {
        this.setState(prevState => ({
          toggle: !prevState.toggle
        }));
      }
    
      handleInputChange(event) {
        const selectedOption = event.target.value;
        this.setState({ selectedOption });
        this.props.onOptionChange(selectedOption);
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
      }

    render() {

        if (this.state.toggle==true){
        return(
            <div>
            <button class="refinebutton" onClick={this.handleClick}  >Close</button>
            <form class= "dropdown" onSubmit={this.handleSubmit}>
                  <div>
                  <label class="label">
                  Material Facade 1: 
                  <select value={this.state.selectedOption} onChange={this.handleInputChange}>
                      <option value="default">Default</option>
                      <option value="0">Full Glazing</option>
                      <option value="1">Half Glazing</option>
                      <option value="2">Solid Wall</option>
                      <option value="3">None</option>

                  </select>
                  </label>
                  </div>
                  <div>
                  <label class="label">
                  Material Facade 2: 
                  <select >
                  <option value="default">Default</option>
                      <option value="0">Full Glazing</option>
                      <option value="1">Half Glazing</option>
                      <option value="2">Solid Wall</option>
                      <option value="3">None</option>

                  </select>
                  </label>
                  </div>
                  <div>
                  <label class="label">
                  Material Facade 3: 
                  <select >
                  <option value="default">Default</option>
                      <option value="0">Full Glazing</option>
                      <option value="1">Half Glazing</option>
                      <option value="2">Solid Wall</option>
                      <option value="3">None</option>

                  </select>
                  </label>
                  </div>
                  <div>
                  <label class="label">
                  Material Facade 4: 
                  <select >
                  <option value="default">Default</option>
                      <option value="0">Full Glazing</option>
                      <option value="1">Half Glazing</option>
                      <option value="2">Solid Wall</option>
                      <option value="3">None</option>

                  </select>
                  </label>
                  </div>

                  <button type="submit">Submit</button>   
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