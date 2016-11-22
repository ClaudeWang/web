import React, {Component} from 'react'
import LoginPage from './login/login'
import MainPage from './main/Main'
import ProfilePage from './profile/profile'
import {connect} from 'react-redux'


const LOGINTAG = 0;
const MAINTAG = 1;
const PROFILETAG = 2;

const ControlView = ({location}) => {
    switch (location) {

        case LOGINTAG:
                return (
                    <div>
                        <LoginPage/>
                    </div>
                )
        case MAINTAG:
                return  (
                    <div>
                        <MainPage/>
                    </div>
                )
        case PROFILETAG:
                return (
                    <div>
                        <ProfilePage/>
                    </div>
                    )
    }
}

export default connect((state) => {
    return {
        location: state.route.location
    }
})(ControlView)

