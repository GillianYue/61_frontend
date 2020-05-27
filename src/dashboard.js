import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPackages, getTeam, getPackage, getPlayersOfTeam,
searchPlayers, searchTeams } from './actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import MaterialTable from "material-table";
import IconButton from '@material-ui/core/IconButton';

//
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
//

import { FaPlusSquare as AddIcon } from 'react-icons/fa';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
        Database CS61 Team 6
    </Typography>
  );
}

const tiers = [
  {
    title: 'Request Package 1',
    player: 'player 1',
    subheader: 'buy',
    description: ['some description', ],
    buttonText: 'Accept',
    buttonText2: 'Decline',
    buttonVariant: 'outlined',
  },
  {
    title: 'Request Package 2',
    subheader: 'sell',
    player: 'some person',
    description: [
      'blah',
    ],
    buttonText: 'Accept',
    buttonText2: 'Decline',
    buttonVariant: 'contained',
  },
  {
    title: 'Package 32',
    player: 'player',
    description: [
      'bleh',
    ],
    buttonText: 'Accept',
    buttonText2: 'Decline',
    buttonVariant: 'outlined',
  },
  {
    title: 'Package 33',
    player: 'player',
    description: [
      'bleh',
    ],
    buttonText: 'Accept',
    buttonText2: 'Decline',
    buttonVariant: 'outlined',
  },
  {
    title: 'Package 34',
    player: 'player',
    description: [
      'bleh',
    ],
    buttonText: 'Accept',
    buttonText2: 'Decline',
    buttonVariant: 'outlined',
  },
  {
    title: 'Package 35',
    player: 'player',
    description: [
      'bleh',
    ],
    buttonText: 'Accept',
    buttonText2: 'Decline',
    buttonVariant: 'outlined',
  },
];

const styles = {
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: 10,
  },
  footer: {
    marginTop: 60,
    paddingTop: 24,
    paddingBottom: 24,
  },
  cr: {
    marginBottom: 40,
  },
  gl: {
    width: 350,
    maxHeight: 580,
    overflow: 'auto',
    transform: 'translateZ(0)',
    padding: 20, 
    height: "70%", 
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingLeft: 30
  },
  hoverOpacity: {
    opacity: 0.8,
  },
  unhoverOpacity: {
    opacity: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    outline: 0
  },
  paper: {
    backgroundColor: '#eeeeee',
    borderWidth: 0,
    borderRadius: 10,
    padding: 30,
    width: 750,
    height: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
};

class PendingPackage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
  }
}

  render(){
    const tier = this.props.tier;
  return (              
    <GridListTile style={{width: '100%'}}
    key={tier.title} cols={2} rows={1}>

    <Card style={{ width: '90%', alignSelf: 'center', margin: 10, opacity: this.state.opacity}}
    onMouseEnter={() => this.setState({opacity: 0.6})}
        onMouseLeave={() => this.setState({opacity: 1})}
        onClick={()=> this.props.click(this.props.tier)}>
          <CardHeader
          style={{height: 30, backgroundColor: '#aaaaaa'}}
            title={tier.title}
            titleTypographyProps={{ align: 'center', variant:'body1' }}
          />
          <CardContent>
            <div>
            <Typography variant="body1" color="textSecondary">
                requested: 
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {' '+tier.player}
              </Typography>
  
            </div>
            <ul>
              {tier.description.map((line) => (
                <Typography component="li" variant="subtitle1" align="center" key={line}>
                  {line}
                </Typography>
              ))}
            </ul>
          </CardContent>
          <CardActions>
            <Button fullWidth variant='contained' color="primary" 
            style={{height: 35, alignItems: 'center', justifyContent: 'center'}}>
              <Typography variant="button">
              {tier.buttonText}
              </Typography>
            </Button>
            <Button fullWidth variant='outlined' color="primary"
            style={{height: 35, alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="button">
              {tier.buttonText2}
              </Typography>
            </Button>
          </CardActions>
        </Card>
  
      </GridListTile>
      )
        }

}

class Dashboard extends Component{

  constructor(props) {
    super(props);
    this.state = {

      // material table stuff
      columns: [
          { title: "First", field: "FirstName" },
          { title: "Last", field: "LastName" },
          { title: "Age", field: "Age", type: "numeric" },
          { title: "Salary", field: "Salary", type: "numeric"},
          { title: "PlayerID", field: "PlayerID", type: "numeric"},
        ],
      data: this.props.myClubPlayers || [],

      // modal stuff
      modalOpen: false,
      packageShown: {},
      packageReadOnly: true, //false == creating package

      tempRequests: [],
      tf_fee: '',
      tf_salary: '',
      tf_from: '',
      tf_to: '',
      tf_player: '',
      request_type: 1,
      dropdown_search: 1,
      search_text: '',

    };

    this.props.getPackages();
    this.props.getTeam(this.props.myClubId, true);
    this.props.getPlayersOfTeam(this.props.myClubId, true);
  }


  componentDidUpdate(prevProps){
    if(this.props.myClubPlayers !== null && 
      prevProps.myClubPlayers !== this.props.myClubPlayers) {
        this.setState({data: this.props.myClubPlayers})
    }
  }

  handleOpen = () => {
    this.setState({modalOpen: true});
  };

  handleClose = () => {
    this.setState({modalOpen: false});
  };

  packageDetail (pkg, readOnly){

    return (
      <div> 
    <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        style={styles.modal}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.modalOpen} style={{outline: 0}}>
          <div style={styles.paper}>
            <div>Requests in this package: </div>
              <div style={{backgroundColor: '#8c94a1', width: '85%', height: '40%',
            opacity: 0.1, borderRadius: 5, alignSelf: 'center'}}>
                
              </div>


      {/* <form noValidate autoComplete="off"> */}
      <Grid container={true} direction="row" justify="space-between">

          <Box style={{width: '50%'}}>
          <Grid container={true} direction="row" justify="space-between"
      style={{marginTop: 10}}>
      <Grid item xs={10} sm={5}>
          <TextField InputProps={{ readOnly: true }}
          label="From" value={this.state.tf_from} fullWidth />
          </Grid> <Grid item xs={10} sm={5}>
          <TextField InputProps={{ readOnly: true }}
          label="To" value={this.state.tf_to} fullWidth />
</Grid></Grid>

<Grid container={true} direction="row" justify="space-between"
   alignItems="center"   style={{marginTop: 10}}>
<Grid item xs={10} sm={5}>
<TextField InputProps={{ readOnly: true }}
          label="Player Involved" value={this.state.tf_player} fullWidth />
          </Grid><Grid item xs={10} sm={5}>
    <Select labelId="demo-simple-select-required-label"
    label="request type"
          id="demo-simple-select-required"
          value={this.state.request_type}
          onChange={(event)=>{this.setState({request_type: event.target.value})}}
          style={{marginTop: 10}}
        ><MenuItem value={1}>Buy</MenuItem>
        <MenuItem value={2}>Sell</MenuItem>
      </Select></Grid>
      </Grid>

      <Grid container={true} direction="row" justify="space-between"
      style={{marginTop: 10}}>
      <Grid item xs={10} sm={5}>
          {isNaN(this.state.tf_fee) ? <TextField error 
          label="Transfer Fee" helperText="Please enter a numerical value."
          onChange={(event)=>{this.setState({tf_fee: event.target.value})}}
          value={this.state.tf_fee} fullWidth />: 
          <TextField label="Transfer Fee" 
          onChange={(event)=>{this.setState({tf_fee: event.target.value})}}
          value={this.state.tf_fee} fullWidth />}
          </Grid>
          <Grid item xs={10} sm={5}>
          {isNaN(this.state.tf_salary) ? <TextField error 
          label="New Salary" helperText="Please enter a numerical value."
          onChange={(event)=>{this.setState({tf_salary: event.target.value})}}
          value={this.state.tf_salary} fullWidth />: 
          <TextField label="New Salary" 
          onChange={(event)=>{this.setState({tf_salary: event.target.value})}}
          value={this.state.tf_salary} fullWidth />}
</Grid>
    </Grid>

    <Button fullWidth variant='contained' color="primary" 
    onClick={()=>{ }} ///////
            style={{height: 35, alignItems: 'center', justifyContent: 'center',
            width: "70%", marginTop: 40, marginLeft: 20}}>
              <Typography variant="button">
              {"Add Request to Package"}
              </Typography>
            </Button>
            </Box>

<Box align="center" style={{ width: '50%',
justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>

  <Grid container={true} direction="row" justify="space-around" 
  alignItems="center">     
  <TextField label="Search" style={{marginBottom: 10}}
  id="standard-size-small" value={this.state.search_text}
  size="small" onChange={(event)=>{this.setState({search_text: event.target.value})}}/>
    <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={this.state.dropdown_search}
          onChange={(event)=>{this.setState({dropDown: event.target.value})}}
          // style={{marginRight: 50}}
        ><MenuItem value={1}>Player</MenuItem>
        <MenuItem value={2}>Team</MenuItem>
      </Select></Grid>

<Box style={{backgroundColor: '#aeb1d8', width: '90%', height: '90%',
borderRadius: 5, opacity: 0.4}}>


</Box>
</Box>
          </Grid>

{/* </form> */}
          </div>
        </Fade>
      </Modal>
    </div>)
  }

render(){
  return (
    <React.Fragment>

{this.packageDetail(this.state.packageShown, this.state.packageReadOnly)}
      <Container component="main" 
      style={{ maxWidth: '100%' }}
      className={styles.heroContent}>
        <Grid container direction="row" style={{justifyContent: 'space-around',}}>
      <Box style={{width: '60%', margin: 30}}>
        <Typography style={{marginBottom: 5}}
        variant="body1" align="center" color="textPrimary" gutterBottom>
         {'Manage my Players'}
        </Typography>
        
          <MaterialTable
              columns={this.state.columns}
              data={this.state.data}
          title= {this.props.myClub ? this.props.myClub.ClubName: 'My Team'}
          icons={tableIcons}

          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        /></Box>

<Box style={{ padding: 50, width: '35%', height: '70%',
borderRadius: 10}}>

  <IconButton color="primary" aria-label="upload picture" component="span"
  style={{position: 'absolute', zIndex: 2,
  margin: 0, padding: 0, width: 30, height: 30}}
  onClick={()=> {this.setState({modalOpen: true, packageReadOnly: false})}}>
      <AddIcon style={{width: '100%', height: '100%'}}/>
  </IconButton>

      <GridList 
          cellHeight={200} spacing={1} 
          style={styles.gl}>
            {tiers.map((tier) => <PendingPackage tier={tier} key={tier.title}
            click={() => this.setState({ modalOpen: true, packageShown: tier, 
              packageReadOnly: true })}
            />)}
</GridList> 


</Box>
</Grid>

<Box style={{width: '50%', height: '35%', borderWidth: 2, borderColor: 'grey'}}>
  <Typography>
  Display successful transfers
  </Typography>
</Box>

      </Container>
      {/* End hero unit */}

        <Box mt={5}>
          <Copyright />
        </Box>

      {/* End footer */}
    </React.Fragment>
  );
            }


}

function mapReduxStateToProps(reduxState) {
  return {
    pending_packages: reduxState.global.pending_packages,
    myClub: reduxState.global.myClub,
    myClubId: reduxState.global.myClubId,
    myClubPlayers: reduxState.global.myClubPlayers,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPackages: () => {
      dispatch(getPackages());
    },
    getPackage: (id) => {
      dispatch(getPackage(id));
    },
    getTeam: (id, own) => {
      dispatch(getTeam(id, own));
    },
    getPlayersOfTeam: (id, own) => {
      dispatch(getPlayersOfTeam(id, own));
    },
    searchPlayers: (term) => {
      dispatch(searchPlayers(term));
    },
    searchTeams: (term) => {
      dispatch(searchTeams(term));
    }
  };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Dashboard);

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};