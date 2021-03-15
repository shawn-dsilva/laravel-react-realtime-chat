import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const UserProfileModal = (props) => {
  const {
    className,
    user,
    currUser,
    editDesc,
    userDetailsClass,
  } = props;

  const [modal, setModal] = useState(false);
  const [isEditOpen, setEdit] = useState(false);
  const [userDesc, setUserDesc] = useState(null);

  const toggle = () => setModal(!modal);
  const toggleEdit = () => {
      setEdit(!isEditOpen);
      if(isEditOpen) {
        editDesc(userDesc);
        setEdit(false);
      }
    };

  const onChange = (e) => {
    setUserDesc(e.target.value);
  };

  return (
    <div>
      <div onClick={toggle} id="userProfile" className={userDetailsClass} > {
                  user.avatar ? 
                  <img src={"storage/"+user.avatar} className="dmAvatar"></img> : 
                  <img src="/assets/images/defaultuser.png" className="dmAvatar"></img>
                }
                <span>{user.name}</span>
                {console.log(user)}
        </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>User Profile</ModalHeader>
        <ModalBody className="profileModal" >
        <img src={"storage/"+user.avatar} ></img>
        <span>{user.name}</span>
        {user.id !== currUser.id && <Button onClick={addFriend} color="success"> <i class="fas fa-user-plus"></i> Add Friend</Button>}
        <div>
        <h2>About</h2>
        { user.id === currUser.id && <Button onClick={toggleEdit} color="success"><i class="fas fa-edit"></i> { isEditOpen ? "Save Edit" : "Edit This" }</Button> }
        </div>
        <p>
        { isEditOpen === true ? <Input type="textarea" onChange={onChange} name="text" defaultValue={user.desc ? user.desc : "Write something...."} /> :
            (user.desc ? user.desc : "This user prefers to keep an air of mystery about themselves...") }
        </p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserProfileModal;