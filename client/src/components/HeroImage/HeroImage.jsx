import React from 'react'
import Lottie from 'react-lottie';
import Pencil from '../../data/images/7879-pencil-writing.json'
import './HeroImage.scss'

function HeroImage() {

    const Pencilfile = {
        loop: true,
        autoplay: true,
        animationData: Pencil,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    }
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <div className="hero">
            <h1 className="hero__h1">Hello, {user.result.name}</h1>
            <div className="hero__img">
                <Lottie options={Pencilfile} height={150} width={200} />
            </div>
            <h1 className="hero__h1">Let's start your day off with a plan.</h1>
        </div>
    )
}

export default HeroImage
