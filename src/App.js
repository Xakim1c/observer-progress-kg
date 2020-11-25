import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Typography } from '@material-ui/core';

import Map from './components/RegionsMap'
import CircleProgressBar from './components/CircleProgressBar'

import Tabletop from "tabletop";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {data: {}};
  }    

  componentDidMount() {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1mpsk4sFCmNi96xuSNT0FsazpAx15tgSM3hqEB4kvVQk/edit?usp=sharing',
      simpleSheet: true
    })
      .then((data) => {
        this.setState( {data: data[0]} )
      })
      .catch((err) => console.warn(err));
  }

  handleContentTooltip = (content) => {
    // this.setState({content: content})
    console.log(content)
  }
  
  handeOnDistrictClick = (geoData) => {
    console.log(geoData)
    // let tooltipDataBase = this.resultsDataDisctrictsBase[geoData.ADM1_RU] 
    // let tooltipData = this.resultsDataDisctricts[geoData.ADM1_RU] 
  
    // console.log('STATE handeOnDistrictClick')
    // console.log(geoData.ADM1_RU)
    
    // this.setState({dataForChartDifference: {'district': matchDistrictShow(matchDistrict(geoData.ADM1_RU)), 
    //                                         'base': tooltipDataBase, 
    //                                         'diff': tooltipData}})
  }

	
  render () {

    console.log('RENDER APP')
    console.log(this.state.data)

    let shortage = 0
    let registered = 0
    let necessary = 0 
    let percent = 0
    if(Object.keys(this.state.data).length !== 0 ){
      registered = Number(this.state.data['Зарегистрировалось'])
      necessary = Number(this.state.data['Всего необходимо'])
      shortage = necessary - registered

      percent = (registered/necessary*100).toFixed(0)
    }
    

    return (
      <div className="App">        

      <Grid container justify="center">
          <div style={{width: 300, height: '100%', padding: '20px'}}>
            <h3 style={{color: '#212F3D'}}>
              С нами уже <span style={{color: '#CB4335', fontSize: 22}}>{registered} </span> 
              из {necessary} наблюдателей
            </h3> 
            <CircleProgressBar percent={percent}></CircleProgressBar>        
          </div>

          <div style={{width: 1000, height: '100%'}}>
              <h3 style={{color: '#212F3D'}}>Сколько ещё <span style={{color: '#212F3D', fontSize: 28}}> человек </span>  нужно для прозрачных выборов: <span style={{color: '#CB4335', fontSize: 25}}>{shortage} </span></h3> 
              
              <h4 style={{color: '#212F3D'}}>(Число наблюдателей «Клоопа» по регионам)</h4> 
              <Map 
                setTooltipContent={this.handleContentTooltip} 
                onDistrictClick={this.handeOnDistrictClick} 
                data = {this.state.data}
              />        
          </div>                                               
      </Grid>
	
      </div>
    );
  }
}

export default App;
