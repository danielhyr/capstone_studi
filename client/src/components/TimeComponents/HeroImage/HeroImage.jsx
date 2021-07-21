import React from 'react'
import Lottie from 'react-lottie';
import timer from '../../../data/images/timer-clock.json'


function HeroImage() {
    const timerFile = {
        loop: false,
        autoplay: true,
        animationData: timer,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    }

    return (
        <div className="timerhero__img">
            <Lottie options={timerFile} height={200} width={200} />
        </div>
    )
}

export default HeroImage
