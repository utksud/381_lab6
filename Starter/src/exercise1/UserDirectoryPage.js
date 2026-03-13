import { useEffect, useState } from 'react';
import Controls from './Controls';
import UserList from './UserList';

const API_URL = 'https://69a1dd672e82ee536fa268a4.mockapi.io/user_api';

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  function handleDeleteClick(userId) {
    if (!userId) return;

    fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setUsers(users.filter((user) => String(user.id) !== String(userId)));
      })
      .catch((error) => console.error('Error deleting user:', error));
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort(
      (a, b) => a.user_group - b.user_group
    );
    setUsers(sortedUsers);
    setSortBy('group');
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );
    setUsers(sortedUsers);
    setSortBy('id');
  }

  function handleViewToggleClick() {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;