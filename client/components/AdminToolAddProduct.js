import React from 'react'
import {Link} from 'react-router-dom'

const AdminToolAddProduct = props => {
  return (
    props.isAdmin && (
      <div className="col s12">
        <div className="card red lighten-5  center-align">
          <div className="card-content">
            <div className="flow-text">Admin Tools</div>
            <Link
              to="/product/add"
              className="waves-effect red waves-light btn"
            >
              Add Product
              <i className="material-icons right">edit</i>
            </Link>
          </div>
        </div>
      </div>
    )
  )
}

export default AdminToolAddProduct
