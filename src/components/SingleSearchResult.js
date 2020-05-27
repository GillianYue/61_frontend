import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

class SingleResult extends Component{
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            instance: this.props.instance,
            type: this.props.type
      }
    
    }

    render(){
        const p = this.state.instance;
        const content = this.props.type === 'player' ? 
        (  <Grid container={true} justify="flex-start" alignItems="center">
        <Box style={{borderRadius: 8, backgroundColor: 'lavender',
        paddingTop: 0, paddingBottom: 2, padding: 5, marginLeft: 15 }}>
        <Typography variant="h6" align="center"
        style={{margin: 0}}>
          Player
        </Typography>
        </Box>
    
        <Box style={{ width: '10%', marginLeft: 30 }}>
        <Typography variant="h6" align="center">
          id: {p.PlayerID}
        </Typography>
    </Box>

    <Box style={{ width: '50%', marginLeft: 30 }}>
        <Typography variant="h6" align="center">
          {p.FirstName} {p.LastName}
        </Typography>
    </Box>
    
        <Typography style={{ marginLeft: 30 }}
        variant="h6" align="center">
          ClubID: {p.ClubID}
        </Typography> </Grid> ) 

        : 

        ( <Grid container={true} justify="flex-start" alignItems="center">
            <Box style={{borderRadius: 8, backgroundColor: 'yellow',
            paddingTop: 0, paddingBottom: 2, padding: 5, marginLeft: 15 }}>
            <Typography variant="h6" align="center"
            style={{margin: 0}}>
              Club
            </Typography>
            </Box>
        
            <Box style={{ width: '10%', marginLeft: 25 }}>
            <Typography variant="h6" align="center">
              id: {p.ClubID}
            </Typography>
        </Box>
    
        <Box style={{ width: '50%', marginLeft: 25 }}>
            <Typography variant="h6" align="center">
              {p.ClubName}
            </Typography>
        </Box>
        
            <Typography variant="h6" align="center">
              LeagueID: {p.LeagueID}
            </Typography> </Grid>);
    return (
        <Paper key={p.PlayerID} 
        onClick={()=>{
            this.props.history.push({
                pathname: '/profile',
                state: { type: this.props.type,
            instance: this.props.instance }
              });
            }}
        style={{opacity: this.state.opacity,
            marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    width: '95%',
padding: 8}}
        onMouseEnter={() => this.setState({ opacity: 0.8 })}
        onMouseLeave={() => this.setState({ opacity: 1 })}
        >
          {content}
    
        </Paper>
    );
    }
}

export default withRouter(SingleResult);