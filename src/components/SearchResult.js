import { connect } from 'react-redux';
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { searchPlayers } from '../actions/index';
import {
  withRouter
} from 'react-router-dom'


const styles = {
  paper: {
    marginTop: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 8,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 8,
  },
  submit: {
    margin: 18,
    marginLeft: 0,
  },
};


class SearchResult extends Component{
  constructor(props) {
    super(props);
    this.state = {
        results: null,
        searchFor: this.props.location.state.searchFor,
  }

  console.log("search terms: "+this.props.location.state.search_terms)
  this.props.searchPlayers({
      search_terms: this.props.location.state.search_terms
  });
}

componentDidUpdate(prevProps){
    if(this.state.searchFor === 'players'){
        this.setState({results: this.props.playersSearch})
    }else if(this.state.searchFor === 'clubs'){
        this.setState({results: this.props.clubsSearch})
    }

}

singleResult(){

}

render(){
  return (
    <Container component="main" maxWidth="xs">
    

    </Container>
  );
}
}

function mapReduxStateToProps(reduxState) {
  return {
    playersSearch: reduxState.global.playersSearch,
    clubsSearch: reduxState.global.clubsSearch,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchPlayers: (param) => {
      dispatch(searchPlayers(param));
    },
  };
};

export default withRouter(connect(mapReduxStateToProps, mapDispatchToProps)(SearchResult));
