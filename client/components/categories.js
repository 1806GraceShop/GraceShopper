import React from 'react'
import { connect } from 'react-redux'
import { getAllCategories, getProductsBySearch } from '../store'
import { Link } from 'react-router-dom'
import history from '../history'

class Categories extends React.Component {

  handleChange = (evt) => {
    evt.preventDefault()
    history.push(`/search/${evt.target.value}`)
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label> Search for Product </label>
          <input
            type="text"
            placeholder="Search..."
            name="productName"
            autoFocus 
            onChange = {this.handleChange}
          />          
        </form>
        <div>
          {this.props.categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>
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
    getCategories: () => dispatch(getAllCategories()),
  }
}

const mapStateToProps = state => ({
  categories: getAllCategories(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
