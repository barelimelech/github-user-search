import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../context/SearchContext';
import { handleSearch as fetchGitHubUsers } from '../utils/fetch';

const Search = () => {
    const { setUsers, setIsLoading, setTotalCount, page, setPage, searchQuery, setSearchQuery, setErrorMessage } = useSearch();
    const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("");
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState<boolean>(false);

    const usersPerPage = 30;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrentSearchQuery(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleSearchClick = () => {
        setSearchQuery(currentSearchQuery)
        setIsSearchButtonClicked(true);
        setPage(1);
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            setUsers([]);
            return;
        }
        setIsLoading(true);
        setErrorMessage("");
        try {
            const data = await fetchGitHubUsers(searchQuery, page, usersPerPage);
            if (data.error) {
                throw new Error(data.error);
            }
            setUsers(data.users);
            setTotalCount(data.totalCount);
            setIsLoading(false);

        } catch (error) {
            setErrorMessage("An error occurred while fetching GitHub users. Please try again.");
            console.error("Error fetching GitHub users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        }
        if (isSearchButtonClicked) {
            handleSearch();
            setIsSearchButtonClicked(false);
        }
    }, [page, isSearchButtonClicked]);


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2,
                backgroundColor: 'white',
                padding: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '100%',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search Github Users"
                        variant="outlined"
                        margin="normal"
                        value={currentSearchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        style={{ width: "410px", marginLeft: "auto" }}
                        sx={{ flex: 1 }} />
                    <IconButton
                        color="primary"
                        onClick={handleSearchClick}
                        sx={{ width: 50, height: 50, margin: "5px" }}
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Search;