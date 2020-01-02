import React, { useEffect, useState, useCallback } from 'react'
import App from '../components/app'

const logo = (
  <svg width="84" height="102" viewBox="0 0 84 102" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M42 5.5C21.8483 5.5 5.5 21.8846 5.5 42.1111V65.3854C10.6688 64.9833 14.4126 63.3208 17.3435 60.9293C20.7971 58.1113 23.3146 54.1267 25.6024 49.3925C26.7426 47.033 27.7989 44.5469 28.8901 41.9697L28.9705 41.7799C30.0285 39.2809 31.1209 36.7007 32.3218 34.1776C34.7822 29.0079 37.7828 23.8869 42.1883 19.783C46.9588 15.339 53.2008 12.247 61.7638 11.3258C56.0673 7.63822 49.2839 5.5 42 5.5ZM67.6264 16.0408C57.0319 15.9779 50.3375 19.025 45.5964 23.4415C41.8659 26.9166 39.1901 31.3811 36.8365 36.3263C35.6833 38.7493 34.628 41.2419 33.5573 43.7706L33.4944 43.9192C32.4102 46.4796 31.3071 49.0789 30.1043 51.568C27.706 56.5308 24.803 61.2959 20.5045 64.8033C16.6344 67.9611 11.7848 69.9789 5.5 70.3981V96.5H27.375C36.156 96.5 41.2261 93.9234 44.6372 90.338C48.1943 86.5993 50.1941 81.5415 52.3385 75.9067C52.3993 75.7469 52.4602 75.5866 52.5214 75.4258C54.5399 70.1159 56.7536 64.2927 60.811 59.8456C64.7637 55.5133 70.2871 52.642 78.5 52.1629V42.1111C78.5 31.907 74.3412 22.682 67.6264 16.0408ZM78.5 57.1721C71.5958 57.6311 67.4238 60.0161 64.5046 63.2156C61.0964 66.9512 59.1769 71.9951 57.0274 77.6434L57.0115 77.6851C54.9309 83.1523 52.6245 89.1967 48.2597 93.7844C47.3225 94.7695 46.3008 95.6783 45.1814 96.5H78.5V57.1721ZM83.5 101.5V42.1111C83.5 30.128 78.4449 19.3235 70.3613 11.7332C62.9443 4.76876 52.9671 0.5 42 0.5C19.0735 0.5 0.5 19.1366 0.5 42.1111V101.5H83.5Z"
      fill="var(--fg)"
    />
  </svg>
)

const Index = () => {
  const [showApp, setShowApp] = useState(false)

  const onKeydown = useCallback(e => {
    if (e.key === 't' && e.ctrlKey) {
      e.preventDefault()
      document.querySelector('html').classList.toggle('light')
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowApp(true)
    }, 5000)

    window.addEventListener('keydown', onKeydown)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('keydown', onKeydown)
    }
  }, [])

  if (showApp) {
    return <App />
  }

  return (
    <main onClick={() => setShowApp(true)}>
      <div className="content">
        <div className="left">
          {logo}
          <h1>Think less, sleep more.</h1>
        </div>
      </div>

      <style jsx>{`
        main {
          cursor: pointer;
          height: 100vh;
          animation: fadeOut 5s ease-in-out forwards;
        }

        h1 {
          font-size: 1.5rem;
          margin-bottom: 0;
        }

        .content {
          position: absolute;
          bottom: 20vh;
          left: 20vw;
          display: flex;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}

export default Index
