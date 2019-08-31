import React from 'react'
import {
  List, Flex, Button, InputItem, WhiteSpace, Toast,
} from 'antd-mobile'
import GenerateProduct from './GenerateProduct'

class Specification extends React.Component {
  state = {
    specification: [],
    attribute: [],
    product: false,
  }

  mapSpecification = () => {
    const { specification } = this.state
    // console.log(specification)
    return specification.map((item, index) => (
      <React.Fragment key={index}>
        <InputItem
          defaultValue={item.spec_name}
          placeholder="请输入规格名称"
          cols={1}
          extra={
            <Flex justify="between">
              <Button size="small" type="ghost" onClick={() => this.addSpecificationChild(index)}>
                添加
              </Button>
              <Button
                size="small"
                type="warning"
                onClick={() => this.removeSpecificationChild(index)}
              >
                删除
              </Button>
            </Flex>
          }
          onChange={val => this.changeSpecName(val, index)}
        >
          规格名称{index + 1}
        </InputItem>
        {item.spec_val.map((item2, index2) => (
          <InputItem
            key={index2}
            placeholder="请输入属性值"
            defaultValue={item2}
            onChange={val => this.changeSpecAttrName(val, index, index2)}
          >
            属性值{index2 + 1}
          </InputItem>
        ))}
        {/* <Item defaultValue={item.list} onChange={val => this.changeSpeciValue(val, index)}>
          {this.mapSpeciValue()}
        </Item> */}
      </React.Fragment>
    ))
  }

  addSpecificationChild = index => {
    const { specification } = this.state
    const obj = JSON.parse(JSON.stringify(specification))
    obj[index].spec_val.push('')
    this.setState({
      specification: obj,
    })
  }

  removeSpecificationChild = index => {
    const { specification } = this.state
    const obj = JSON.parse(JSON.stringify(specification))
    obj[index].spec_val.splice(obj[index].spec_val.length - 1, 1)
    this.setState({
      specification: obj,
    })
  }

  mapAttribute = () => {
    const { attribute } = this.state
    // console.log(specification)
    return attribute.map((item, index) => (
      <React.Fragment key={index}>
        <InputItem
          defaultValue={item.spec_name}
          placeholder="请输入属性名称"
          cols={1}
          extra={
            <Flex justify="between">
              <Button size="small" type="ghost" onClick={() => this.addAttributeChild(index)}>
                添加
              </Button>
              <Button size="small" type="warning" onClick={() => this.removeAttributeChild(index)}>
                删除
              </Button>
            </Flex>
          }
          onChange={val => this.changeAttributeName(val, index)}
        >
          属性名称{index + 1}
        </InputItem>
        <InputItem
          defaultValue={item.spec_name}
          placeholder="请输入可选个数"
          cols={1}
          onChange={val => this.changeAttributeCount(val, index)}
        >
          属性可选个数
        </InputItem>
        {item.attr_val.map((item2, index2) => (
          <InputItem
            key={index2}
            placeholder="请输入属性值"
            defaultValue={item2}
            onChange={val => this.changeAttributeAttrName(val, index, index2)}
          >
            属性值{index2 + 1}
          </InputItem>
        ))}
      </React.Fragment>
    ))
  }

  addAttributeChild = index => {
    const { attribute } = this.state
    const obj = JSON.parse(JSON.stringify(attribute))
    obj[index].attr_val.push('')
    this.setState({
      attribute: obj,
    })
  }

  removeAttributeChild = index => {
    const { attribute } = this.state
    const obj = JSON.parse(JSON.stringify(attribute))
    obj[index].attr_val.splice(obj[index].attr_val.length - 1, 1)
    this.setState({
      attribute: obj,
    })
  }

  changeSpecName = (val, index) => {
    const { specification } = this.state
    const cache = JSON.parse(JSON.stringify(specification))
    // eslint-disable-next-line prefer-destructuring
    cache[index].spec_name = val
    this.setState({
      specification: cache,
    })
  }

  changeSpecAttrName = (val, index, index2) => {
    console.log(val)
    const { specification } = this.state
    const cache = JSON.parse(JSON.stringify(specification))
    // eslint-disable-next-line prefer-destructuring
    cache[index].spec_val[index2] = val
    this.setState({
      specification: cache,
    })
  }

  changeAttributeName = (val, index) => {
    const { attribute } = this.state
    const cache = JSON.parse(JSON.stringify(attribute))
    // eslint-disable-next-line prefer-destructuring
    cache[index].attr_name = val
    this.setState({
      attribute: cache,
    })
  }

  changeAttributeCount = (val, index) => {
    const { attribute } = this.state
    const cache = JSON.parse(JSON.stringify(attribute))
    // eslint-disable-next-line prefer-destructuring
    cache[index].attr_count = val
    this.setState({
      attribute: cache,
    })
  }

  changeAttributeAttrName = (val, index, index2) => {
    console.log(val)
    const { attribute } = this.state
    const cache = JSON.parse(JSON.stringify(attribute))
    // eslint-disable-next-line prefer-destructuring
    cache[index].attr_val[index2] = val
    this.setState({
      attribute: cache,
    })
  }

  submit = () => {
    const { specification, attribute } = this.state
    console.log(specification)
    if (!specification.length) {
      Toast.info('至少配置一项规格')
      return false
    }
    let bool = false
    specification.forEach(item => {
      if (!item.spec_name) {
        bool = true
      }
      item.spec_val.forEach(item2 => {
        if (!item2) {
          bool = true
        }
      })
    })
    if (bool) {
      Toast.info('请填写完整信息')
      return false
    }
    this.setState({
      product: true,
    })
    console.log(attribute)
  }

  render() {
    const { specification, attribute, product } = this.state
    return (
      <React.Fragment>
        {!product ? (
          <React.Fragment>
            <List>
              <List.Item
                extra={
                  <Flex justify="between">
                    <Button
                      size="small"
                      type="ghost"
                      onClick={() => this.setState({
                        specification: specification.concat({
                          spec_name: '',
                          spec_val: [''],
                        }),
                      })
                      }
                    >
                      添加
                    </Button>
                    {!specification.length ? null : (
                      <Button
                        size="small"
                        type="warning"
                        onClick={() => this.setState({
                          specification: specification.slice(0, specification.length - 1),
                        })
                        }
                      >
                        删除
                      </Button>
                    )}
                  </Flex>
                }
              >
                添加规格
              </List.Item>
              {this.mapSpecification()}
            </List>
            <WhiteSpace />

            <List>
              <List.Item
                extra={
                  <Flex justify="between">
                    <Button
                      size="small"
                      type="ghost"
                      onClick={() => this.setState({
                        attribute: attribute.concat({
                          attr_name: '',
                          attr_count: '',
                          attr_val: [''],
                        }),
                      })
                      }
                    >
                      添加
                    </Button>
                    {!attribute.length ? null : (
                      <Button
                        size="small"
                        type="warning"
                        onClick={() => this.setState({
                          attribute: attribute.slice(0, attribute.length - 1),
                        })
                        }
                      >
                        删除
                      </Button>
                    )}
                  </Flex>
                }
              >
                添加属性
              </List.Item>
              {this.mapAttribute()}
            </List>
            <Button
              type="primary"
              style={{
                width: '90%',
                marginLeft: '5%',
                marginTop: 20,
                marginBottom: 20,
              }}
              onClick={this.submit}
            >
              生成产品
            </Button>
          </React.Fragment>
        ) : (
          <GenerateProduct specification={specification} attribute={attribute} />
        )}
      </React.Fragment>
    )
  }
}

export default Specification
