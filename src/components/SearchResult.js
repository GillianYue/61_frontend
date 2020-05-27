import { connect } from 'react-redux';
import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import SingleResult from './SingleSearchResult';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class SearchResult extends Component{
  constructor(props) {
    super(props);
    this.state = {
        results: [],
        searchFor: this.props.location.state.searchFor,
  }
}

componentDidUpdate(prevProps){
    if(this.state.searchFor === 'players'){
        if(this.props.playersSearch !== prevProps.playersSearch)
        this.setState({results: this.props.playersSearch})
    }else if(this.state.searchFor === 'clubs'){
        if(this.props.clubsSearch !== prevProps.clubsSearch){
        this.setState({results: this.props.clubsSearch})
        }
    }

}

render(){

    var searchDisplay = <div />;

    if(this.state.results.length === 0){
        searchDisplay = <p>No results are found for this term.</p>
    }else{
        searchDisplay = this.state.results.map((instance)=>{
            return(
     <GridListTile cols={2} rows={1} style={{margin: 0, padding: 0, 
        height: 'auto'
     }}
     key={this.state.searchFor === 'players' ? instance.PlayerID: instance.ClubID}>
    {this.state.searchFor === 'players' ? 
    (<Box style={{justifyContent: 'center', alignContent: 'center',
            width: '100%' }} align="center">
            <SingleResult 
            type="player" instance={instance} /> </Box>)
            :
            (<Box style={{justifyContent: 'center', alignContent: 'center',
            width: '100%' }} align="center">
            <SingleResult 
            type="team" instance={instance} />
            </Box>
        )}
        </GridListTile>); }
        )
    }

  return (
    <Container component="main" width="100%" height="100%">
        <Grid align="center" height="100%">
        <GridList cellHeight={400} 
        style={{width: '90%', height: '100%', backgroundColor: '#D5D8DC', 
        borderRadius: 5, padding: 20, marginTop: 30}}>
        {searchDisplay}
        </GridList>
        </Grid>
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
    // searchPlayers: (param) => {
    //   dispatch(searchPlayers(param));
    // },
  };
};

export default withRouter(connect(mapReduxStateToProps, mapDispatchToProps)(SearchResult));


