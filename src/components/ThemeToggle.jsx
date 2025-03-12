import React, { Fragment } from 'react'

function ThemeToggle({ theme, ThemeToggle }) {
    return (
        <Fragment>
            <button
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: theme === "light" ? "#2229" : "#fff",
                    color: theme === "light" ? "#fff" : "#2225",
                }}
                onClick={ThemeToggle}
            >
                {theme === "light" ? "🌕" : "🌙"}
            </button>
        </Fragment>
    )
}

export default ThemeToggle
