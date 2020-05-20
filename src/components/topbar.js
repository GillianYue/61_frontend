import React, { useState }from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  }
));


export default function TopBar() {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    return(
      <div>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                  TransferMarkt
                </Typography>
                <SearchBar
            onChange={(t) => setSearch(t)}
            onRequestSearch={() => console.log('onRequestSearch')}//TODO
            value={search}
            style={{
              margin: '0 auto',
              maxWidth: 1000,
              width: 400,
            marginRight: 150,
            }}/>
                <Grid container direction="row" style={{width: 230, flexDirection: 'row',
              justifyContent: 'flex-start', alignItems: 'center'}}>
                <Typography variant="button" color="inherit" noWrap className={classes.toolbarTitle}>
                  Welcome back, 
                </Typography>
                  <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                    username
                  </Link>
                </Grid>
                <Button href="#" color="primary" variant="outlined" className={classes.link}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
            </div>
    );
  }