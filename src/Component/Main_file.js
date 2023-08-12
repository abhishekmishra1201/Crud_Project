
import React, { useState, useEffect } from 'react';
import './Main.file.css';

const Main_file = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: ''
  });


  useEffect(() => {
    setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
    }, 10000);
  }, []);
  const handleCreateUser = () => {
    // Simulate POST request to create new user
    const newUserObj = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    };

    setUsers([...users, newUserObj]);
    setNewUser({ name: '', email: '', phone: '' });
  };
  const handleEditClick = user => {
    setSelectedUser(user);
  };

  const handleUpdateClick = updatedUser => {
    // Simulate PUT request to update user
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null); // Clear selected user after update
  };

  const handleDeleteClick = userId => {
    // Simulate DELETE request to delete user
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <center><h1>User Management App</h1></center>
        {loading ? (
          
          <ul className="post">
            
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className="movie--isloading">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-text-container">
                    <div className="loading-main-text"></div>
                    <div className="loading-sub-text"></div>
                  </div>
                  <div className="loading-btn"></div>
                </div>
              </li>
            ))}
          </ul>
          
        ) : (
          <ul className="post">
             <li className='user-card'>
              <div className="create-form">
                <h3>Create New User</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                />
                <button onClick={handleCreateUser}>Create User</button>
              </div>
            </li>
            {users.map(user => (
              <li key={user.id} className='user-card'>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                {selectedUser && selectedUser.id === user.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={selectedUser.name}
                      onChange={e =>
                        setSelectedUser({
                          ...selectedUser,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={e =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="tel"
                      value={selectedUser.phone}
                      onChange={e =>
                        setSelectedUser({
                          ...selectedUser,
                          phone: e.target.value,
                        })
                      }
                    />
                    <button
                      className="update-btn"
                      onClick={() => handleUpdateClick(selectedUser)}
                    >
                      Update
                    </button>
                    <button
                      className="cancel"
                      
                      onClick={() => setSelectedUser(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className='btn' onClick={() => handleEditClick(user)}>Edit</button>
                    <button className='btn' onClick={() => handleDeleteClick(user.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Main_file;
