import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetPassword } from '../redux/cvs/cvs-slice';
import { useParams } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Momo CV Management System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function ResetPassword() {
  const { id, token } = useParams();
  const [password, setPassword] = React.useState({
    pass: "",
    confirm: "",
  });
  const dispatch = useDispatch()
  const {isError, isSuccess} = useSelector((state: any) => state);
  const [clicked, setClicked] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if( password.pass === password.confirm ) {
      dispatch(resetPassword({id: id || "", token: token || "", password: password.pass}) as any);
      setClicked(true);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password.pass}
                  onChange={(e) => setPassword({ ...password, pass: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  id="confirm"
                  autoComplete="confirm-new-password"
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
            {
              clicked && isSuccess && <Typography variant="body2" color="success" align="center">
                {'Password reset successfully'}
              </Typography>
            }
            {
              clicked && isError && <Typography color="error" variant="body2" align="center">
                {'Password reset failed'}
              </Typography>
            }
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}