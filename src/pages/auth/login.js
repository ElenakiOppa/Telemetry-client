import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Phone, setPhone] = useState('')
  const [isAuthenticated, setisAuthenticated] = useState(false);
  

  const handleLogin = (event) => {
    event.preventDefault();

    // Send user login data to the server
    fetch('http://localhost:3001/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email, Phone, Password }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Login successful.');
          isAuthenticated(true);
        } else if (response.status === 404) {
          console.log('User not found.');
        } else if (response.status === 403) {
          console.log('Email not confirmed.');
        } else if (response.status === 401) {
          console.log('Incorrect password.');
        } else {
          console.log('Unknown error.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  return (
    <>
      <Head
        sx={{ overflow: 'hidden' }}>
        <title>
          Login
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Phone Number"
                value="phoneNumber"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={handleLogin}
              >
                <Stack spacing={3}>
                  <TextField
                    // error={formik.touched.Email && formik.errors.Email}
                    fullWidth
                    // helperText={formik.touched.Email && formik.errors.Email}
                    label="Email Address"
                    name="Email"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // type="email"
                    // value={formik.values.Email}
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <TextField
                    // error={formik.touched.Password && formik.errors.Password}
                    fullWidth
                    // helperText={formik.touched.Password && formik.errors.Password}
                    label="Password"
                    name="Password"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    type="password"
                    // value={formik.values.Password}
                    value={Password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
               
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 1 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
              </form>
            )}
            {method === 'phoneNumber' && (
              <form
                noValidate
                onSubmit={handleLogin}
              >
                <Stack spacing={3}>
                  <TextField
                  // error={formik.touched.Phone && formik.errors.Phone}
                  fullWidth
                  // helperText={formik.touched.Phone && formik.errors.Phone}
                  label="Phone Number"
                  name="Phone"
                  // onBlur={formik.handleBlur}
                  // onChange={formik.handleChange}
                  // value={formik.values.Phone}
                  value={Phone}
                  onChange={(event) => setPhone(event.target.value)}
                  />

                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
               
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>96365771</b>
                  </div>
                </Alert>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
