if (typeof console !== 'undefined' && console.warn) {
  console.warn(
    '@weser/loops is deprecated. Please use @weser/array and @weser/object instead.'
  )
}

export { default as arrayEach } from './arrayEach.js'
export { default as arrayFilter } from './arrayFilter.js'
export { default as arrayGroupBy } from './arrayGroupBy.js'
export { default as arrayMap } from './arrayMap.js'
export { default as arrayReduce } from './arrayReduce.js'

export { default as objectEach } from './objectEach.js'
export { default as objectFilter } from './objectFilter.js'
export { default as objectFind } from './objectFind.js'
export { default as objectKeys } from './objectKeys.js'
export { default as objectMap } from './objectMap.js'
export { default as objectMergeDeep } from './objectMergeDeep.js'
export { default as objectReduce } from './objectReduce.js'
