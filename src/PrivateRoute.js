import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import SearchResult from './components/SearchResult';
import Dashboard from './dashboard';
import TopBar from './components/topbar.js';
import Profile from './profile';

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const token = localStorage.getItem('token');
  const isLoggedIn = (token != null)

  return (
    <Route
      {...rest}
      render={props =>
        {
        if(isLoggedIn) {
        
            switch(props.location.pathname){
                case '/':
                    return   (<div> <TopBar /><Dashboard {...props}/> </div>);
                case '/search':
                    return (          
                    <div> <TopBar /><SearchResult {...props}/> </div>);
                case '/profile':
                    return (          
                     <div> <TopBar /><Profile {...props}/> </div>);
                default:
                    return   (<Redirect to={{ pathname: '/', 
                    state: { from: props.location } }} />);
            }
       
        } else {
         return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }
        }
      }
    />
  )
}

export default PrivateRoute;