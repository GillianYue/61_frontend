import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import { getPlayer, getTeam, getPlayersOfTeam } from './actions';
import { connect } from 'react-redux';

const styles = {
  layout: {
    width: '100%',
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    
  },
  paper: {
    marginTop: 24,
    marginBottom: 24,
    margin: 'auto',
    padding: 30,
    width: '60%',
    alignSelf: 'center',
  },
};


class Profile extends Component{
      constructor(props) {
        super(props);
        this.state = {
          type: this.props.location.state.type,
          instance: this.props.location.state.instance,
          clubName: this.props.location.state.type === 'team' ? 
          this.props.location.state.instance.ClubName : '',
          clubByIdPlayers: []
      }
      if(this.props.location.state.type==='player'){
      this.props.getTeam(this.props.location.state.instance.ClubID, false);
      }else{ //must be a team
      this.props.getPlayersOfTeam(this.props.location.state.instance.ClubID, false)
      }
    }

    componentDidUpdate(prevProps){
      if(this.props.clubById !== null && this.props.clubById !== prevProps.clubById ) {
        this.setState({clubName: this.props.clubById.ClubName})
      }
      if(this.props.clubByIdPlayers !== null &&
        this.props.clubByIdPlayers !== prevProps.clubByIdPlayers ) {
        this.setState({clubByIdPlayers: this.props.clubByIdPlayers});
      }
    }

  render(){

    const i = this.state.instance;

  return this.state.type === 'player' ? (
    <React.Fragment>

      <main style={styles.layout}>
        <Paper style={styles.paper} >
          <Typography component="h1" variant="h4" align="center"
          style={{marginBottom: 10}}>
            {i.FirstName} {i.LastName}
          </Typography>
          <React.Fragment>
            {
              <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
          InputProps={{
            readOnly: true,
          }}
            label="First Name"
            value={i.FirstName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          InputProps={{
            readOnly: true,
          }}
            label="Last Name"
            value={i.LastName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          InputProps={{
            readOnly: true,
          }}
            label="PlayerID"
            value={i.PlayerID}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          InputProps={{
            readOnly: true,
          }}
            label="TeamID"
            value={i.ClubID}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
          onClick={()=>{
            //jump to team profile
   this.props.getPlayersOfTeam(this.props.clubById.ClubID, false)
            this.setState({type: 'team',
          instance: this.props.clubById});

          }}
          InputProps={{
            readOnly: true,
          }}
            label="Team"
            value={this.state.clubName || ''}
            fullWidth
          />
        </Grid>

      </Grid>

              </React.Fragment>
            }
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  ) : (    <React.Fragment>

    <main style={styles.layout}>
      <Paper style={styles.paper} >
        <Typography component="h1" variant="h4" align="center"
        style={{marginBottom: 10}}>
          {i.ClubName}
        </Typography>
        <React.Fragment>
          {
            <React.Fragment>
    <Grid container spacing={3} style={{marginBottom: 10}}>
      <Grid item xs={12} sm={6}>
        <TextField
        InputProps={{
          readOnly: true,
        }}
          label="LeagueID"
          value={i.LeagueID}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
        InputProps={{
          readOnly: true,
        }}
          label="Team"
          value={this.state.clubName || ''}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
        InputProps={{
          readOnly: true,
        }}
          label="TeamID"
          value={i.ClubID}
          fullWidth
        />
      </Grid>

    </Grid>

    {this.state.clubByIdPlayers.map((player)=>{
      return(<Grid key={player.PlayerID} container={true} direction="row"
      style={{marginTop: 10}}>
      <Grid item xs={12} sm={3}>
        <TextField
        InputProps={{
          readOnly: true,
        }}
          label="PlayerID"
          value={player.PlayerID}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <TextField
        InputProps={{
          readOnly: true,
        }}
        onClick={()=>{
          //jump to player profile
          this.props.getTeam(player.ClubID, false);
          this.setState({type: 'player',
        instance: player});

        }}
          label="Name"
          value={`${player.FirstName} ${player.LastName}`}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
        InputProps={{
          readOnly: true,
        }}
          label="Age"
          value={player.Age}
          fullWidth
        />
      </Grid>
      </Grid>);
    })}

            </React.Fragment>
          }
        </React.Fragment>
      </Paper>
      <Copyright />
    </main>
  </React.Fragment>);
          }
}

function mapReduxStateToProps(reduxState) {
  return {
    clubById: reduxState.global.clubById,
    clubByIdPlayers: reduxState.global.clubByIdPlayers,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayer: (id) => {
      dispatch(getPlayer(id));
    },
    getTeam: (id, own) => {
      dispatch(getTeam(id, own));
    },
    getPlayersOfTeam: (id, own) => {
      dispatch(getPlayersOfTeam(id, own));
    }
  };
};

export default withRouter(connect(mapReduxStateToProps, mapDispatchToProps)(Profile));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center"
    style={{marginTop: 30}} >
        Database CS61 Team 6
    </Typography>
  );
}