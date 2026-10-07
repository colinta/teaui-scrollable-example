import React, {useState} from 'react'
import {Box, Text, render, useApp, useInput, useWindowSize} from 'ink'

function ScrollView({
  height,
  children,
}: {
  readonly height: number
  readonly children: React.ReactNode
}) {
  const {columns} = useWindowSize()
  const clientWidth = Math.max(0, columns - 2)
  const clientHeight = Math.max(0, height - 2)
  const content = {width: 140, height: 40}
  const [requestedScrollTop, setRequestedScrollTop] = useState(0)
  const [requestedScrollLeft, setRequestedScrollLeft] = useState(0)
  const maxScrollTop = Math.max(0, content.height - clientHeight)
  const maxScrollLeft = Math.max(0, content.width - clientWidth)
  const scrollTop = Math.min(requestedScrollTop, maxScrollTop)
  const scrollLeft = Math.min(requestedScrollLeft, maxScrollLeft)

  useInput((_input, key) => {
    if (key.upArrow) {
      setRequestedScrollTop(current =>
        Math.max(0, Math.min(current, maxScrollTop) - 1),
      )
    }

    if (key.downArrow) {
      setRequestedScrollTop(current => Math.min(maxScrollTop, current + 1))
    }

    if (key.leftArrow) {
      setRequestedScrollLeft(current =>
        Math.max(0, Math.min(current, maxScrollLeft) - 2),
      )
    }

    if (key.rightArrow) {
      setRequestedScrollLeft(current => Math.min(maxScrollLeft, current + 2))
    }
  })

  return (
    <Box flexDirection="column">
      <Box
        height={height}
        overflow="hidden"
        flexDirection="column"
        borderStyle="round"
      >
        <Box
          position="relative"
          top={-scrollTop}
          left={-scrollLeft}
          flexDirection="column"
          flexShrink={0}
          width={140}
        >
          {children}
        </Box>
      </Box>
      <Text dimColor>
        scrollTop={scrollTop}/{maxScrollTop} scrollLeft={scrollLeft}/
        {maxScrollLeft} client={clientWidth}x{clientHeight} content={content.width}
        x{content.height} (arrows to scroll, q to quit)
      </Text>
    </Box>
  )
}

function App() {
  const {exit} = useApp()

  useInput(input => {
    if (input === 'q') {
      exit()
    }
  })

  return (
    <ScrollView height={10}>
      {Array.from({length: 40}, (_, index) => (
        <Text key={index} wrap="truncate">
          Line {String(index + 1).padStart(2, '0')}{' '}
          {index % 5 === 0
            ? `◀ marker ${'·'.repeat(100)} end-of-line-${index + 1} ▶`
            : ''}
        </Text>
      ))}
    </ScrollView>
  )
}

render(<App />)
