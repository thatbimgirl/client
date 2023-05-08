import React, { Component } from "react";
import "./App.css";
import Facade from "./Facade.js";
import Services from "./Services";
import * as ESTM from "./Estimator";
import FacadeForm from "./FacadeForm";

class Form extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        Estimate:'',
        structSystem: '',
        noFloors: '',
        Market:'',
        value: 0,

      };
      //this.handleChange = this.handleChange.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this); 
  };
      


  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  };

  componentDidMount() {
      this.callAPI();
  };
  
  handleStructSystemChange = (event) => {
    this.setState({ structSystem: event.target.value });
  };

  handleNoFloorsChange = (event) => {
    this.setState({ noFloors: event.target.value });
  };
  handleSubmit = (event) =>{
    event.preventDefault();
    //console.log('StructSystem:', this.state.structSystem);
    //console.log('NoFloors:',this.state.noFloors);
    var footprint_from_api = this.state.apiResponse;
    footprint_from_api = footprint_from_api.substring(1, footprint_from_api.length - 1);
    const marketCarbon = 564;
    this.setState({Market: (footprint_from_api * this.state.noFloors* marketCarbon/1000).toFixed(2)});
    this.setState(
      { Estimate: ESTM.EstimatorStructure(footprint_from_api, this.state.noFloors, this.state.structSystem)
      },
      () => {
        console.log(this.state.Estimate);
        const max = Math.max(this.state.Estimate[2],this.state.Market, 260)*1.2;
        //const max = 300;
        this.setState({max: max.toFixed(0)});
        const min = Math.min(this.state.Estimate[0],0);
        const min_px = 0;
        const max_px = 500;
        this.setState({avg_px: (this.state.Estimate[1]/max)*max_px});
        this.setState({mrk_px: (this.state.Market/max)*max_px});
        const imp = this.state.Estimate[2]-Math.max(0,this.state.Estimate[0]);
        this.setState({imp_px:(imp/max)*max_px});
        const impMin = Math.max(this.state.Estimate[0],0);
        this.setState({impMin_px:(impMin/max)*max_px});
        const impMax =this.state.Estimate[2];
        this.setState({impMax_px:(impMax/max)*max_px});

      });
  
    //to do: calculate market
    //to do: facade adjustment
    //to do: servces adjustment
    //to do: finish library

  };
  handleEstimateChange = (newEstimate) => {
    this.setState({ Estimate: newEstimate });
    this.setState(

      () => {
        console.log(this.state.Estimate);
        //const max = Math.max(this.state.Estimate[2],this.state.Market,300)*1.2;
        const max = 300;
        this.setState({max: max.toFixed(0)});
        const min = Math.min(this.state.Estimate[0],0);
        const min_px = 0;
        const max_px = 500;
        this.setState({avg_px: (this.state.Estimate[1]/max)*max_px});
        this.setState({mrk_px: (this.state.Market/max)*max_px});
        const imp = this.state.Estimate[2]-Math.max(0,this.state.Estimate[0]);
        this.setState({imp_px:(imp/max)*max_px});
        const impMin = Math.max(this.state.Estimate[0],0);
        this.setState({impMin_px:(impMin/max)*max_px});
        const impMax =this.state.Estimate[2];
        this.setState({impMax_px:(impMax/max)*max_px});

      });

  };

  render() {


  
      return (
            <div>
              <h1>{this.props.title}</h1>
              <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                <label>
                  Select Structual System:
                  <select value={this.state.structSystem} onChange={this.handleStructSystemChange}>
                    <option value="">Select structural system</option>
                    <option value="0">Solid Structure</option>
                    <option value="1">Skeleton Structure</option>
                    <option value="2">Wood Structure</option>
                  </select>
                </label></div>
                <div><label>
                  Select Number of Floors:
                  <select value={this.state.noFloors} onChange={this.handleNoFloorsChange}>
                    <option value="">Select number of floors</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </label></div>
                <input type="submit" value="Submit" />    
              </form>

              <div>
              <FacadeForm
                Estimate={this.state.Estimate}
                onEstimateChange={this.handleEstimateChange}
              />
              </div>
              <Services/>
              <p id="demo">Embodied carbon: {this.state.Estimate[1]} t CO2e</p>
              </div>
              <div class ="container_row">
                <text class = "scale_middle" style={{marginLeft:this.state.mrk_px}} >▼ Market average</text> 
              </div>
              <div class = "container_row">

              <div class = "layer2">
                  <svg class = "ScoreChart" width="500px" height="20px">
                  <rect class="scorebackground" id="background" width="100%" height= "100%"/>
                  <rect class="imprecision" style={{width: this.state.imp_px}} height="100%" x={this.state.impMin_px}/>
                  <circle class="resultpointer"  style={{cx: this.state.avg_px}} cy="10" r="10"   />
                  </svg>
                </div>
                  <text class = "scale_middle" style={{marginLeft:this.state.impMin_px-15}} > {this.state.Estimate[0]}</text>
                  <text class = "scale_middle" style={{marginLeft:this.state.avg_px-20}} > {this.state.Estimate[1]}</text>  
                  <text class = "scale_middle" style={{marginLeft:this.state.impMax_px-20}} > {this.state.Estimate[2]}</text>  
                  <text class = "scale_right" > {this.state.max}</text> 

                  </div>

          </div>
          

      );
  }

}

export default Form;
//*/