import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Api from './../../../Api/Api';
import { toast } from 'react-toastify';
function EmailInvites() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState({
    email: "",
    access: "edit"
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        SearchApi(search); // Call API when debounced search value changes
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
      }
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler); // Clear timeout if search value changes
    };
  }, [search]); // Only re-run when `search` changes

  const SearchApi = async (value) => {
    try {
      const response = await Api({
        endpoint: `/secure/users/search?query=${value}`,
        method: "get",
        includeToken: true,
      });
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions: ", error);
      setSuggestions([]);
    }
  };

  const shareDashboard = async({email,access}) =>{
    const response = await Api({
      endpoint: "/secure/dashboard/share",
      method: "post",
      includeToken:true,
      data: { email: email,permission:access },
    });
    if(response.status == 200){
        // closeModal();
      toast.success("Dashboard Shared Successfully");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value); // Update search input
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
      toast.error("Please select or enter a valid email address.");
      return;
    }
    shareDashboard(data);
    setSelectedUser(null);
    setData((prevData) => ({ ...prevData, email: "" }));
  };

  const onLinkShare = async() => { 

    const response = await Api({endpoint:"/secure/dashboard/createLink",
      method:'post',
      includeToken:true,
      data:
      {access:data.access}
    });

    navigator.clipboard.writeText(`${window.location.origin}/getPermission/${response.data.link}`)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div className={styles.header}>
          <h3>Invite by Email</h3>
          <select
            value={data.access}
            onChange={(e) =>
              setData((prevData) => ({ ...prevData, access: e.target.value }))
            }
          >
            <option value="edit">Edit</option>
            <option value="view">View</option>
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
                <ol className={styles.suggestions}>
                  {suggestions.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ol>
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
