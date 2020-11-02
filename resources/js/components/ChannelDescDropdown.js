/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const ChannelDescDropdown = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div style={{marginLeft:"auto"}}>
      <Button className="channelDescButton" id="Popover1" type="button">
      <i class="fa fa-info-circle" aria-hidden="true"></i>
        &nbsp;
        About Channel
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader style={{fontSize:"1.5rem"}}>Channel Description</PopoverHeader>
        <PopoverBody style={{fontSize:"1rem"}}>{props.desc}</PopoverBody>
      </Popover>
    </div>
  );
}

export default ChannelDescDropdown;