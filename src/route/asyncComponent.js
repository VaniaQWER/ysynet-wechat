import React, { Component } from "react";

export default function asyncComponent(importComponent, title) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      document.querySelector('title').text = title;
      this.setState({
        component: component
      });
    }
    componentWillUnmount(){ 
      this.setState = (state,callback)=> ({}) 
    }
    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}