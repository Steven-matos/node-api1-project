import React, { useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const UserCard = ({ user, getUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/users/${user.id}`)
      .then(res => {
        console.log(res.data);
        getUsers();
      })
      .catch(err => {
        console.error(err.response);
      });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isEditing ? (
          <></>
        ) : (
          <>
            <Button size="small" color="primary" onClick={()  => setIsEditing(true)}>
              Edit
            </Button>
            <Button size="small" color="primary" onClick={() => handleDelete()}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default UserCard;
