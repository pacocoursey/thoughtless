'use client'

import * as React from 'react'
import { flushSync } from 'react-dom'

export default function Page() {
  // Generate a unique storage key for each day
  const storageKey = React.useMemo(() => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }, [])

  const [text, setText] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const savingTimeout = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    // Always set selection state to the end of the textarea
    function handleSelectionChange() {
      textareaRef.current?.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length)
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  React.useEffect(() => {
    try {
      const savedText = localStorage.getItem(storageKey)

      if (savedText) {
        setText(savedText)
        forceFocus()
      }
    } catch (e) {}
  }, [])

  React.useEffect(() => {
    forceFocus()
  }, [text])

  React.useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      // Focus
      if (e.key === 'Tab') {
        e.preventDefault()
        forceFocus()
        return
      }

      // Blur
      if (e.key === 'Escape') {
        e.preventDefault()
        textareaRef.current?.blur()
        return
      }

      // Save
      if (e.key === 's' && e.metaKey) {
        e.preventDefault()
        save()
        return
      }

      if (document.activeElement === textareaRef.current) {
        return
      }

      // Clear document content
      if (e.key === 'Backspace' && e.metaKey) {
        const confirmed = confirm("Are you sure you want to delete today's note?")

        if (confirmed) {
          flushSync(() => {
            setText('')
          })

          forceFocus()

          try {
            localStorage.removeItem(storageKey)
          } catch (e) {}
        }

        return
      }

      // Go into fullscreen
      if (e.key === 'f') {
        e.preventDefault()
        document.documentElement.requestFullscreen()
        forceFocus()
        return
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  function forceFocus(e?: React.SyntheticEvent<HTMLTextAreaElement>) {
    if (e) {
      e.preventDefault()
    }

    const el = textareaRef.current
    el.focus()
    el.setSelectionRange(el.value.length, el.value.length)
    el.scrollTop = el.scrollHeight
  }

  function save() {
    try {
      localStorage.setItem(storageKey, textareaRef.current.value)
    } catch (e) {}
  }

  return (
    <main>
      <header>
        {new Date().toLocaleString(undefined, {
          month: 'long',
          day: 'numeric',
        })}
      </header>
      <section>
        <textarea
          ref={textareaRef}
          value={'\n\n\n\n' + text}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          dir="auto"
          onPointerDown={forceFocus}
          onPointerUp={forceFocus}
          onClick={forceFocus}
          onKeyDown={(e) => {
            if (['Backspace', 'ArrowUp', 'ArrowLeft', 'Arrowright', 'ArrowDown'].includes(e.key)) {
              e.preventDefault()
            }
          }}
          onChange={(e) => {
            setText(e.currentTarget.value.slice(4))

            // Debounce saving to localStorage
            clearTimeout(savingTimeout.current)
            savingTimeout.current = setTimeout(save, 500)
          }}
        />

        <div className="overlay">
          <div />
          <div />
          <div />
          <div />
        </div>
      </section>
    </main>
  )
}
