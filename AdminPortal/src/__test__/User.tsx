import { useState, useEffect } from "react";
import axios from "./axios";

export default function User() {
  const [uses, setUsers] = useState();

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}></li>
          ))}
        </ul>
      ) : (
        <div>No users to display</div>
      )}
    </article>
  );
}
