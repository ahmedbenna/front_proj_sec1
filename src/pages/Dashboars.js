import React, { useContext } from 'react';
import DashboardClient from './DashboardClient';
import DashboardAdmin from './DashboardAdmin';
// import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
    const { logout, user } = React.useContext(AuthContext);
  
    if (user)
        return (
            <div>

                {user.role === 'client' ? (
                    <DashboardClient />
                ) : (
                    <DashboardAdmin />
                )}
            </div>
        );
    else
        return (<Navigate to='/login' />)
}

export default Dashboard;