import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const UserForm = ({ setIsAdding, getUsers }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    bio: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users", user)
      .then(res => {
        console.log(res.data);
        setIsAdding(false);
        getUsers();
      })
      .catch(err => {
        console.error(err);
      });
  };

  console.log(user);

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        name="name"
        id="filled-required"
        label="Name"
        variant="filled"
        onChange={handleChange}
      />
      <TextField
        required
        name="bio"
        id="filled-required"
        label="Bio"
        variant="filled"
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
