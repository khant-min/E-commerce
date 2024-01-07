import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function User() {
  const [users, setUsers] = useState<any>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(
          "http://localhost:8080/api/customers",
          {
            signal: controller.signal,
          }
        );
        console.log("customers: ", response.data.customers);
        isMounted && setUsers(response.data.customers);
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
      <hr />
      {users?.length ? (
        <ul>
          {users.map((user: any, i: any) => (
            <React.Fragment key={i}>
              <div style={{ margin: "10px 0" }}>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <hr />
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <div>No users to display</div>
      )}
    </article>
  );
}
