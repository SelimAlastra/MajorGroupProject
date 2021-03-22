import React, { useEffect ,useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import SearchBar from './components/SearchBar/SearchBar';
import NavbarUser from "./components/Navbar/NavbarUser";
import { getPosts, updatePost } from './actions/posts';
import Posts from './components/Posts/Posts';
import memories from './images/memories.png';
import useStyles from './styles';
import {filteredPosts} from './components/SearchBar/SearchBar';

const ClientDashboard = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPosts());
    }, [currentId,dispatch]);
    console.log(filteredPosts)
    
return (
  <Container maxWidth="lg">
    <NavbarUser/>
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography className={classes.heading} variant="h2" align="center">Dashboard</Typography>
     <img className={classes.image} src={memories} alt="memories" height="60" />
     {/* <Navbar/> */}
    </AppBar>
    <SearchBar />

    <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} filteredPosts={filteredPosts} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      
  </Container>
  );
}


export default ClientDashboard;
