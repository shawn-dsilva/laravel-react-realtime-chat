# React Laravel Real-Time Chat

## TODO

### Immediate

- Fix/Refactor notifChannel and eventChannel as Redux actions
- Fix Logout functionality
- Invite to channel by URL system

### Later

- Add search all users functionality.
- Add search all channels functionality.
- User Avatar uploading features
- Add User profiles which are hyper linked.
- Unread messages notification.
- UI Design using SASS
- Responsiveness using SASS

### Maybe 

- Add Online/Offline status and Typing events support.


### Done

- Fix Laravel WebSocket auth issues on first time login
- Accept invitation to channel from channel owner functionality
- Invite users to channel if you're channel owner functionality
- Channel Details table UI for Channels table
- Fix channel joining.
- Misc fixes of Notifications, Invite Object and Friend/Join request.
- Cleanup of join channel request and accept request functionality with better solution
- List of Pubilc Channels
- Add Friends list for DM.
- Add support for user made channels, public and private/invite-only.
- Miscellaneous Chat.js refactoring and cleanup
- Channel join/invite requests and notifications.
- Refactor NotificationDropdown and Navbar logic,actions,state into NavBarMain; make NavbarMain redux connect component
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
