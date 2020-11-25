import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

import {interpolateBlues, scaleSequential, interpolate} from "d3";

const districts = {
  'Таласская': "Таласская",
  'г.Ош' : 'Ош',
  'Ошская' : 'Ошская',
  'Нарынская' : 'Нарынская',
  'Джалал-Абадская' : 'ДжалалАбадская',
  'Иссык-Кульская' : 'ИКульская',
  'Чуйская' : 'Чуйская', 
  'г.Бишкек' : 'Бишкек',
  'Баткенская' :  'Баткенская'
}

const geoUrl =
  //"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  "https://raw.githubusercontent.com/Xakim1c/parliament-calculator-v2/main/src/data/kg_regions_topo.json"

const getDistrictColor = (district) => {
  if(district == 'г.Бишкек' || district == 'г.Ош'){
    return '#1B4F72'
  }else{
    return '#27AE60'
  }
}

const getColor = (district, data) => { 
  let registered = Number(data[districts[district]])
  let necessary = Number(data[districts[district] + '_All'])
  let percent = (registered/necessary*100).toFixed(0)

  if(percent >= 100){
    return '#48C9B0'
  } 

  if(percent > 80){
    percent = 80
  }

  let color = interpolateBlues(percent/100)

  return color
}

const generateDistrictInfo = (district, data) => { 
  let registered = data[district]
  let necessary = data[district + '_All'] 
  return registered + ' из ' + necessary
}


const colorScale = scaleSequential().domain([0,100]).interpolator(interpolate("white", "blue"));

const MapChart = (props) => {

  console.log('MAP CHART')
  console.log(props)
  let Bishkek = 0
  let Osh = 0
  let ChuyDist = 0
  let TalasDist = 0
  let NarynDist = 0
  let DjalalAbadDist = 0
  let OshDist = 0
  let BatkenDist = 0
  let IKDist = 0

  if(Object.keys(props.data).length !== 0 ){
    Bishkek = props.data['Бишкек']
    Osh = props.data['Ош']
    ChuyDist = props.data['Чуйская']
    TalasDist = props.data['Таласская']
    NarynDist = props.data['Нарынская']
    DjalalAbadDist = props.data['ДжалалАбадская']
    OshDist = props.data['Ошская']
    BatkenDist = props.data['Баткенская']
    IKDist = props.data['ИКульская']
  }
  
  return (
    
      <ComposableMap data-tip="" projection="geoEqualEarth"  width={1000} height={500} projectionConfig={{center: [74.5,41.2],
        scale: 6000}}>
        {/* <ZoomableGroup center={[74.5,41.2]} minZoom={1} maxZoom={1}  zoom={1}>   */}
        {/* onMoveStart={handleMoveStart} onMoveEnd={handleMoveEnd}> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#A9CCE3"
                  geography={geo}
                  onMouseEnter={() => {
                    console.log(geo)
                    const { ADM1_RU, Shape_Area } = geo.properties;
                    //setTooltipContent(`${ADM1_RU} — ${rounded(Shape_Area)}` + ': TEST');
                    props.setTooltipContent(`${ADM1_RU}`);
                  }}
                  onClick={() => {
                    props.onDistrictClick(geo.properties)
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  style={{
                    default: {
                      // fill: getDistrictColor(geo.properties.ADM1_RU),
                      fill: getColor(geo.properties.ADM1_RU, props.data),
                      outline: "none"
                    },
                    hover: {
                      fill: "#5DADE2",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#5499C7",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>

          <Marker coordinates={[75.71,41.30]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('Нарынская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[75.75,41.55]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='16'>
              Нарынская область
            </text>
          </Marker>

          <Marker coordinates={[78.00,42.15]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('ИКульская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[78.00,42.35]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='16'>
              Иссык-Кульская область
            </text>
          </Marker>

          <Marker coordinates={[74.5, 42.50]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('Чуйская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[74.5, 42.70]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='14'>
              Чуйская область
            </text>
          </Marker>

          <Marker coordinates={[75.75, 43.00]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='15'>
              Бишкек ({generateDistrictInfo('Бишкек', props.data)})
            </text>
          </Marker>

          <Marker coordinates={[72.2, 42.30]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('Таласская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[71.95, 42.50]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='14'>
              Таласская область
            </text>
          </Marker>

          <Marker coordinates={[72.65, 41.45]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('ДжалалАбадская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[72.25, 41.70]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='16'>
              Джалал-Абадская область
            </text>
          </Marker>

          <Marker coordinates={[73.4, 40.10]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('Ошская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[73.4, 40.30]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='16'>
              Ошская область
            </text>
          </Marker>

          <Marker coordinates={[73.65, 40.65]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='15'>
              Ош ({generateDistrictInfo('Ош', props.data)})
            </text>
          </Marker>

          <Marker coordinates={[70.75, 39.65]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='20'>
              {generateDistrictInfo('Баткенская', props.data)}
            </text>
          </Marker>

          <Marker coordinates={[70.75, 39.85]} fill="#777">
            <text textAnchor="middle" fill="#212F3D" fontWeight='bold' fontSize='16'>
              Баткенская область
            </text>
          </Marker>

          <Marker coordinates={[74.60,42.85]}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={15}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
            </text>
          </Marker>

          <Marker coordinates={[72.80, 40.55]}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={15}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
            </text>
          </Marker>

        {/* </ZoomableGroup> */}
      </ComposableMap>
  );
};

export default memo(MapChart);
