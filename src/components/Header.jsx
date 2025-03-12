import React, { Fragment } from 'react';
import ThemeToggle from './ThemeToggle';

function Header({ activeTab, setActiveTab, theme }) {
    const navItems = [
        { id: "home", label: "Home" },
        { id: "todo", label: "Todo List" },
        { id: "profile", label: "User Profile" },
        { id: "counter", label: "Counter" },
        { id: "fruits", label: "Fruit List" },
    ];

    const headerStyle = {
        position: "sticky",
        top: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: `1px solid ${theme === "light" ? "#862d59" : "#fff"}`,
        backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
    };

    const navStyle = {
        display: "flex",
        gap: "40px",
        listStyle: "none",
        padding: 0,
        margin: 0,
    };

    return (
        <Fragment>
            <header style={headerStyle}>
                <nav>
                    <ul style={navStyle}>
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    cursor: "pointer",
                                    padding: "5px 10px",
                                    color: activeTab === item.id ? "white" : "gray",
                                    backgroundColor: activeTab === item.id ? "#646cff" : "transparent",
                                    fontFamily: "'Trebuchet MS', serif",
                                    fontWeight: "bold",
                                    fontSize: "19px",
                                    borderRadius: "4px",
                                }}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
                <ThemeToggle theme={theme} />
            </header>
        </Fragment>
    );
}

export default Header;