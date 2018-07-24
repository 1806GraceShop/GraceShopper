import React from 'react'
import {ProductCard} from '../components'

const dummyData = [
  {
    name: 'Test',
    id: 1,
    description: 'Test description',
    price: '$3.00',
    imageUrl: 'https://www.fillmurray.com/200/300'
  },
  {
    name: 'Test 2',
    id: 2,
    description: 'Test description 2',
    price: '$4.00',
    imageUrl: 'https://www.fillmurray.com/200/300'
  },
  {
    name: 'Test 3',
    id: 3,
    description: 'Test description 3',
    price: '$5.00',
    imageUrl: 'https://www.fillmurray.com/200/300'
  }
]

export default class Component extends React.Component {
  componentDidMount() {
    //placholder
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {dummyData.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    )
  }
}
