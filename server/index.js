const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const mockData = require('./mockData.json');

const githubToken = process.env.GITHUB_TOKEN;

const app = express();
const port = 3010;

app.use(cors());

app.get('/api/search_github_users', async (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  const perPage = req.query.per_page || 30;

  if (!githubToken) {
    const usersData = mockData.users.map(user => ({
      username: user.username,
      image: user.image,
      publicRepos: user.publicRepos, 
    }));
    
    return res.json({
      totalCount: mockData.totalCount,
      users: usersData,
    });
  }

  const url = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${githubToken}`
      }
    });

    const usersLogins = response.data.items.map(user => ({
      username: user.login
    }));

    const usersDataPromises = usersLogins.map(async (user) => {
      const userUrl = `https://api.github.com/users/${user.username}`;
      const userResponse = await axios.get(userUrl, {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
        }
      });

      return {
        username: userResponse.data.login,
        image: userResponse.data.avatar_url,
        publicRepos: userResponse.data.public_repos,
      };
    });
    const usersData = await Promise.all(usersDataPromises);
    res.json({
      totalCount: response.data.total_count,
      users: usersData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from GitHub API' });
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
