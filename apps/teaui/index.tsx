import React, {useRef} from 'react'
import {
  interceptConsoleLog,
  type KeyEvent,
  type Screen,
  type Scrollable as ScrollableView,
} from '@teaui/core'
import {
  Box,
  Keyboard,
  Scrollable,
  Stack,
  Style,
  Text,
  run,
} from '@teaui/react'

function App() {
  return (
    <Stack.down>
      <Box border="rounded" flex={1}>
        <Scrollable.down>
          {Array.from({length: 40}, (_, index) => (
            <Text key={index}>
              Line {String(index + 1).padStart(2, '0')}{' '}
              {index % 5 === 0
                ? `◀ marker ${'·'.repeat(100)} end-of-line-${index + 1} ▶`
                : ''}
            </Text>
          ))}
        </Scrollable.down>
      </Box>
      <Text dim>
        mousewheel to scroll, ctrl+c to quit
      </Text>
    </Stack.down>
  )
}

let screen: Screen | undefined
;(async () => {
  interceptConsoleLog()

  const inline = process.argv.includes('--inline')
  const options = inline
    ? {display: {mode: 'inline' as const, height: 11}}
    : undefined
  ;[screen] = await run(<App />, options)
})()
