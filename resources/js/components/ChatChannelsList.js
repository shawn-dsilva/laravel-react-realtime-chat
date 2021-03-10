import React, {useState} from "react";
import {Collapse , Button, CardBody, Card, Col, UncontrolledTooltip } from "reactstrap";
import CreateChannelModal from "./CreateChannelModal";
import AllChannelsList from "./AllChannelsList";

export const ChatChannelsList = props => {
    const channels = props.channels;

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // console.log(typeof(channels));
    const { channelSelect } = props;
    console.log("in channels list");
    console.log(channels);
    const channelList = channels.map((value, index) => {
        return (
            <div className="channelElement" key={index}>
                <Button
                    color="link"
                    onClick={() =>
                        channelSelect(
                            value.id,
                            value.name,
                            value.desc,
                            value.owner_id,
                            value.owner
                        )
                    }
                    id={value.id}
                >
                    <b>{value.name}</b>
                </Button>
                <br></br>
            </div>
        );
    });

    return (
        <div className="sidepaneParentChannel">
                <UncontrolledTooltip placement="bottom" target="allChannels">
                    Discover Channels
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="createChannel">
                   Create A Channel
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="right" target="ChannelArrow">
                   Open / Close Channel Section
                </UncontrolledTooltip>

            <div color="white" className="sidepaneParentButton" onClick={toggle} >                
                <h3>Channels          
                <AllChannelsList
                            channels={props.allChannels}
                            currUser={props.currUser}
                            joinChannelRequest={props.joinChannelRequest}
                        />        
                    <CreateChannelModal buttonLabel={"+ Create New Channel"} />

                    { !isOpen ? <i id="ChannelArrow" class=" arrow fas fa-chevron-down"></i> : <i id="ChannelArrow" class=" arrow fas fa-chevron-up"></i>}</h3>
            </div>
    <Collapse  isOpen={isOpen}>
    <div className="sidepaneChannel">
                <div>
                <br></br>
                    {" "}
                    <Button
                        color="link"
                        onClick={() =>
                            channelSelect(
                                1,
                                "General",
                                "A public channel where all users can chat"
                            )
                        }
                        id="1"
                        key="1"
                    >
                        <b> General</b>
                    </Button>
                    {channelList}
                </div>
            </div>
    </Collapse >
            
        </div>
    );
};

export default ChatChannelsList;
