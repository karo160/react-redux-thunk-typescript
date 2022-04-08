import React from 'react'
import { citiesListType } from './types'
import Select from 'react-select'
import { Props } from 'react-select'

function CitiesList<city extends citiesListType>(props: Props<city>) {
  return (
    <Select
      options={props.options}
      isMulti
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      onInputChange={props.onInputChange}
    />
  )
}
export default CitiesList
