import { useState, useEffect } from "react";
import axios from "./axios";
import useRefreshToken from "../hooks/useRefreshToken";

export default function User() {
  const [users, setUsers] = useState<any>();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user: any, i: any) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <div>No users to display</div>
      )}
      <button onClick={refresh}>Refresh</button>
    </article>
  );
}
