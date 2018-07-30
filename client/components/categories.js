import React from 'react'
import {connect} from 'react-redux'
import {getCategories, getProdCats} from '../store'

// class Categories extends React.Component {
export const Categories = props => {
  // render() {
    return (
      <div>
        <div>
          <p>In the Category component!!!</p>
        </div>


        {/* <div className="container">
          {this.categories.map(category => (
            category.name
          ))} */}
        </div>
      </div>
    )
}

const mapState = state => ({
  categories: getCategories(state)
})

export default connect(mapState)(Categories)


// const mapDispatchToProps = dispatch => ({
//   getCategories: () => dispatch(getCategories())
// })

// //  ^^^^^^^^ shouldn't have to do anything here since weva already dispathced and reterieved all the datsa

// const mapStateToProps = state => ({
//   categories: getCategories(state.categories)
// })

// // ^^^^^^^^  call a different getavailableProductd(state.FILTEREDproductds)

// export default connect(mapStateToProps, mapDispatchToProps)(Categories)
