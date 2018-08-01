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
          <h5>Categories</h5>
        <div className="container">
          {this.props.categories.map(category => {
            let catText
            if (category.id === +this.props.catId) {
              catText = <Link  key={category.id} to={`/category/${category.id}`}><p><div className="blue-text blue lighten-5">{category.name}</div></p></Link>
            } else {
              catText = <Link  key={category.id} to={`/category/${category.id}`}><p>{category.name}</p></Link>
            }
            return (
              <div>
                {catText}
              </div>
            )
          }
          )}
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
