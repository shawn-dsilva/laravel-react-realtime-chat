import React, { Component } from 'react'
import HomeNav from './HomeNav'

export class Home extends Component {
    render() {
        return (
            <div className="fullDiv">
                <HomeNav/>
                <div className="intro">
                    <div className="hero-centre">
                    <h1>Realtime Chat powered by WebSockets</h1>
                    <p>Laravel React Chat( very creative name, I know ) is Single Page Web App that provides full fat Realtime Chat functionality.
                    Like User-to-User Direct Messaging, Group Channels, Offline/Online status events and other SM features like Avatar uploading and Realtime Notifications
                    </p>
                    <br></br>
                    <p>Utilizing ReactJS and Redux for the SPA, PHP on Laravel for the WebSocket server and Backend API, backed by a PostgresSQL Database.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
