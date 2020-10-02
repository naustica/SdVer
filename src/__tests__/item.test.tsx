import { render, cleanup } from '@testing-library/preact'
import { h } from 'preact'
import { expect } from 'chai'

import Item from '../views/item/item'

describe('ItemTest', () => {

  afterEach(cleanup)

  it('should render Component', () => {
    const { container } = render(<Item />)
    expect(container).exist
  })

})
