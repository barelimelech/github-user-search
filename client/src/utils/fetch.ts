export const handleSearch = async (searchQuery:string ,page:number, usersPerPage:number) =>{
    try {
        const response = await fetch(`http://localhost:3010/api/search_github_users?q=${searchQuery}&page=${page}&per_page=${usersPerPage}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return { users: [], totalCount: 0 };
    }
}

