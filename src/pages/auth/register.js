import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useState } from 'react';

const validationSchema = Yup.object({
  Name: Yup.string().required('Your name is required'),
  Password: Yup.string().required('Password is required'),
});

function AddUser() {
  const router = useRouter();
  const auth = useAuth();

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Phone, setPhone] = useState('')
  const [confirmationType, setConfirmationType] = useState('sms');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name, Email, Phone, Password, confirmationType }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setIsRegistered(true);
        // Handle success or error response from the server as needed
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    // Send user confirmation data to the server
    fetch('http://localhost:3001/users/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email, Phone, confirmationCode }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setIsConfirmed(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };


  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'aplication/json' },
  //   body: JSON.stringify({
  //     Name: name,
  //     Email: email,
  //     Phone: phone,
  //     Password: password
  //   }),

  // };

  // fetch('http://localhost:3001/users/add',
  //   requestOptions)
  //   .then(response => response.json())
  //   .then(data => { console.log(data) })


  // const formik = useFormik({
  //   initialValues: {
  //     Name: '',
  //     Email: '',
  //     Phone: '',
  //     Password: '',
  //   },
  //   validationSchema,
  //   onSubmit: (_values) => {
  //     const params = {
  //       Name: formik.values.Name,
  //       Email: formik.values.Email,
  //       Phone: formik.values.Phone,
  //       Password: formik.values.Password
  //     };
  //   }
  // });
  if (isRegistered && !isConfirmed) {
    return (
      <div>
        <h1>Confirm Registration</h1>
        <form onSubmit={handleConfirm}>
          <div>
            <label htmlFor="confirmationCode">Confirmation Code:</label>
            <input
              type="text"
              id="confirmationCode"
              value={confirmationCode}
              onChange={(event) => setConfirmationCode(event.target.value)}
            />
          </div>
          <button type="submit">Confirm</button>
        </form>
      </div>
    );
  } else if (isConfirmed) {
    return <h1>Registration Confirmed. You can now login.</h1>;
  } else {
    return (
      <>
        <Head>
          <title>
            Register
          </title>
        </Head>
        <Box
          sx={{
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
                  Register
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Already have an account?
                  &nbsp;
                  <Link
                    component={NextLink}
                    href="/auth/login"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Log in
                  </Link>
                </Typography>
              </Stack>
              <form
                onSubmit={handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    // error={formik.touched.Name && formik.errors.Name}
                    fullWidth
                    // helperText={formik.touched.Name && formik.errors.Name}
                    label="Name"
                    name="Name"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    // value={formik.values.Name}
                    value={Name}
                    onChange={(event) => setName(event.target.value)}


                  />
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
                {/* {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )} */}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  onClick={(event) => { handleSubmit(event) }}
                >
                  Continue
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </>
    );
  }
}
// };

AddUser.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default AddUser;
