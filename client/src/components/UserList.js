import React from 'react';

import UserCard from './UserCard';

const UserList = ({users, getUsers}) => {
    return (
        <div>
            {users.map(user => 
                <UserCard key={user.id} user={user} getUsers={getUsers}/>
            )}
        </div>
    );
};

export default UserList;