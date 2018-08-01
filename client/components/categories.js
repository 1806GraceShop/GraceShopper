import React from 'react'
import {connect} from 'react-redux'
import {getAllCategories} from '../store'
import {Link} from 'react-router-dom'
import history from '../history'

class Categories extends React.Component {
  handleChange = evt => {
    evt.preventDefault()
    history.push(`/search/${evt.target.value}`)
  }

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label className="label-icon valign-wrapper">
            <i className="material-icons">search</i> Search
          </label>
          <input
            type="search"
            id="search"
            className="input-field"
            placeholder="Search..."
            name="productName"
            onChange={this.handleChange}
          />
        </form>
        <div className="divider" />
        <div className="collection center-align">
          <li className="collection-header">
            <h6>Sort by Category</h6>
          </li>
          {this.props.categories.map(category => (
            <Link
              className="collection-item black-text"
              key={category.id}
              to={`/category/${category.id}`}
            >
              <p>{category.name} </p>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getAllCategories())
  }
}

const mapStateToProps = state => ({
  categories: getAllCategories(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
