import React from 'react';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

/*
Join Room page component
 */
const JoinRoom = props => {
  const [userName, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = React.useState(false);
  const socket = props.socket;
  const navigate = useNavigate();

  const joinRoom = async () => {
    if (userName !== '' && roomId !== '') {
      const url = `http://localhost:3001/room/${roomId}`;
      await fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(() => {
          // room exists so join room
          console.log(`joined room userName: ${userName}, roomId: ${roomId}`);
          socket.emit('joinRoom', roomId);
          navigate('/room/' + roomId);
        })
        // there was no room with the id so send error unable to join room
        .catch(() => {
          setError(true);
          console.log('cant there was no room with the id');
        });
    }
  };

  JoinRoom.propTypes = {
    socket: PropTypes.object
  };
  return (
    <div className="joinContainer">
      <Collapse in={error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          There was no room with the id
        </Alert>
      </Collapse>
      <Stack direction="row" spacing={15} justifyContent="center" alignItems="center">
      <Card sx={{ bgcolor: '#0466C8' }} color="success">
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ m: 10 }}>
          <CardContent >
          <Typography variant="h4" color = "white" gutterBottom>
            Join room
            </Typography>
            <TextField sx={{ input: { color: 'white' } }} id="outlined-basic" label="Name" variant="outlined" 
           type="text"
           placeholder="name"
           onChange={e => {
             setUsername(e.target.value);
           }}
        />
            <TextField sx={{ input: { color: 'white' } }} id="outlined-basic" label="Room ID" variant="outlined"
          type="text"
          placeholder="room id"
          onChange={e => {
            setRoomId(e.target.value);
          }}
        />
          </CardContent>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 10 }}>
          <CardActions>
          <Button sx = {{backgroundColor: "white",fontWeight: 'bold'}} size="large" variant="outlined" onClick={joinRoom}>
            Join Room
            </Button>
          </CardActions>
        </Box>
      </Card>
      </Stack>
      {/* <p>Join room</p>
      <input
        type="text"
        placeholder="name"
        onChange={e => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="room id"
        onChange={e => {
          setRoomId(e.target.value);
        }}
      />
      <Button onClick={joinRoom} variant="contained">
        Join Room
      </Button> */}
    </div>
  );
};
export default JoinRoom;
