/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const ChannelDescDropdown = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div style={{marginLeft:"auto"}}>
      <Button id="Popover1" type="button">
      <i class="fa fa-info-circle" aria-hidden="true"></i>
      
About Channel
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverHeader>Channel Description</PopoverHeader>
        <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
      </Popover>
    </div>
  );
}

export default ChannelDescDropdown;