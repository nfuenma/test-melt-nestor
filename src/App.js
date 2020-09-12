import React, {forwardRef, useState, useEffect, useRef} from 'react';
import './App.css';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Input,
  Typography,
  Paper,
  Tooltip,
  Button,
  Modal
  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    maxWidth: 275,
    backgroundColor: '#282c34',
    color: 'white',
    margin: '5px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    display: 'block',
    backgroundColor: 'green',
  }
});




function App() {
  
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = useState();
  const [data, setData] = useState(
    {
      title: '',
      description: '',
    }
  ); 
  

  const handleOpen = () => {
    setData({
      title:'',
      description:'',
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
  
      setCurrentDateTime(moment.utc(Date().toLocaleString()).format('LLL'));
    
  }, []);

  const saveEvent = (e, data) => {
    e.preventDefault();
    setEvents(events.concat({...data, date: currentDateTime}));
    setOpen(false);
  }

  const body = (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {currentDateTime}
        </Typography>
        <Input onChange={(e) => setData({...data, title: e.target.value})} className={classes.title} placeholder="Titulo" value={data.title} color="textSecondary" />
        <Input onChange={(e) => setData({...data, description: e.target.value})} className={classes.title} placeholder="Descripción" value={data.description} color="textSecondary" />
       
      </CardContent>
      <CardActions>
        <Button onClick={event => saveEvent(event, data)} className={classes.button} size="small">Guardar</Button>
      </CardActions>
    </Card>
  );

   

  return (
    <div className="App">
      <header className="App-header">     
        <div className={classes.body}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>

          <div className={classes.container}>
            { events.length > 0 && events.map(e => (
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {e.date}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {e.title}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {e.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>



          <Button
            onClick={handleOpen}
            className={classes.button}
          >
            Agregar
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
