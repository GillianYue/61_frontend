import React, { Component } from 'react';
import { connect } from 'react-redux';

class Thing extends Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

render(){
    return <div>
    <p>
    hey
    </p>
    </div>; }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = {

 }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thing);
