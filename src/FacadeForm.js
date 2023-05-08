import React, { Component } from "react";
import { EstimatorEnvelope } from "./Estimator";
import "./App.css";
class FacadeForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption1: "",
      selectedOption2: "",
      selectedOption3: "",
      selectedOption4: "",
      toggle: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  
  handleClick() {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  handleInputChange1 = (event) => {
    this.setState({ selectedOption1: event.target.value });
  };
  handleInputChange2 = (event) => {
    this.setState({ selectedOption2: event.target.value });
  };
  handleInputChange3 = (event) => {
    this.setState({ selectedOption3: event.target.value });
  };
  handleInputChange4 = (event) => {
    this.setState({ selectedOption4: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const FacadeAreas= [68.05,145.34,68.05,145.35];
    const { Estimate, onEstimateChange } = this.props;
    const Choices = [this.state.selectedOption1,this.state.selectedOption2,this.state.selectedOption3,this.state.selectedOption4];
    const newEstimate = EstimatorEnvelope(Estimate,FacadeAreas, Choices)
    //const newEstimate = [this.state.selectedOption, Estimate[1], Estimate[2]];
    
    console.log(newEstimate);
    onEstimateChange(newEstimate);
  };

  render() {
    if (this.state.toggle==true){
      return (
        <div>
        <button class="refinebutton" onClick={this.handleClick}  >Close</button>
          <form class="dropdown" onSubmit={this.handleSubmit}>
            <div>
            <label class="label">
              Select Facade 1:
              <select value={this.state.selectedOption1} onChange={this.handleInputChange1}            >
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
              Select Facade 2:
              <select value={this.state.selectedOption2} onChange={this.handleInputChange2}            >
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
              Select Facade 3:
              <select value={this.state.selectedOption3} onChange={this.handleInputChange3}            >
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
              Select Facade 4:
              <select value={this.state.selectedOption4} onChange={this.handleInputChange4}            >
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
        <button class="refinebutton" onClick={this.handleClick} >Refine Building Envelope</button>
        )
    }
  }
}

export default FacadeForm;
