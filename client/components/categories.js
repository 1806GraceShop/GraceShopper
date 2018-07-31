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

// export default connect(mapState)(Categories)


const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getAllCategories())
})

// //  ^^^^^^^^ shouldn't have to do anything here since weva already dispathced and reterieved all the datsa

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  // prodCats: getProductsByCategory(state)
})

// // ^^^^^^^^  call a different getavailableProductd(state.FILTEREDproductds)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
