import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";


class Services extends Component {
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
                <fieldset>
                <legend>Heating:</legend>
                <div>
                <input type="checkbox" id="heatpump" name="Heatpump" checked/>
                <label for="scales">Heatpump</label>
                </div>
                <div>
                <input type="checkbox" id="solartherm" name="Solartherm" checked/>
                <label for="scales">Solarthermal</label>
                </div>
                <div>
                <input type="checkbox" id="boiler" name="Boiler"/>
                <label for="horns">Oil/Gas Boiler</label>
                </div>
                <div>
                <input type="checkbox" id="district" name="District"/>
                <label for="horns">District Heating</label>
                </div>
                <div>
                <input type="checkbox" id="noheat" name="NoHeat"/>
                <label for="horns">No Heating/Electrical</label>
                </div>
                </fieldset>
                <fieldset>
                <legend>Electricity:</legend>
                <div>
                <input type="checkbox" id="grid" name="Grid" checked/>
                <label for="scales">Grid</label>
                </div>
                <div>
                <input type="checkbox" id="pv" name="PV"/>
                <label for="horns">Photovoltaic</label>
                </div>                
                </fieldset>
                <fieldset>
                <legend>Cooling:</legend>
                <div>
                <input type="checkbox" id="AC" name="AC" checked/>
                <label for="scales">AC Units</label>
                </div>
                <div>
                <input type="checkbox" id="nocool" name="NoCool"/>
                <label for="horns">No Cooling</label>
                </div>
                </fieldset>
            
            </div>
            )
        }

        else{
            return (
            <button class="refinebutton" onClick={this.handleClick} >Refine Building Services</button>
            )
        }


        }

}
export default Services;