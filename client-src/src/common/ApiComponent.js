 
import React from 'react'
import Fetch from 'react-fetch'
 
export default class App extends React.Component{
 
  render(){
    return (
      <Fetch url="http://api.openweathermap.org/data/2.5/weather?q=London,uk">
        <TestComponent/>
      </Fetch>
    )
  }
 
}
 
class TestComponent extends React.Component{
  render(){
    console.log(this.props)
    return <div/>
  }
}
React.render(<App />, document.getElementById('app'));
 