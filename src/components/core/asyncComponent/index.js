/**
 * 公用路由懒加载高阶组件(官方已实现，使用lazy函数和Suspense组件)
 */
import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component: component
      })
    }

    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : 'loadding...'
    }
  }

  return AsyncComponent
}
