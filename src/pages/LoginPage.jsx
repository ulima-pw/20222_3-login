const LoginPage = () => {
    return <div className="container">
        <h1>Login</h1>
        <div>
            <label className="form-label">
                Usuario
            </label>
            <input className="form-control" />
        </div>
        <div>
            <label className="form-label">
                Password
            </label>
            <input className="form-control" />
        </div>
        <button className="btn btn-primary" type="button">Login</button>
    </div>
}

export default LoginPage