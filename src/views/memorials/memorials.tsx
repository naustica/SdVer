import { h, Component, ComponentChild } from 'preact'
import { route } from 'preact-router'
import { Md5 } from 'ts-md5/dist/md5'

import './memorials.scss'

interface Props {

}

interface State {
  items: any
}

export default class Memorials extends Component<Props, State> {

  readonly state = {
    items: [{'id': '', 'label': '', longitude: 0, latitude: 0, imageUrl: ''}]
  }

  public componentDidMount = (): void => {
    this.getData()
  }

  private goToItem = (id: string): void => {
    route('/item/' + id)
  }

  private getData = async (): Promise<void> => {

    let items = []

    const file = require('../../database/entries.json')

    for (let i=0; i<Object.keys(file).length; i++) {
      const id: string = file[i].wikidata_id
      const response = await fetch('https://www.wikidata.org/wiki/Special:EntityData/' + id + '.json')

      const data = await response.json()

      if (id) {
        const { latitude, longitude } = data['entities'][id].claims.P625[0].mainsnak.datavalue.value
        const label = data['entities'][id].labels.de.value

        let imageUrl

        try {
          let imageFile = data['entities'][id].claims.P18[0].mainsnak.datavalue.value

          imageFile = imageFile.split(' ').join('_')

          const imageUrlHash = Md5.hashStr(imageFile)

          imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/' + imageUrlHash[0] + '/' + imageUrlHash[0] + imageUrlHash[1] + '/' + imageFile
        } catch {
          imageUrl = ''
        }

        items.push({
          'id': id,
          'label': label,
          'imageUrl': imageUrl,
          'latitude': latitude,
          'longitude': longitude
        })
      }
      this.setState({
        items: items
      })
    }
  }

  private renderCards = (): ComponentChild => {

    const { items } = this.state

    let cards: Array<ComponentChild> = []

    for (let i=0; i<items.length; i++) {
      let id = items[i].id
      let label = items[i].label
      let imageUrl = items[i].imageUrl
      cards.push(
        <div class="infobox" onClick={() => this.goToItem(id)}>
          <div class="infobox-image">
            <img src={imageUrl} />
          </div>
          <div class="infobox-text">
            <div class="infobox-text-header">{label}</div>
            <div class="infobox-text-body">{}</div>
          </div>
        </div>
      )
    }
    return cards
  }

  public render = (): ComponentChild => {
    return (
      <div>
        {this.renderCards()}
      </div>
    )
  }
}
