import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";

class RegisterPresenter {

    onLogin() {
        window.location.assign("#/login");
    }

    onRegister() {
        let newUser = userSelectors.getNewUser();
        let userByName = userSelectors.findByUsername(newUser.username);
        if (userByName === undefined) {
            let userByMail = userSelectors.findByEmail(newUser.email);
            if (userByMail === undefined) {
                store.dispatch(userActions.addUser(newUser.username, newUser.password, newUser.email));
                store.dispatch(userActions.updateCurrentUserIndex(userSelectors.getIndex()));
                window.location.assign("#/questions-list");
                store.dispatch(userActions.changeNewUserProperty("username", ""));
                store.dispatch(userActions.changeNewUserProperty("password", ""));
                store.dispatch(userActions.changeNewUserProperty("email", ""));
            } else {
                alert("User exists!");
            }
        } else {
            alert("Username already exists!");
        }
    }

    onChange(property, value) {
        store.dispatch(userActions.changeNewUserProperty(property, value));
    }

}

const registerPresenter = new RegisterPresenter();
export default registerPresenter;