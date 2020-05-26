import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getPlayer, getTeam } from './actions';
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

      }
      // this.props.getPlayer(id);
    }

  render(){
  return (
    <React.Fragment>

      <main style={styles.layout}>
        <Paper style={styles.paper} >
          <Typography component="h1" variant="h4" align="center">
            Player/Team name
          </Typography>
          <React.Fragment>
            {
              <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
          disabled
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="playerId"
            name="playerID"
            label="Player ID"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="teamName"
            name="teamName"
            label="Team"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="teamID"
            name="teamID"
            label="Team ID"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Add info to notes"
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
  );
          }
}

function mapReduxStateToProps(reduxState) {
  return {
    // clubById: reduxState.global.clubById,
    // playerById: reduxState.global.playerById,
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
  };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Profile);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center"
    style={{marginTop: 30}} >
        Database CS61 Team 6
    </Typography>
  );
}