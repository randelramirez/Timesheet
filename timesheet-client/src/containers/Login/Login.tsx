// import React, { useState } from 'react';
// import { RouteComponentProps } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import Input from '@material-ui/core/Input';

// type LoginProps = { name: string };

// function Login(props: RouteComponentProps & LoginProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   function onEmailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
//     setEmail(event.target.value);
//   }

//   function onPasswordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
//     setPassword(event.target.value);
//   }

//   function loginHandler(event: React.MouseEvent): void {
//     event.preventDefault();
//     if (email === 'randelramirez1@gmail.com' && password === 'Randel1_23') {
//       props.history.replace('/main/');
//     }

//     return;
//   }

//   return (
//     <div>
//       <form>
//         <div>
//           <label htmlFor="email">
//             Email
//             <span role="img" aria-label="email">
//               📧
//             </span>
//           </label>
//           {/* <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={onEmailChangeHandler}
//           value={email}
//         /> */}
//           <Input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={onEmailChangeHandler}
//             value={email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">
//             Password
//             <span role="img" aria-label="password">
//               🔑
//             </span>
//           </label>
//           <input
//             type="password"
//             name="password"
//             onChange={onPasswordChangeHandler}
//             value={password}
//           />
//           {/* <button onClick={loginHandler} type="button">
//             Login
//           </button> */}
//         </div>
//         <div>
//           {' '}
//           <Button
//             variant="contained"
//             autoCapitalize="false"
//             centerRipple
//             onClick={loginHandler}
//             color="primary"
//           >
//             Login
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// move this to its own component folder & file
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type LoginProps = { name: string };

function Login(props: RouteComponentProps & LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onEmailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function onPasswordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function loginHandler(event: React.MouseEvent): void {
    event.preventDefault();
    if (email === 'randelramirez1@gmail.com' && password === 'Randel1_23') {
      props.history.replace('/main/');
    }

    return;
  }

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={onEmailChangeHandler}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onPasswordChangeHandler}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default Login;
