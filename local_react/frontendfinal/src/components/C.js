import React from 'react';

class C extends React.Component {
    constructor(props) {
      super(props) 
      console.log(this.props.name) // nnamdi
    }
  
    render() {
        return (
            <div>
                C component
                <button onClick={
                  (evt) => 
                    this.props.func([42.27822345, -71.37579087084606])
                  }>
                  Send To Parent
                </button>
            </div>
        )
    }
  }

export default C;
