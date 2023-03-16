import { useKeyPress } from '@/hooks/useKeyPress'
import { useOnClickOutside } from '@/hooks/useOnclickOutside'
import clsx from 'clsx'
import { HTMLInputTypeAttribute, useCallback, useEffect, useRef, useState } from 'react'

// https://joelmturner.com/blog/inline-text-edit-react-hooks
export default function InlineEdit({
  value,
  onChange,
  placeholder = 'click to change',
  type,
}: {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  type: HTMLInputTypeAttribute
}) {
  const [isInputActive, setIsInputActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const enter = useKeyPress('Enter')
  const esc = useKeyPress('Escape')

  // this hook takes a ref to watch and a function to run
  // if the click happened outside
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      // save the value and close the editor
      onChange(inputValue)
      setIsInputActive(false)
    }
  })

  const handleSpanClick = useCallback(() => setIsInputActive(true), [setIsInputActive])

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current?.focus()
    }
  }, [isInputActive])

  const onEnter = useCallback(() => {
    if (enter) {
      onChange(inputValue)
      setIsInputActive(false)
    }
  }, [enter, inputValue, onChange])

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(value)
      setIsInputActive(false)
    }
  }, [esc, value])

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter()
      // if Escape is pressed, revert the text and close the editor
      onEsc()
    }
  }, [onEnter, onEsc, isInputActive]) // watch the Enter and Escape key presses

  const getValue = () => {
    if (!value) return placeholder
    if (type === 'password') {
      return '&#x2022;'.repeat(value.length)
    }
    return value
  }

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        onClick={handleSpanClick}
        className={clsx(
          'border-b-2 border-dashed border-sky-400',
          !isInputActive ? 'active' : 'hidden'
        )}
        dangerouslySetInnerHTML={{ __html: getValue() }}
      >
        {/* <Value type={type} value={value} placeholder={placeholder} /> */}
      </span>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={type}
        className={clsx(
          'border-b-2 border-sky-400 bg-transparent outline-none',
          isInputActive ? 'active' : 'hidden'
        )}
      />
    </span>
  )
}
