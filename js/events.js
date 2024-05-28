import * as actions from './actions.js'
import * as elements from './elements.js'
import { updateDisplay } from './timer.js'
import state from './state.js'

export function registerControls(){
    elements.controls.addEventListener('click', function(event){
        const action = event.target.dataset.action
        if(typeof actions[action]() != 'function') {
            return
        }

        actions[action]()
    })
}

export function setMinutes() {
    elements.minutes.addEventListener('focus', function(){
        elements.minutes.textContent=''
    })

    elements.minutes.addEventListener('keydown', function(event){
        if (event.key != 'Backspace' && isNaN(event.key)) {
            event.preventDefault()
        }
    })

    elements.minutes.addEventListener('blur', function(event){
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time
        state.minutes = time
        state.seconds = 0
        updateDisplay()
        elements.minutes.removeAttribute('contenteditable')
    })

    elements.minutes.addEventListener('keydown', function(event){
        if(event.key === 'Enter') {
            if (event.currentTarget.textContent === '') {
                event.preventDefault()
            } else {
                elements.minutes.blur()
            }
        }
    })
    
}
