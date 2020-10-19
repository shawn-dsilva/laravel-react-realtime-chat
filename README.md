# React Laravel Real-Time Chat

## TODO

### Immediate

- Refactor NotificationDropdown and Navbar logic,actions,state into NavBarMain; make NavbarMain redux connect component

- Channel join/invite requests and notifications.
- Channel Details table UI for Channels table
- Add support for user made channels, public and private/invite-only.
- List of Pubilc Channels
- Invite to channel by URL system

### Later

- Add search all users functionality.
- Add search all channels functionality.
- Add Friends list for DM.
- User Avatar uploading features
- Add User profiles which are hyper linked.
- Unread messages notification.
- UI Design using SASS
- Responsiveness using SASS

### Maybe 

- Add Online/Offline status and Typing events support.


### Done

- Fix dmSelectAction to work with friends list
- Complete Notifications React/Redux front end 
- Notification system to accept/reject invites and request
- Add Read/Unread logic and UI functionality to notifications
- Notification on click only opens an AcceptModal with that particular Notification's data
- AcceptRequest event fired to sender when receiver accepts friend request, AcceptRequest adds receiver to sender's DM list
- Add Create Channel modal and functionality.
- Basic Chat UI refactor with custom css on Bootstrap components
- Finish AuthGuard/ProtectedRoutes functionality in React
- Chat component loads successfully upon Login
- Input box clears on submit
- Chat component functionality refactored into using Redux
- Add Laravel-Echo and Laravel-Websockets side auth logic for DMs
- Add token in constructor to prevent repetition.
- Rework message model to include channel ID

### CANCELLED

<del>Refactor direct message feature to it's own table rather than channels table</del>
