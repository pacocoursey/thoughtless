import React, { useState, useCallback } from 'react'

const Word = ({ children }) => {
  return (
    <span className="word">
      {children}
    </span>
  )
}

const App = () => {
  const [text, setText] = useState('')

  const onComplete = useCallback(() => {
    document.querySelector('html').classList.add('done')
  }, [])

  return (
    <main>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        spellCheck={false}
        autoFocus
      />
      <pre aria-hidden>
        {text.split(' ').map((word, i) => {
          return <Word key={`word-${i}-${word}`}>{word}</Word>
        })}
      </pre>

      <style jsx>{`
        main {
          height: 100vh;
        }

        textarea {
          border: none;
          background: transparent;
          resize: none;
          outline: none;
          color: inherit;
          -webkit-text-fill-color: transparent;
        }

        pre {
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          color: var(--fg);
          margin: 0;
          display: inline-block;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          text-align: start;
          user-select: none;
          word-spacing: normal;
          text-rendering: auto;
        }

        pre,
        textarea {
          line-height: 1.7;
          font-size: 1rem;
          font-family: var(--font-sans);

          word-wrap: break-word;

          height: 100vh;
          width: 100vw;
          padding: 2rem;
        }
      `}</style>
    </main>
  )
}

export default App
