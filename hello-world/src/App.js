import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

function Button(props){
  return (
    <div className="quote-btn">
    <button onClick={props.handler}>{props.text}</button>
    </div>
  )
}

function Tweet(props){
  console.log(props.link)

  return (
    <div className="twitter">
    <a target="_blank" className="twitter-share-button"
  href={props.link}
  data-size="large"><i className="fa fa-twitter-square fa-5x"></i>
</a>
</div>
  )
}

class QuoteContainer extends Component{

componentDidMount(){
  var _this = this;
  this.props.getQuote(_this);
}

  render(){
    return (<Quote quoteData={this.props.quoteData} />)
  }
}

function Quote(props){


     return (
       <div className="quoteBox">
       <div className="quote">
          <p>{props.quoteData.quote} </p>
        </div>
        <div className="author">
          <p>- {props.quoteData.author} </p>
        </div>
        </div>
     )
}

// function Box(props){
  
// }


class App extends Component{
    constructor(props){
    super(props);
    this.state = {quoteData: [], text: ""}
    this.changeQuote = this.changeQuote.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }

  changeQuote(quoteData){
    this.setState({quoteData: quoteData,
      text: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quoteData.quote + '" -' + quoteData.author)})
  } 

  getQuote(){
    var _this = this;
      fetch("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",{
      method: "post",
      headers: new Headers({
        "X-Mashape-Key": "NeWRVUq7wUmshSQsuyV9EBwMfs9qp1M49zejsnYcO0KKCV6GRe",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    }).then(function(res){
      return res.json().then(function(data){
        console.log(data)
        _this.changeQuote(data);
      })
  })}
  
    render() {
      return (
        <div className="App">
        <QuoteContainer getQuote={this.getQuote} quoteData={this.state.quoteData}/>
        <Button text="Random Quote" handler={this.getQuote}/>
        <Tweet link={this.state.text} />
       </div>
    )
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <h1>react in action</h1>
//       </div>
//     );
//   }
// }

export default App;
