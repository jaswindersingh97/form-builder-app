import React, { useState } from 'react';
import styles from './style.module.css';

function EmailInvites() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState({
    email: "",
    access: "Edit"
  });
  const [link, setLink] = useState("https://example.com/invite");

  // Mock data for suggestions
  const mockUsers = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredUsers);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setData((prevData) => ({ ...prevData, email: user.email }));
    setSearch("");
    setSuggestions([]);
  };

  const handleRemoveUser = () => {
    setSelectedUser(null);
    setData((prevData) => ({ ...prevData, email: "" }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.email) {
      alert("Please select or enter a valid email address.");
      return;
    }
    console.log(`Invitation sent to ${data.email} with ${data.access} access`);
    alert(`Invitation sent to ${data.email} with ${data.access} access`);
    setSelectedUser(null);
    setData((prevData) => ({ ...prevData, email: "" }));
  };

  const onLinkShare = () => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div className={styles.header}>
          <h2>Invite by Email</h2>
          <select
            value={data.access}
            onChange={(e) =>
              setData((prevData) => ({ ...prevData, access: e.target.value }))
            }
          >
            <option value="Edit">Edit</option>
            <option value="View">View</option>
          </select>
        </div>
        <div className={styles.body}>
          {selectedUser ? (
            <div className={styles.selectedUser}>
              <span>{selectedUser.name} ({selectedUser.email})</span>
              <button
                type="button"
                onClick={handleRemoveUser}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ) : (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search or enter email"
                value={search}
                onChange={handleSearch}
              />
              {suggestions.length > 0 && (
                <ul className={styles.suggestions}>
                  {suggestions.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <button type="submit">Send Invite</button>
          <h3>Invite by Link</h3>
          <button type="button" onClick={onLinkShare}>
            Copy link
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailInvites;
