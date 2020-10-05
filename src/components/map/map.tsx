import { h, Component, ComponentChild, createRef, RefObject } from 'preact'
import L from 'leaflet'

import './map.scss'

interface Props {
  label: string,
  latitude: number,
  longitude: number
}

const openStreetMapJSScript: HTMLScriptElement = document.createElement('script')
openStreetMapJSScript.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
openStreetMapJSScript.integrity = "sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
openStreetMapJSScript.crossOrigin = ""

export default class OpenStreetMap extends Component<Props> {

  private openStreetMapRef: RefObject<any> = createRef()
  private markerRef: RefObject<void> = createRef()

  private map: any = null
  private marker: any = null

  public componentDidMount = (): void => {
    if (!window.document.body.contains(openStreetMapJSScript)) {
      this.initialMap()
    }
    else {
      this.openStreetMapRef.current = this.createOpenStreetMap()
      this.markerRef.current = this.createMarker()
    }
  }

  public componentDidUpdate = (prevProps: Props): void => {
    const { latitude, longitude, label } = this.props
    if (latitude != prevProps.latitude || longitude != prevProps.longitude) {
      this.map.setView([latitude, longitude], 14)
      this.marker.setLatLng([latitude, longitude])
    }

    if (label != prevProps.label) {
      this.marker.bindPopup('<b>'+label+'</b>')
                 .openPopup()
    }
  }

  private initialMap = (): void => {
    window.document.body.appendChild(openStreetMapJSScript)

    openStreetMapJSScript.addEventListener('load', () => {
      this.openStreetMapRef.current = this.createOpenStreetMap()
      this.markerRef.current = this.createMarker()
    })
  }

  private createOpenStreetMap = (): void => {
    const { latitude, longitude } = this.props

    this.map = L.map('openStreetMap').setView([latitude, longitude], 14)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoibmF1c3RpY2EiLCJhIjoiY2tmM3kxNXkxMDd3dDJ6bWRhbnljaGN3diJ9.QxYf1vUJ49JQ-tjfhmwu1w'
    }).addTo(this.map)
  }

  private createMarker = (): void => {
    const { latitude, longitude, label } = this.props
    console.log(label)
    this.marker = L.marker([latitude, longitude]).addTo(this.map)
  }

  public render = (): ComponentChild => {
    return (
      <div id="openStreetMap" class="map" ref={this.openStreetMapRef} />
    )
  }
}
