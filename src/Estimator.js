//*****************/
//Benchmark Values
//*****************/
/*
//Structural System
const SolidStructure = [379.5, 513.25, 741];
const SkeletonStructure = [431.4, 583.36, 844.2];
const WoodStructure = [-69, 162, 382.8];

const StructBenchmarks = [SolidStructure, SkeletonStructure, WoodStructure];

//Facade Refinement
const FullGlazing = [250, 385, 520];
const HalfGlazing = [160, 236.43, 390];
const SolidWall = [80.18, 92.02, 114.6];
const None = [0,0,0];
*/

//*****************/
//Benchmark Values
//*****************/

const SolidStructure = [379.5, 513.25, 741];
const SkeletonStructure = [431.4, 583.36, 844.2];
const WoodStructure = [-69, 162, 382.8];

const StructBenchmarks = [SolidStructure, SkeletonStructure, WoodStructure];

//Facade Refinement
const FullGlazing = [290, 385, 493];
const HalfGlazing = [169.5, 236.43, 297];
const SolidWall = [81.64, 92.02, 108];
const None = [0,0,0];

const EnvlpBenchmarks = [FullGlazing, HalfGlazing, SolidWall, None];



function EstimatorStructure(Area, NoFloors, StructChoice) {
    var Estimation = [];

    var TotalArea = Area * NoFloors;
    for (var i =0; i<3; i++){
        Estimation[i] = (StructBenchmarks[StructChoice][i] * TotalArea/1000).toFixed(2);
    }

    return Estimation;
}

function EstimatorEnvelope(Estimation, FacadeAreas, FacadeChoices ){
    Estimation[0] = parseFloat(Estimation[0])*0.739;
    Estimation[1] = parseFloat(Estimation[1])*0.739;
    Estimation[2] = parseFloat(Estimation[2])*0.739;

    for (var i = 0; i < FacadeAreas.length; i++) {
        Estimation[0] = (parseFloat(Estimation[0]) + FacadeAreas[i] * EnvlpBenchmarks[FacadeChoices[i]][0]/1000).toFixed(2);
        Estimation[1] = (parseFloat(Estimation[1]) + FacadeAreas[i] * EnvlpBenchmarks[FacadeChoices[i]][1]/1000).toFixed(2);
        Estimation[2] = (parseFloat(Estimation[2]) + FacadeAreas[i] * EnvlpBenchmarks[FacadeChoices[i]][2]/1000).toFixed(2);
      }
    return Estimation;
}

export {EstimatorStructure, EstimatorEnvelope}