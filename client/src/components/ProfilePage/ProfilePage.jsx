import React from 'react'
import './ProfilePage.scss'
import HeroFooter from '../HeroFooter/HeroFooter';
import HeroHeader from '../HeroHeader/HeroHeader';

function ProfilePage() {

    const user = JSON.parse(localStorage.getItem('profile'))

    console.log(user)

    return (
        <>
        <HeroHeader/>
        <section className="profile">
        <div className="profile-desc">
                Profile section
        </div>
        <div></div>
        // Map these out
   
            <div className="post">
            {user ? (
            <div>{user.result.name}</div>
            ): (
                <div>profile</div>
            ) }
                <div>Hello
                    <img></img>
                </div>
                <div>
                    Content
                </div>
                <div>
                    Mini Schedule
                </div>
            </div>

            <div className="post">
                <div>PRofile image
                    <img></img>
                </div>
                <div>
                    Content
                </div>
                <div>
                    Mini Schedule
                </div>
            </div>
        </section>
<HeroFooter/>
        </>
    )
}

export default ProfilePage
