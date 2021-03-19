# React Laravel Real-Time Chat

## Notes

- DB_HOST in .env should be the same as the service name in `docker-compose.yml`, by default it is mysql.
- Ports for both main server and websockets server must be exposed in `docker-compose.yml` else laravel echo client will not connect to the server
- PHP-FPM Docker container has no `php.ini` by default, rename or copy php.ini-production in `/usr/local/etc/php/`
- Set authEndpoint to subdirectory+/broadcasting/auth if serving this app through a subfolder.
- Set BROADCAST_DRIVER in .env to pusher, anything else and realtime chat functionality will not work at all.
- While serving from subdirectory, `wsHost` must be the same in `config/broadcast.php` and `Echo` object in Javascript
- overflow-y must be set to hidden in collapse container in ChatDmUserList, else the elements overflow into the divs below
- Run `php artisan storage:link` after cloning repo
- Run `php artisan vendor:publish --provider="Laravolt\Avatar\ServiceProvider"`, change driver to gd if imagemagick doesn't work.
- Run `sudo apt-get update && sudo apt-get install -y imagemagick php-imagick` to install imagemagick.


## Log of Fixed Errors 

- Ref Error #1 : The error was occuring due to object `$channelWithDataNew` being returned in response of `acceptInviteRequest()`, with `id` being the channel detail entry's ID and not the ID of the Channel, which was causing 403 Permission denied errors when Laravel Echo tried to authorize at the `/broadcast/auth` route with incorrect channel ID.
Error solved when correct `$channel` object being returned in response.
- Ref Error #2 : Same reason as Error #1, id of the details entry being returned instead of the channel's id.
- Ref Error #3 : Multiple copies of the same message appearing because of not leaving previous channels properly.

## TODO

### Immediate

- Leave selectedChannel on Logout
-Refactor About Channel with more details into a modal.
- Refactor about channel and users in room into smaller buttons without text
- Microsite with a list of features on index.
- Responsive Design for side-by-side browser windows and Tablets.
- Add User Profile component in Direct Message "channel name" section.

### Luxury

- Fix Typing bubble REMOVE_TYPING_EVENT reducer 
- Fully disconnect user from chat server upon logout
- Invite to channel by URL system.
- Add search all users functionality.
- Add search all channels functionality.
- Unread messages notification.
- UI Design using SASS
- Responsiveness using SASS


### Done

- Typing events for DM Users
- Fix DP sizing issues during Is Typing bubble events
- Double or Triple messages appearing in Message List after switching channels error fixed Error #3
- User Avatar in Direct Message users pane change `/storage` to `storage`
- Deployment Preperation once again.
- Turn Docker Compose commands into bash scripts file instead of a long string.
- Typing events support.
- Fix any Errors/Issues in Join Private/Public Channel functionality.
- Add User Profile component in names of Users in group Channel message lists
- User Profiles with editable about section.
- Styling for Notifications.
- Return proper error message on Register screen for user that already exists.
- Redirect user from Registration page to Login after successful register.
- Notifications should appear in Latest Notifications first order.
- All Users & All Channels list must fetch list from API server on click of button and not depend on props
- Fixed addition of channel to requester's channel list when join request accepted by channel owner. | Error #2
- Fixed Error where user couldn't join a private channel even after accepting invite request from Owner | Error #1
- Fixed "Invite Users" button not appearing in owned channel because owner_id wasn't send over in response.
- BUG : Fix User addition to friends list upon accepting friend request
- UserSeeder and GeneralSeederChannel completed.
- Migrate to PostgreSQL and create new SQL dump file.
- Fix default avatar image size and font sizing
- Upon user creation, dynamically fill up avatar field with default image or create dynamic default avatar and save.
- Beautify and improve UI of All Channels List and All Users List modals.
- Beautify and improve UI of Options and Notifications dropdown menus.
- Add Tool Tip support for all buttons in DM and Channels sections.
- Add buttons for "Join Channel" and "Add Friend" to Channel and Direct Message sections respectively
- Make Direct Message and Channels collapsable.
- Scroll to bottom when joining new chat room or sending message
- User Avatar uploading features
- Display avatars of users and groups in chat sidebar
- Create User Details table for User profile data, most importantly the name of user's avatar image completed
- Fixes to Image upload/cropping UI on the React side
- Cropping functionality and sending of cropped image to server code completed
- Functionality for Profile Image upload by the user
- Login/Registration error display
- ChatMainContainer CSS margin and padding fixes
- Styled scrollbars
- WebSocket server paths routing in nginx-laravel container instead of external nginx reverse proxy
- Make WebSocket Server work in Production 
- Preparation for Production deployment
- Front End and API working in Production
- Dockerization to work in Production environment.
- Dockerization.
- SQL dump of current DB to be used to initiate MySQL Docker container.
- Style Register and Login pages.
- Changes to auth container with flex div for login and register forms and name of webapp at top, and name of author at bottom
- Users currently online in chatroom only for chatrooms, UI element can be hidden
- Add scrollbars for channels and dm user lists 
- Add Online Offline user status support
- Add table to store online status of users upon user going online to check online status.
- Fix Logout functionality
- Add initNotificationAndEventChannels() functionality to getUser() in authActions
- Cleanup initNotificationAndEventChannel from chatActions and NavbarMain
- Fix/Refactor notifChannel and eventChannel as Redux actions
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
