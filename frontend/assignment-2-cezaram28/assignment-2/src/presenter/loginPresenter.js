import store from "../model/store/store";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";

class LoginPresenter {

    onLogin() {
        let newUser = userSelectors.getNewUser();
        let currentUser = userSelectors.findByUsername(newUser.username);
        if (currentUser !== undefined && currentUser.password === newUser.password) {
            if (currentUser.isBanned) {
                alert("User banned!");
            } else {
                store.dispatch(userActions.updateCurrentUserIndex(currentUser.id));
                window.location.assign("#/questions-list");
                store.dispatch(userActions.changeNewUserProperty("username", ""));
                store.dispatch(userActions.changeNewUserProperty("password", ""));
            }
        } else {
            alert("Bad credentials!");
        }
    }

    onRegister() {
        window.location.assign("#/register");
    }

    onChange(property, value) {
        store.dispatch(userActions.changeNewUserProperty(property, value));
    }
}

const loginPresenter = new LoginPresenter();
export default loginPresenter;