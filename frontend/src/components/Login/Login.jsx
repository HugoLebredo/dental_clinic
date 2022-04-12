// import React from 'react';
import React from 'react'
import { SessionProvider, LoginButton } from '@inrupt/solid-ui-react'

const Login = () =>
<SessionProvider>
    <LoginButton
        authOptions={{ clientName: 'Test react SDK project' }}
        oidcIssuer={'q'}
        redirectUrl={'https://localhost:3000'}
        onError={console.error}>
        <button>
        {'An example project using the inrupt react SDK'}
        </button>
    </LoginButton>
</SessionProvider>
export default Login
