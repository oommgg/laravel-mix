import mix from '../src/index'
import test from 'ava'

test('that it can merge config', t => {
  Config.merge({
    versioning: true,
    foo: 'bar'
  })

  t.is('bar', Config.foo)
  t.true(Config.versioning)
})

test('that it intelligently builds the Babel config', t => {
  // Given the user has a custom .babelrc file...
  new File('.babelrc').write('{ "presets": [ ["@babel/preset-env", {"useBuiltIns": "usage"}] ] }')

  // And we construct the Babel config for Mix...
  let options = Config.babel()

  // Then it should smartly merge the user's .babelrc with Mix's.
  t.deepEqual({ useBuiltIns: 'usage' }, options.presets[0][1])

  t.is(1, options.presets.length)

  t.is('@babel/preset-env', options.presets[0][0])

  // Clean up.
  File.find('.babelrc').delete()
})
