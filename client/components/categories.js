import React from 'react'
import {connect} from 'react-redux'
import {getAllCategories, getProdCats, getProductsByCategory} from '../store'
import {Link} from 'react-router-dom'

class Categories extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
          <p>In the Category component!!!</p>


        <div className="container">
          {this.props.categories.map(category => (
            <Link  key={category.id} to={`/category/${category.id}`}>
            <p>{category.name} </p>
            </Link>
          ))}
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getAllCategories())
})

const mapStateToProps = state => ({
  categories: getAllCategories(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
