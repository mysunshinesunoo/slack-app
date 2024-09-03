//lesson for Users

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const people = response.data;
          setUsers(people);
        });
    }
  });
  return <div className="Users"></div>;
}
