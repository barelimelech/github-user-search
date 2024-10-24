import React from 'react';
import { Box } from '@mui/material';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box sx={{width: '990px'}}>
            {children}
        </Box>
    );
};

export default Container;
