import React from 'react';
import { GitHubUser } from '../../types';
import { Box, Typography } from '@mui/material';

interface UserProps {
  user: GitHubUser;
}

const UserData = ({ user }: UserProps) => {
  const handleClick = () => {
    const url = `https://github.com/${user.username}`;
    window.open(url, '_blank');
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'inline-block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: 1,
        textAlign: 'center',
        margin: 1,
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 30,
          height: 30,
          backgroundColor: 'green',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
          {user.publicRepos}
        </Typography>
      </Box>
      <Box
        component="img"
        src={user.image}
        alt={user.username}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: '50%',
        }}
      />
      <Typography variant="subtitle2" sx={{
        marginTop: 1, wordWrap: 'break-word', 
        maxWidth: '100%',
      }}>
        {user.username}
      </Typography>
    </Box>
  )
}

export default UserData;