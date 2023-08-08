import React from 'react'
// import PropTypes from 'prop-types'
export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{props.Name}</a>
                </div>
            </nav>
        </div>
    )
}

// Navbar.propstypes = {
//     Name: PropTypes.string,
//     Ndropdown: PropTypes.string,
//     Ndropitem1:PropTypes.string,
//     Ndropitem2:PropTypes.string,
//     Ndropitem3:PropTypes.string,
// }
// Navbar.defaultProps = {
//     Name : "company",
//     Ndropdown: "dropdown",
   
// }