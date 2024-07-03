import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header(){
    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-secondary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#">Mercado</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/productlist" className="nav-link">Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/typelist" className="nav-link">Tipos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sale" className="nav-link">Venda</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Header;