import React from 'react'
import {Link} from 'react-router-dom'

const AdminToolEditProduct = props => {
  const {isAdmin, inventory, match} = props
  return (
    isAdmin && (
      <div className="col s12">
        <div className="card red lighten-5  center-align">
          <div className="card-content">
            <div className="flow-text">Admin Tools</div>
            <div className="flow-text">
              (We have {inventory} of this product left.)
            </div>
            <Link
              to={`${match.url}/edit`}
              className="waves-effect red waves-light btn"
            >
              Edit Product
              <i className="material-icons right">edit</i>
            </Link>
          </div>
        </div>
      </div>
    )
  )
}

export default AdminToolEditProduct
