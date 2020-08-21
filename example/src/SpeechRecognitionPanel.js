import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from './SpeechRecognition'

const SpeechRecognitionPanel = (props) => {
    const transcribing = true;
    const clearTranscriptOnListen = true;
    const { handleInterimTranscript = null, handleFinalTranscript = null,
            handleTranscript = null} = props;
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition({ transcribing, clearTranscriptOnListen })

    useEffect(() => {
        if (interimTranscript !== '') {
            if (handleInterimTranscript != null) {
                handleInterimTranscript(interimTranscript, listening);
            }
        }
        if (finalTranscript !== '') {
            if (handleFinalTranscript != null) {
                handleFinalTranscript(finalTranscript, listening);
            }
            if (!listening) {
                resetTranscript();
            }
        }
        if (transcript !== '') {
            if (handleTranscript != null && listening) {
                handleTranscript(transcript, listening);
            }
        }
    }, [transcript, interimTranscript, finalTranscript, listening]);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
       return null
    }

    return (
        <div>
          <button onClick={
                            listening ?
                                () => SpeechRecognition.stopListening() :
                                () => SpeechRecognition.startListening({ language: 'pt-BR', continuous: true })
                        }>{listening ? "Stop" : "Start"} </button>
        </div>
    )
}
export default SpeechRecognitionPanel
