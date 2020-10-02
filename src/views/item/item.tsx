import { h, Component, ComponentChild } from 'preact'
import OpenStreetMap from '../../components/map/map'
import { route } from 'preact-router'
import { Md5 } from 'ts-md5/dist/md5'

import './item.scss'

interface Props {
  id?: string
}

interface State {
  label: string,
  imageUrl: string,
  latitude: number,
  longitude: number,
}

export default class Item extends Component<Props, State> {

  readonly state = {
    label: '',
    imageUrl: '',
    latitude: 0,
    longitude: 0
  }

  public componentDidMount = () => {
    const { id } = this.props
    this.getData(id)
  }

  public componentDidUpdate = (prevProps: Props): void => {
    if (this.props.id != prevProps.id) {
      const { id } = this.props
      this.getData(id)
    }
  }

  private getData = async (id: string | undefined): Promise<void> => {

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

      this.setState({
        label: label,
        imageUrl: imageUrl,
        latitude: latitude,
        longitude: longitude
      })
    }
  }

  private goBack = (): void => {
    route('/')
  }

  private renderItem = (): ComponentChild => {
    const { label, latitude, longitude } = this.state

    return (
      <div class="item-container">
        <div class="go-back" onClick={this.goBack}><span class="arrow-left"></span>Zurück</div>
        <h1 class="item-container-header">{label}</h1>
        <OpenStreetMap latitude={latitude} longitude={longitude} />
      </div>
    )
  }

  public render = (): ComponentChild => {
    console.log(this.state.imageUrl)
    return (
      <div>
        {this.renderItem()}
      </div>
    )
  }
}
