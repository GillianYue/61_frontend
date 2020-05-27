import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';

import { logout } from '../actions/index';
import { searchPlayers, searchTeams } from '../actions/index';

const styles = {
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid grey`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    marginRight: 10
  },
  link: {
    justifyContent: 'flex-start',
  }
}


class TopBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      dropDown: 1,
  }

}

render(){
    return(
      <div>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} style={styles.appBar}>
              <Toolbar style={styles.toolbar}>
                <Typography variant="h6" color="inherit" noWrap style={{flexGrow: 1}}
                onClick={()=>{ this.props.history.push('/')}}>
                  TransferMarkt
                </Typography>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={this.state.dropDown}
          onChange={(event)=>{this.setState({dropDown: event.target.value})}}
          style={{marginRight: 50}}
        ><MenuItem value={1}>Player</MenuItem>
        <MenuItem value={2}>Team</MenuItem>
      </Select>

      <SearchBar
          onChange={(t) => this.setState({searchText: t})}
          onRequestSearch={() => 
          {
            (this.state.dropDown === 1) ?
            this.props.searchPlayers({
              search_terms: this.state.searchText,
          }): this.props.searchTeams({
            search_terms: this.state.searchText,
          });

            this.props.history.push({
              pathname: '/search',
              state: { search_terms: this.state.searchText,
              searchFor: (this.state.dropDown === 1) ?
            'players':'clubs' }
            })
          }}
          value={this.state.searchText}
          style={{
            margin: '0 auto',
            maxWidth: 1000,
            width: 400,
          marginRight: 100,
          }}/>
                <Grid container direction="row" style={{width: 230, flexDirection: 'row',
              justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Typography variant="button" color="inherit" noWrap style={styles.toolbarTitle}>
                  Welcome back, 
                </Typography>
                  <Link variant="button" color="textPrimary" href="#" style={styles.link}>
                {this.props.username ? this.props.username : "user"}
                  </Link>
                </Grid>
            
            
                <Button href="#" color="primary" variant="outlined" 
  style={{margin: 12}} onClick={()=>{ 
    logout();
    this.props.history.push('/signin')
     }}>
    Logout
  </Button>

              </Toolbar>
            </AppBar>
            </div>
    );
  }

}

  function mapReduxStateToProps(reduxState) {
    return {
      username: reduxState.global.myUsername,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      searchPlayers: (param) => {
        dispatch(searchPlayers(param));
      },
      searchTeams: (param) => {
        dispatch(searchTeams(param));
      },
    };
  };
  
  export default withRouter(connect(mapReduxStateToProps, mapDispatchToProps)(TopBar));