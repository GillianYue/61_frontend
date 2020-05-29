import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPackages, getTeam, getPackage, getPlayersOfTeam,
searchPlayers, searchTeams, createPackage, updatePlayer,
createPlayer, deletePlayer, signPackage, fetchAllRequestsFields,
fetchGlobalTransfers, getPosition, getAllPositions, getListPositions,
 } from './actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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

import { FaPlusSquare as AddIcon, FaFutbol as SoccerIcon } from 'react-icons/fa';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
        Database CS61 Team 6
    </Typography>
  );
}

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
    height: 500, 
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
    const pkg = this.props.pkg;
  return (              
    <GridListTile style={{width: '100%'}} cols={2} rows={1}>

    <Card style={{ width: '90%', alignSelf: 'center', margin: 10, opacity: this.state.opacity}}
    onMouseEnter={() => this.setState({opacity: 0.6})}
        onMouseLeave={() => this.setState({opacity: 1})}
        onClick={()=> this.props.click(this.props.pkg)}>
          <CardHeader
          style={{height: 30, backgroundColor: '#aaaaaa'}}
            title={`Pending Package ${this.props.index}`}
            titleTypographyProps={{ align: 'center', variant:'body1' }}
          />
          <CardContent>
            <div>
              <p style={{margin: 0, padding: 0}}> 
          ID: 
              {` ${pkg.PackageID}`}
              </p>
            <Typography variant="body1" color="textSecondary">
                Date requested: 
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {` ${pkg.Date.substring(0, 10)} at ${pkg.Date.substring(11,16)}`}
              </Typography>
  
            </div>
          </CardContent>
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
      transferModalOpen: false,
      packageShown: {}, //the unpopulated package selected
      packageReadOnly: true, //false == creating package

      tempRequests: [], //listed in package modal
      tf_fee: 0,
      tf_salary: 0,
      tf_from: '',
      from_id: null,
      tf_to: '',
      to_id: null,
      tf_player: '',
      player_id: null,
      request_type: 1,
      dropdown_search: 1,
      search_text: '',

      searchResults: [],
      allPos: null,

      hp_fee: 0,
      hp_salary: 0,
      hp_from: null,
      hp_to: null,
      hp_player: null,
      hoverIndex: 0, //request on which the mouse is hovering over

      listPositions: null,
      currPage: 0,
    };

    this.props.getPackages();
    this.props.getTeam(this.props.myClubId, true);
    this.props.getPlayersOfTeam(this.props.myClubId, true);
    this.props.getAllPositions();

    this.registerResult = this.registerResult.bind(this);
    this.setHelperText = this.setHelperText.bind(this);

    this.tableRef = React.createRef();

  }


  componentDidUpdate(prevProps){
    if(this.props.myClubPlayers !== null && 
      prevProps.myClubPlayers !== this.props.myClubPlayers) {
        this.setState({data: this.props.myClubPlayers});

        var listID = [];
        for(var i = 5*this.state.currPage; i < 5*this.state.currPage + 5; i++){
             listID.push(this.props.myClubPlayers[i].PlayerID);
        }
        this.props.getListPositions(listID);
    }
    if(this.state.dropdown_search === 1 && 
      this.props.playersSearch !== prevProps.playersSearch){
        this.setState({searchResults: this.props.playersSearch});
      }
    else if(this.state.dropdown_search === 2 && 
      this.props.clubsSearch !== prevProps.clubsSearch){
          this.setState({searchResults: this.props.clubsSearch});
        }
    if(this.props.clubById !== null && 
      prevProps.clubById !== this.props.clubById){
        this.setState({tf_from: this.props.clubById.ClubName});
      }

    if(this.props.refetchPlayers && this.props.refetchPlayers !== prevProps.refetchPlayers){
      this.props.getPlayersOfTeam(this.props.myClubId, true);
    }

    if(this.props.refetchPackages && this.props.refetchPackages !== prevProps.refetchPackages){
      this.props.getPackages();
    }

    if(this.props.packageById !== null && this.props.packageById !== prevProps.packageById){
      this.props.fetchAllRequestsFields(this.props.packageById);
    }

    if(this.props.requestsFields !== null && this.props.requestsFields !== prevProps.requestsFields){
      this.setState({
        hp_from: this.props.requestsFields.FromNames,
        hp_to: this.props.requestsFields.ToNames,
        hp_player: this.props.requestsFields.PlayerNames,
      })
    }

    if(this.props.allPositions !== null &&
      this.props.allPositions !== prevProps.allPositions) 
      {

        this.setState({allPos: this.props.allPositions})}

    if(this.props.positionsById !== prevProps.positionsById){
    }

    if(this.props.listPositions !== prevProps.listPositions){
      this.setState({listPositions: this.props.listPositions})
    }


  }
  

  handleClose = () => {
    this.setState({modalOpen: false,
      transferModalOpen: false,});
  };

  deleteRequest = (index) =>{
    var arr = this.state.tempRequests;
    arr.splice(index, 1);
    this.setState({tempRequests: arr});
  }

  setHelperText = (index, fee, salary) => {
    this.setState({
      hp_fee: fee,
      hp_salary: salary,
      hoverIndex: index,
    })
  }

  packageDetail (pkg, readOnly){

      const hoveri = this.state.hoverIndex;
      const populated = (this.state.hp_to && 
        this.state.hp_from && this.state.hp_player);

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

        {this.state.packageReadOnly? 
          <div>Requests in this package: </div>:
          <Grid container={true} direction="row" justify="space-between"> 
          Create new trade package:           
            <Button fullWidth variant='contained' color="primary" 
          style={{height: 35, width: 120, alignItems: 'center', justifyContent: 'center',
          marginBottom: 15}}
          onClick={()=>{
            this.props.createPackage(this.state.tempRequests);
            this.setState({modalOpen: false});}}>
            <Typography variant="button">
            Submit
            </Typography>
          </Button>
          </Grid>
          }
<div style={{ backgroundColor: '#d3d3d3', width: '90%', 
   height: this.state.packageReadOnly? '60%':'40%',
  opacity: 1, borderRadius: 5, alignSelf: 'center', padding: 20}}>
       {this.state.packageReadOnly?  

       ( pkg? pkg.map((req, i)=>{
         const req_mod = populated? {
          NewSalary: req.NewSalary,
          TransferFee: req.TransferFee,
          fromName: this.state.hp_from[i],
          toName: this.state.hp_to[i],
          playerName: this.state.hp_player[i],
         }: {};

        return <TempRequest key={i} request={req_mod} index={i} read={true}
            setHelperText={this.setHelperText}/>
            }):null)

       : this.state.tempRequests.map((req, i)=>{
       return <TempRequest key={i} request={req} index={i} read={false}
       deleteRequest={this.deleteRequest} />
       })}
  </div>

{this.state.packageReadOnly ? 
(<Grid container={true} direction="column" justify="space-between">

   <Grid container={true} direction="row" justify="center">
   <Button fullWidth variant='contained' color="primary" 
            style={{height: 35, width: 120, alignItems: 'center', justifyContent: 'center', 
            margin: 20}} 
            onClick={()=>{
              this.props.signPackage(this.state.packageShown.PackageID, true);
              this.setState({modalOpen: false});
            }}>
              <Typography variant="button">
              Accept
              </Typography>
            </Button>
    <Button fullWidth variant='outlined' color="primary"
            style={{height: 35, width: 120, alignItems: 'center', justifyContent: 'center',
            margin: 20}}
            onClick={()=>{
              this.props.signPackage(this.state.packageShown.PackageID, false);
              this.setState({modalOpen: false});
            }}>
                <Typography variant="button">
             Decline
              </Typography>
            </Button>
   </Grid>

   {(hoveri !== -1 && populated) ?
 <p style={{fontSize: 13, marginTop: 20}}>club <b>{this.state.hp_to[hoveri]}</b> will buy from club 
   <b> {this.state.hp_from[hoveri]}</b> player <b>{this.state.hp_player[hoveri]}</b> with a fee of 
   <b> {this.state.hp_fee}</b>; <b>{this.state.hp_player[hoveri]}</b>'s new salary is 
   <b> {this.state.hp_salary}</b></p> : null
  }

</Grid>)

:   <Grid container={true} direction="row" justify="space-between">
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
<Grid item xs={10} sm={10}>
<TextField InputProps={{ readOnly: true }}
          label="Player Involved" value={this.state.tf_player} fullWidth />
          </Grid>
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
    onClick={()=>{
      var joined = this.state.tempRequests.concat({
        From: this.state.from_id,
        fromName: this.state.tf_from,
        To: this.state.to_id,
        toName: this.state.tf_to,
        PlayerID: this.state.player_id,
        playerName: this.state.tf_player,
        TransferFee: this.state.tf_fee,
        NewSalary: this.state.tf_salary,
      });
      this.setState({tempRequests: joined});
     }} ///////
            style={{height: 35, alignItems: 'center', justifyContent: 'center',
            width: "70%", marginTop: 40, marginLeft: 20}}>
              <Typography variant="button">
              {"Add Request to Package"}
              </Typography>
            </Button>

{ (this.state.tf_from && this.state.tf_to && this.state.tf_player) ?
   <p style={{fontSize: 10}}>club <b>{this.state.tf_to}</b> will buy from club 
   <b> {this.state.tf_from}</b> player <b>{this.state.tf_player}</b> with a fee of 
   <b> {this.state.tf_fee}</b>; <b>{this.state.tf_player}</b>'s new salary is 
   <b> {this.state.tf_salary}</b></p>
: <div style={{height: '30', width: '100%'}}/>}

            </Box>

<Box align="center" style={{ width: '50%',
justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>

  <Grid container={true} direction="row" justify="space-around" 
  alignItems="center">     
  <TextField label="Search" style={{marginBottom: 10}}
  id="standard-size-small" value={this.state.search_text}
  size="small" onChange={(event)=>{
    this.setState({search_text: event.target.value});
if(event.target.value !== ''){
  this.state.dropdown_search === 1? 
  this.props.searchPlayers({search_terms: event.target.value}):
  this.props.searchTeams({search_terms: event.target.value});
}else{
  this.setState({searchResults: []})
}
  }
    }/>
    <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={this.state.dropdown_search}
          onChange={(event)=>{
            this.setState({
              search_text: '',
              searchResults: [],
              dropdown_search: event.target.value})}}
        ><MenuItem value={1}>Player</MenuItem>
        <MenuItem value={2}>Team</MenuItem>
      </Select></Grid>

<Box style={{backgroundColor: '#aeb1d8', width: '90%', height: 200,
borderRadius: 5, opacity: 0.4, paddingTop: 20}}>
  {this.state.searchResults.length > 0 ? 
      this.state.searchResults.map((res)=>{
        const t = this.state.dropdown_search;
        return <Grid key={t===1? res.PlayerID : res.ClubID}
        container={true} direction="row" justify="space-around" >
          <MiniSearchResult type={t} instance={res} 
          registerResult={this.registerResult}/>

        </Grid>
      }) : null}

</Box>
</Box>
          </Grid>}

          </div>
        </Fade>
      </Modal>
    </div>)
  }

  globalTransfers (){

    return(<Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      style={styles.modal}
      open={this.state.transferModalOpen}
      onClose={this.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={this.state.transferModalOpen} style={{outline: 0}}>
        <div style={styles.paper}>
        <p>Most recent transfers that took place globally:</p>
          <GridList style={{height: '50%', justifyContent: 'flex-start',
    alignItems: 'flex-start', overflow: 'auto',}}>
          {this.props.globalTransfers? this.props.globalTransfers.map((transfer, i)=>{
          return  <TransferInstance transfer={transfer} key={i} 
            click={(pkgID)=>{ this.setState({})//TODO
              this.props.getPackage(pkgID)}} />
          }): <p>Nothing yet</p>}
          </GridList>

<GridList style={{flexDirection: 'column', width: '100%', height: '45%', overflow: 'auto',
}}>
          {this.state.hp_from? 
          this.state.hp_from.map((fromName, index) =>{
         return   <GridListTile key={index}>
  <p>Club {this.state.hp_to[index]} bought player {this.state.hp_player[index]}
  from Club {fromName} with a transfer fee of {this.state.hp_fee}</p>
  </GridListTile>
          }) : <div />}
          </GridList>
          </div>
          </Fade>
      </Modal>);
  }

  registerResult(param){
    const t = param.type;
    const res = param.instance;

    if(t===1){ //player add
      this.props.getTeam(res.ClubID, false);

      this.setState({
      tf_player: `${res.FirstName} ${res.LastName}`,
      player_id: res.PlayerID,
      from_id: res.ClubID})
    }else{ //club
      this.setState({tf_to: res.ClubName,
      to_id: res.ClubID});
    }
  }

render(){

  const poses = {...this.state.listPositions};

  return (
    <React.Fragment>

{this.packageDetail(this.props.packageById, this.state.packageReadOnly)}
{this.globalTransfers()}

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
              data={this.state.data.map(x =>Object.assign({}, x))}
          title= {this.props.myClub ? this.props.myClub.ClubName: 'My Team'}
          icons={tableIcons}
          tableRef={this.tableRef}
          onChangePage={(page)=>{
            this.setState({currPage: page});

            var listID = [];
            for(var i = 5*page; i < 5*page+5; i++){
            listID.push(this.props.myClubPlayers[i].PlayerID);
            }
            this.props.getListPositions(listID);
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}

          detailPanel={[
            (row)=> ({
            icon: ()=><SoccerIcon 
            onClick={()=>{
            }}
            />,
            tooltip: 'Positions',
            render: rowData => {
              const rowNum = rowData.tableData.id % 5;
            return (
              <div style={{height: 100, padding: 20}}>

              <Grid container={true} direction="row" align="center" justify="center"
              style={{justifyContent: 'space-around', alignItems: 'center'}}> 
                        <Typography>Position 1:</Typography>
                        <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={(poses && poses[rowNum][0]) ?
                          poses[rowNum][0].PositionID : 0}
                        onChange={(event)=>{

                          const to = event.target.value;
                          var s = poses, ss = [...poses[rowNum]], sss = {...ss[0]}; //temp store
                          if(poses[rowNum][0]){
                          sss.PositionID = to;
                          }else{
                          sss = {PositionID: to}
                          }
                          ss[0] = sss;
                          s[rowNum] = ss;
  
                          this.setState({listPositions: s});

                        }}
                      >
                        {this.state.allPos.map((posName, index)=>{
                          return  <MenuItem key={index} value={index}>{posName}</MenuItem>
                        })}
                    </Select>
                    <Typography>Position 2:</Typography>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={(poses && poses[rowNum][1]) ?
                          poses[rowNum][1].PositionID : 0}
                        onChange={(event)=>{

                        const to = event.target.value;
                        var s = poses, ss = [...poses[rowNum]], sss = {...ss[1]}; //temp store
                        if(poses[rowNum][1]){
                        sss.PositionID = to;
                        }else{
                        if(poses[rowNum][0]) 
                        sss = {PositionID: to}
                        }
                        ss[1] = sss;
                        s[rowNum] = ss;

                        this.setState({listPositions: s});
                        
                        }}
                      >
                        {this.state.allPos.map((posName, index)=>{
                          return  <MenuItem key={index} value={index}>{posName}</MenuItem>
                        })}
                    </Select>
                    <Typography align="center">Position 3:</Typography>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={(poses && poses[rowNum][2]) ?
                          poses[rowNum][2].PositionID : 0}
                        onChange={(event)=>{
                          const to = event.target.value;
                          var s = poses, ss = [...poses[rowNum]], sss = {...ss[2]}; //temp store
                          if(poses[rowNum][2]){
                          sss.PositionID = to;
                          }else{
                          if(poses[rowNum][0] && poses[rowNum][1]) 
                          sss = {PositionID: to}
                          }
                          ss[2] = sss;
                          s[rowNum] = ss;

                          this.setState({listPositions: s}); 
                        }}
                      >
                        {this.state.allPos.map((posName, index)=>{
                          return  <MenuItem key={index} value={index}>{posName}</MenuItem>
                        })}
                    </Select>
                    <Button fullWidth variant='contained' color="primary" 
            style={{height: 35, width: 120, alignItems: 'center', justifyContent: 'center', 
            margin: 20}} 
            onClick={()=>{
              var playerPos = [];
              var s = {...this.state.listPositions};
              s[rowNum].map((p)=>{
          playerPos.push(p.PositionID);
          return null; })
         this.props.updatePlayer(row.PlayerID, {
           Player: {Age: row.Age},
          Positions: playerPos, })
           }}>
              <Typography variant="button">
              Save
              </Typography>
            </Button>
              
                    </Grid>


              </div> 
            )
          } }) ] }

          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const body = {
                    FirstName: newData.FirstName,
                    LastName: newData.LastName,
                    Age: newData.Age,
                    Salary: newData.Salary,
                    Positions: [],
                    ClubID: this.props.myClubId ? 
                    this.props.myClubId: localStorage.getItem('myClubId'),
                  }
                  this.props.createPlayer(body);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                const body = {
                  Player: {
                  FirstName: newData.FirstName,
                  LastName: newData.LastName,
                  Age: newData.Age,
                  Salary: newData.Salary,
                  ClubID: this.props.myClubId ? 
                  this.props.myClubId: localStorage.getItem('myClubId'),
                  }
                }
                this.props.updatePlayer(oldData.PlayerID, body);
                resolve();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.props.deletePlayer(oldData.PlayerID);
                }, 600);
              }),
          }}
        /></Box>

<Box style={{ padding: 50, width: '35%', height: '70%',
borderRadius: 10}}>

  <IconButton color="primary" aria-label="upload picture" component="span"
  style={{position: 'absolute', zIndex: 2,
  margin: 0, padding: 0, width: 30, height: 30}}
  onClick={()=> {
    this.setState({modalOpen: true, packageReadOnly: false})}}>
      <AddIcon style={{width: '100%', height: '100%'}}/>
  </IconButton>

      <GridList style={styles.gl}>

    {this.props.pending_packages?  
    this.props.pending_packages.map((pendingPackage, index) => 
            <PendingPackage pkg={pendingPackage} key={pendingPackage.PackageID}
            click={() => {
              this.setState({ modalOpen: true, packageShown: pendingPackage, 
              packageReadOnly: true })
              this.props.getPackage(pendingPackage.PackageID)
            } } index={index}
            />) : <div />}
</GridList> 

<Button fullWidth variant='outlined' color="primary"
            style={{height: 35, width: 300, alignItems: 'center', justifyContent: 'center',
            margin: 20, marginTop: 30}}
            onClick={()=>{
              this.setState({transferModalOpen: true})
              this.props.fetchGlobalTransfers();
            }}>
                <Typography variant="button">
             View Global Transfers
              </Typography>
            </Button>
</Box>
</Grid>


      </Container>

        <Box mt={5}>
          <Copyright />
        </Box>

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
    refetchPlayers: reduxState.global.refetchPlayers,
    refetchPackages: reduxState.global.refetchPackages,

    playersSearch: reduxState.global.playersSearch,
    clubsSearch: reduxState.global.clubsSearch,
    clubById: reduxState.global.clubById,
    positionsById: reduxState.global.positionsById,
    allPositions: reduxState.global.allPositions,
    listPositions: reduxState.global.listPositions,

    packageById: reduxState.global.packageById,

    requestsFields: reduxState.global.requestsFields, //for readOnly requests' fields
    globalTransfers: reduxState.global.globalTransfers,
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

    getPosition: (id) => {
      dispatch(getPosition(id));
    },
    getAllPositions: () => {
      dispatch(getAllPositions());
    },
    getListPositions: (listID) => {
      dispatch(getListPositions(listID));
    },


    getPlayersOfTeam: (id, own) => {
      dispatch(getPlayersOfTeam(id, own));
    },
    searchPlayers: (term) => {
      dispatch(searchPlayers(term));
    },
    searchTeams: (term) => {
      dispatch(searchTeams(term));
    },
    createPackage: (requests) => {
      dispatch(createPackage(requests));
    },

    updatePlayer: (id, params) => {
      dispatch(updatePlayer(id, params));
    },
    createPlayer: (params) => {
      dispatch(createPlayer(params));
    },
    deletePlayer: (id) => {
      dispatch(deletePlayer(id));
    },

    signPackage: (id)=>{
      dispatch(signPackage(id))
    },
    fetchAllRequestsFields: (requests)=>{
      dispatch(fetchAllRequestsFields(requests));
    },
    fetchGlobalTransfers: ()=>{
      dispatch(fetchGlobalTransfers());
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

class MiniSearchResult extends Component{
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    }
  }

  render(){
    const t = this.props.type;
    const res = this.props.instance;

    const content = 
    <p style={{color: 'black', margin: 0, padding: 0, opacity: 1}}>
      {(t === 1) ? `${res.FirstName} ${res.LastName}`: res.ClubName} </p>

    return (
      <Box style={{borderRadius: 5, backgroundColor: 'white',
    opacity: this.state.opacity, padding: 5, width: '80%', margin: 2, height: 'auto'}} 
    onMouseEnter={() => this.setState({opacity: 0.7})}
    onMouseLeave={() => this.setState({opacity: 1})}
    onClick={()=> {this.props.registerResult({
      type: t,
      instance: res,
    })}}>
      {content}</Box>
    );
  }

}

class TempRequest extends Component{
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    }
  }

  render(){
    const req = this.props.request;
    const fromName = req.fromName, toName = req.toName,
    playerName = req.playerName;

  const content =  <p style={{color: 'black', justifyContent: 'center',
  alignItems: 'center', margin: 0, padding: 0, opacity: 1}}>
    From: {fromName} To: {toName} Player: {playerName} Fee: {req.TransferFee} New_Salary: {req.NewSalary}</p>

    return (
      <Box align="center" style={{ justifyContent: 'center',
      alignItems: 'center', borderRadius: 5, backgroundColor: 'white',
    opacity: this.state.opacity, marginLeft: 10, marginRight: 10, marginTop: 8,
  padding: 5, height: 'auto'}} 
    onMouseEnter={() => {
      if(this.props.read)
      this.props.setHelperText(this.props.index, req.TransferFee, req.NewSalary);
      this.setState({opacity: 0.6})}}
    onMouseLeave={() => {
      if(this.props.read)
      this.props.setHelperText(-1, 0, 0);
      this.setState({opacity: 1})}}
    onClick={()=> { if(!this.props.read)
       this.props.deleteRequest(this.props.index)
    }}>
      {content}</Box>
    );
  }

}

class TransferInstance extends Component{
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    }
  }

  render(){
    const instance = this.props.transfer;

  const content =  
    <Grid container={true} direction="row" justify="space-between" >
      <Grid item xs={12} sm={7}>
    <b>PackageID</b>: {instance.PackageID} 
    </Grid>
      <Grid item xs={12} sm={5}>
    <b>In Effect Since</b>
    : {` ${instance.DateSigned.substring(0, 10)} at ${instance.DateSigned.substring(11,16)}`}
    </Grid>
    </Grid>

    return (
      <Box align="center" style={{ justifyContent: 'flex-start',
      alignItems: 'center', borderRadius: 5, backgroundColor: 'white',
    opacity: this.state.opacity, marginLeft: 10, marginRight: 10, marginTop: 8,
  padding: 8, height: 50, width: '100%'}} 
    onMouseEnter={() => {
      this.setState({opacity: 0.6})}}
    onMouseLeave={() => {
      this.setState({opacity: 1})}}
    onClick={()=> { 
       this.props.click(instance.PackageID);
    }}>
      {content}</Box>
    );
  }

}