import React from 'react';

class M extends React.Component {
  constructor(props) {
    super(props) 
    console.log(this.props) // nnamdi
  }

  render() {
      return (
          <div>
              Map component: <br/> 
               mid_lat : {this.props.mid_lat}
               <br />
               mid_lon : {this.props.mid_lon}
          </div>
      )
  }
}

export default M;
