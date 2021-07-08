import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
 
export default class Pdf extends React.Component {
    constructor(props) {
        super(props);
        
      }
  render() {
    return (
      <PDFReader
        source={{
          uri: 'https://services.hbsp.harvard.edu/api/courses/831509/items/915527-PDF-ENG/sclinks/4097a5cf595ce7d2aff8c8ebaed322dc',//this.props.route.params.url,
        }}
      />
    )
  }
}