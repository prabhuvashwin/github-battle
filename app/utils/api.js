const id = '5f14e748e3e4ad41d3e5';
const sec = '67d17463c00d68312da5eb4ee8b0fe80ea18582c';
const params = `?client_id=${id}&client_secret=${sec}`;

export function fetchPopularRepos(language) {
  const endPoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  return fetch(endPoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items;
    });
}

function getErrorMsg(message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }

  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count }) => {
    return count + stargazers_count;
  }, 0);
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return Promise.all([
    getProfile(player),
    getRepos(player),
  ]).then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile.followers, repos),
  }));
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]).then(sortPlayers);
}