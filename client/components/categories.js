import React from 'react'
import {connect} from 'react-redux'
import {getAllCategories, getProdCats} from '../store'


class Categories extends React.Component {
  render() {
    return (
      <div className="container">
          <p>In the Category component!!!</p>


        <div className="container">
          {this.props.categories.map(category => (
            <div>{category.name} <br /></div>
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
  // product
})

// // ^^^^^^^^  call a different getavailableProductd(state.FILTEREDproductds)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
