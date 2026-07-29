function Navbar({ setShowLogin }) {
    return (
    <header className="navbar">
    <h2>MemoryVerse AI</h2>

    <button
        className="login-btn"
        onClick={() => setShowLogin(true)}
    >
        Login
    </button>
    </header>
);
}

export default Navbar;