import React from 'react';
import { Route, Redirect } from 'react-router-dom'


function ProtectedRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(isAuthenticated === false) {
          return <Component {...props} />
        } else {
          console.log(props);
          const loc = props.location.pathname;
          console.log(loc);
          if ((loc === '/' || loc === '/login' || loc === '/register') && props.location.state === undefined) {
            //Redirects all routes that are root /, /login or /register to /listpage if there are no previous routes in state
            return <Redirect to={{pathname: '/chat', state: props.location}} />
          } else {
            return <Redirect to={{pathname: props.location.state.from.pathname, state: props.location}} />
          }
        }
        }}
    />
  )
}

// function ProtectedRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         this.props.isAuthenticated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

export default ProtectedRoute;