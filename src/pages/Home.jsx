import React from 'react';
import { getUsers } from "../services/users.service";
import { useAppContext } from '../context';
import { LOAD_USERS } from '../context/reducer'
import { Body, Header, Navbar } from '../components';

const Home = () => {
  const {state, dispatch} = useAppContext()

  React.useEffect(() => {
    (async () => {
      const {data: users} = await getUsers();
      dispatch({type: LOAD_USERS, payload: { users}})
    })();
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Header />
      <Body>
        {state.users.length > 0 && state.users.map(user => <p key={user.id}>{user.name}</p>)}
      </Body>
    </>
  )
}

export default Home;