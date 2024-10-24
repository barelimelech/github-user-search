export const handleSearch = async (searchQuery:string ,page:number, usersPerPage:number) =>{
    try {
        const response = await fetch(`http://localhost:3010/api/search_github_users?q=${searchQuery}&page=${page}&per_page=${usersPerPage}`, {
            method: 'GET',
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch data from the GitHub API');
        }
        return await response.json();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error(errorMessage);

        return { users: [], totalCount: 0, error: errorMessage };
    }
}

