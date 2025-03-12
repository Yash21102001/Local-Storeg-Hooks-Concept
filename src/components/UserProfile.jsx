import React, { Fragment, useEffect, useState } from 'react';

function UserProfile({ theme }) {
    const [profiles, setProfiles] = useState(() => {
        const saved = localStorage.getItem("userProfiles");
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                name: "User11",
                email: "user11@gmail.com",
                bio: "Developer11",
                phone: "1234567890",
                address: "India"
            },
            {
                id: 2,
                name: "User22",
                email: "user22@gmail.com",
                bio: "Developer22",
                phone: "1234567890",
                address: "India"
            },
            {
                id: 3,
                name: "User33",
                email: "user33@gmail.com",
                bio: "Developer33",
                phone: "1234567890",
                address: "India"
            }
        ];
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem("userProfiles", JSON.stringify(profiles));
    }, [profiles]);

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            const updatedProfiles = profiles.map(profile =>
                profile.id === editId ? { ...profile, ...formData } : profile
            );
            setProfiles(updatedProfiles);
        } else {
            const newProfile = { ...formData, id: profiles.length + 1 };
            setProfiles([...profiles, newProfile]);
        }
        setIsEditing(false);
        setFormData({});
        setEditId(null);
    };

    const handleEdit = (profile) => {
        setFormData(profile);
        setEditId(profile.id);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        const updatedProfiles = profiles.filter(profile => profile.id !== id);
        setProfiles(updatedProfiles);
    };

    // Styles
    const containerStyle = {
        maxWidth: "1200px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: theme === "light" ? "#f9f9f9" : "#333",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: theme === "light" ? "#333" : "#fff",
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        margin: "20px 0",
    };

    const thTdStyle = {
        border: `1px solid ${theme === "light" ? "#ddd" : "#555"}`,
        padding: "12px",
        textAlign: "left",
    };

    const buttonStyle = {
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        backgroundColor: theme === "light" ? "#007bff" : "#0056b3",
        color: "#fff",
        margin: "5px",
    };

    const modalStyle = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const modalContentStyle = {
        backgroundColor: theme === "light" ? "#fff" : "#444",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "10px 0",
        border: `1px solid ${theme === "light" ? "#ddd" : "#555"}`,
        borderRadius: "5px",
        backgroundColor: theme === "light" ? "#fff" : "#444",
        color: theme === "light" ? "#333" : "#fff",
    };

    return (
        <Fragment>
            <div style={containerStyle}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>User Profiles</h1>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thTdStyle}>Name</th>
                            <th style={thTdStyle}>Email</th>
                            <th style={thTdStyle}>Bio</th>
                            <th style={thTdStyle}>Phone</th>
                            <th style={thTdStyle}>Address</th>
                            <th style={thTdStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map(profile => (
                            <tr key={profile.id}>
                                <td style={thTdStyle}>{profile.name}</td>
                                <td style={thTdStyle}>{profile.email}</td>
                                <td style={thTdStyle}>{profile.bio}</td>
                                <td style={thTdStyle}>{profile.phone}</td>
                                <td style={thTdStyle}>{profile.address}</td>
                                <td style={thTdStyle}>
                                    <button 
                                        style={{ ...buttonStyle, backgroundColor: "#28a745" }} 
                                        onClick={() => handleEdit(profile)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        style={{ ...buttonStyle, backgroundColor: "#dc3545" }} 
                                        onClick={() => handleDelete(profile.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button 
                    style={{ ...buttonStyle, backgroundColor: "#28a745" }} 
                    onClick={() => setIsEditing(true)}
                >
                    Add New Profile
                </button>
            </div>

            {isEditing && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                            {editId ? "Edit Profile" : "Add New Profile"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name || ""}
                                onChange={handleChanges}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email || ""}
                                onChange={handleChanges}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="text"
                                name="bio"
                                placeholder="Bio"
                                value={formData.bio || ""}
                                onChange={handleChanges}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="number"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone || ""}
                                onChange={handleChanges}
                                required
                                style={inputStyle}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address || ""}
                                onChange={handleChanges}
                                required
                                style={inputStyle}
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button 
                                    style={{ ...buttonStyle, backgroundColor: "#28a745" }} 
                                    type="submit"
                                >
                                    {editId ? "Update" : "Add"}
                                </button>
                                <button 
                                    style={{ ...buttonStyle, backgroundColor: "#dc3545" }} 
                                    type="button" 
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default UserProfile;