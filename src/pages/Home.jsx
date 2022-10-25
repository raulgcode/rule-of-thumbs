import React from 'react';
import { getUsers } from "../services/users.service";
import { useAppContext } from '../context';

import { Body, Header, Navbar, RulingCard } from '../components';

import './index.css'

const Home = () => {
  const {state, loadUsers} = useAppContext()

  React.useEffect(() => {
    (async () => {
      const {data: users} = await getUsers();
      loadUsers(users)
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <Body>
        <div className="grid horizontal-scroll">
          {state.users.length > 0 && state.users.map(user => <RulingCard key={user.id} user={user} />)}
        </div>
      </Body>
    </>
  )
}

export default Home;