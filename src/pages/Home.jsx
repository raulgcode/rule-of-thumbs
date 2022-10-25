import React from 'react';
import { getUsers } from "../services/users.service";
import { useAppContext } from '../context';

import { Body, Header, Navbar, RulingCard, ViewSelector } from '../components';

import './index.css'

const Home = () => {
  const {state, loadUsers, changeView} = useAppContext()

  React.useEffect(() => {
    (async () => {
      const {data: users} = await getUsers();
      loadUsers(users)
    })();
  }, []);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        changeView('grid')
      } 
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      <Navbar />
      <Header />
      <Body>
        <ViewSelector />
        <div className={`horizontal-scroll ${state.view}`}>
          {state.users.length > 0 && state.users.map(user => <RulingCard key={user.id} user={user} />)}
        </div>
      </Body>
    </>
  )
}

export default Home;