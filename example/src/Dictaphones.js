import React, { useState } from 'react'
import SpeechRecognition from './SpeechRecognition'
import SpeechRecognitionPanel from './SpeechRecognitionPanel'

export default () => {
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const [text, setText] = useState('');

  return (
    <div>
      <span>{text}</span>
      <SpeechRecognitionPanel 
        handleTranscript={(t) => setText(t)}
	  />
    </div>
  )
}
