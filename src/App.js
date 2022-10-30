import './App.css';
import React, { Component } from 'react'
import NabBar from './components/NabBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {

  state ={
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  c= 'jhon'
  render() {
    return (
      <div>
         <Router>
        <NabBar></NabBar>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          {/* <Route exact path="/"> element={<News setProgress={this.setProgress} PageSize={4} country="in" category="general"/>}</Route> */}
          <Route exact path="/" element = {<News setProgress={this.setProgress} key={"general"} pageSize = {5} country = "in" category = "general"/>}/>
         <Route exact path="/business" element = {<News setProgress={this.setProgress} key={"business"} pageSize = {5} country = "in" category = "business"/>}/>
         <Route exact path="/entertainment" element = {<News setProgress={this.setProgress} key={"entertainment"} pageSize = {5} country = "in" category="entertainment"/>}/>
         <Route exact path="/health" element = {<News setProgress={this.setProgress} key={"health"} pageSize = {5} country = "in" category = "health"/>}/>
         <Route exact path="/science" element = {<News setProgress ={this.setProgress} key={"science"} pageSize = {5} country = "in" category = "science"/>}/>
         <Route exact path="/sports" element = {<News setProgress={this.setProgress}  key={"sports"}pageSize = {5} country = "in" category = "sports"/>}/>
         <Route exact path="/technology" element = {<News setProgress={this.setProgress} key={"technology"} pageSize = {5} country = "in" category = "technology"/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}
