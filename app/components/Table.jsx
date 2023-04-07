import * as React from "react";
import PropTypes from "prop-types";
import { hashtag } from "./Icon";

function TableHead() {
  return (
    <thead>
      <tr>
        <th style={{ width: "5%" }}>{hashtag}</th>
        <th style={{ width: "50%" }}>Repository</th>
        <th style={{ width: "15%" }}>Stars</th>
        <th style={{ width: "15%" }}>Forks</th>
        <th style={{ width: "15%" }}>Open Issue</th>
      </tr>
    </thead>
  );
};

function TableBody({ repos }) {
  return (
    <tbody>
      {repos.map((repo, index) => (
        <TableRow repo={repo} index={index} key={index} />
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  repos: PropTypes.array.isRequired,
};

function TableRow({ repo, index }) {
  const { name, stargazers_count, forks, open_issues, owner } = repo;
  const { avatar_url, login } = owner;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className="avatar"
            src={avatar_url}
            alt={`Avatar for ${login}`}
          />
          <a href={`https://github.com/${login}/${name}`}>{name}</a>
        </div>
      </td>
      <td>{stargazers_count}</td>
      <td>{forks}</td>
      <td>{open_issues}</td>
    </tr>
  );
};

TableRow.propTypes = {
  repo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default function Table({ repos }) {
  return (
    <table className="table">
      <TableHead />
      <TableBody repos={repos} />
    </table>
  );
};

Table.propTypes = {
  repos: PropTypes.array.isRequired,
};