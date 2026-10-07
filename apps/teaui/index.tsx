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
  const scrollable = useRef<ScrollableView>(null)

  function handleKey(event: KeyEvent) {
    switch (event.name) {
      case 'up':
        scrollable.current?.scrollBy(0, -1)
        break
      case 'down':
        scrollable.current?.scrollBy(0, 1)
        break
      case 'left':
        scrollable.current?.scrollBy(-2, 0)
        break
      case 'right':
        scrollable.current?.scrollBy(2, 0)
        break
      case 'q':
        screen?.exit()
    }
  }

  return (
    <Keyboard onKey={handleKey}>
      <Stack.down>
        <Box border="rounded" flex={1}>
          <Scrollable.down
            ref={scrollable}
            contentSize={{width: 140, height: 40}}
            showScrollbars={false}
          >
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
        <Text>
          <Style dim>arrows to scroll, q to quit</Style>
        </Text>
      </Stack.down>
    </Keyboard>
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
