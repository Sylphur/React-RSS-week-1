import React, { Component } from 'react';
import './AppLoader.scss'

interface LoaderState {
  isLoading: boolean
}

class AppLoader extends Component<LoaderState> {
  render() {
    if (this.props.isLoading) return (
      <div className='app-loader'>
        <p className='app-loader-msg'>Loading ...</p>
      </div>
    );
    return <></>
  }
}

export default AppLoader;