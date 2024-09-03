// lesson for addUsers
import { useState } from "react";
import axios from "axios";

export default function AddUsers() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    //enter an object for post in database
    const user = {
      name,
      email,
    };
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label htmlFor="name">Email:</label>
        <input
          type="text"
          name="name"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <button onSubmit={handleSubmit}>Login</button>
      </form>
    </div>
  );
}
