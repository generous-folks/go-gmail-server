import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Theaters from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";
import { SEND_MAIL_PATH } from "../constants/api.constants";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    padding: "5%",
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  switches: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Form() {
  const classes = useStyles();
  const [state, setState] = useState({
    from: "YOUR-GMAIL-ADDRESS@gmail.com",
    to: "",
    subject: "",
    message: ""
  });
  const [pending, setPending] = useState(false);

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    setPending(true);

    return fetch(SEND_MAIL_PATH, {
      method: "POST",
      body: JSON.stringify(state)
    })
      .then(() => {
        setPending(false);
      })
      .catch(error => {
        throw new Error("Server trouble: " + error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Theaters />
        </Avatar>
        <Typography component="h1" variant="h5">
          Email Form
        </Typography>
        {pending ? (
          <CircularProgress />
        ) : (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="from"
              label="send message from..."
              name="from"
              value={state.from}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="to"
              label="Send message to..."
              helperText='To send to many separate emails with a comma ","'
              name="to"
              value={state.to}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="subject"
              label="Email subject..."
              name="subject"
              value={state.subject}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="message"
              label="message to send..."
              name="message"
              value={state.message}
              onChange={handleChange}
            />
            <Button
              disabled={pending}
              className={classes.submit}
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
            >
              Send
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
}
