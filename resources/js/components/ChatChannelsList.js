import React from "react";
import { Col, Button } from "reactstrap";
import CreateChannelModal from "./CreateChannelModal";

export const ChatChannelsList = props => {
    const channels = props.channels;
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
        <div className="sidepaneParent">
            <h3>Channels</h3>

            <div className="sidepaneChannel">
                <div>
                <CreateChannelModal buttonLabel={"+ Create New Channel"} />
                <br></br>
                    {" "}
                    <Button
                        color="link"
                        onClick={() =>
                            channelSelect(
                                5,
                                "General",
                                "A public channel where all users can chat"
                            )
                        }
                        id="5"
                        key="5"
                    >
                        <b> General</b>
                    </Button>
                    {channelList}
                </div>
            </div>
        </div>
    );
};

export default ChatChannelsList;
