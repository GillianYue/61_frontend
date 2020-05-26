import { connect } from 'react-redux';
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { login } from './actions/index';
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


class SignIn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
  }

}

componentDidUpdate(prevProps){
  if(this.props.signin_success !== prevProps.signin_success && 
    this.props.signin_success === 'success') {
      this.props.history.push('/')
  }
}

render(){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={styles.paper}>
        <Avatar style={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={styles.form} noValidate>
          <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={this.state.username}
                onChange={(event)=>{
                  this.setState({username: event.target.value})}}
                autoFocus
                autoComplete="username"
          />
          <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={(event)=>{
                this.setState({password: event.target.value})}}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={styles.submit}
            onClick={() => { 

              const data={
                username: this.state.username,
                password: this.state.password
              }
              this.props.login(data) }}
          >
            Sign In
          </Button>

        </form>
      </div>

    </Container>
  );
}
}

function mapReduxStateToProps(reduxState) {
  return {
    signin_success: reduxState.global.signin_success,
    myClubId: reduxState.global.myClubId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (param) => {
      dispatch(login(param));
    },
  };
};

export default withRouter(connect(mapReduxStateToProps, mapDispatchToProps)(SignIn));
