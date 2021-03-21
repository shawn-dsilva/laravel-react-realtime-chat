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
                    <p>Laravel React Chat is Single Page Web App that provides full fat Realtime Chat functionality.
                    Like User-to-User Direct Messaging, Group Channels, Offline/Online status events and other SM features like Avatar uploading and Realtime Notifications
                    </p>                    
                    <br></br>
                    <p>Utilizing ReactJS and Redux for the SPA, PHP on Laravel for the WebSocket server and Backend API, backed by a PostgresSQL Database.</p>
                    <div class="tech-stack">
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/react-original-wordmark.svg"></img>
                    <img class="svg-std"  style={{width:"auto"}}src="https://www.shawndsilva.com/public/assets/icons/Redux.png"></img>
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/bootstrap-plain-wordmark.svg"></img>
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/php-plain.svg"></img>
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/laravel-plain-wordmark.svg"></img>
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/postgresql-original-wordmark.svg"></img>
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/nginx-logo.svg"></img>
                    <img class="svg-std" src="https://www.shawndsilva.com/public/assets/icons/docker.svg"></img>
                    </div>
                    <br></br>
                    <p>For the Motivations behind this project, Challenges Faced and Lessons Learned, 
                        Check the <a href="https://wwww.shawndsilva.com/projects/realtime-chat-app">Project Details page</a>.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
