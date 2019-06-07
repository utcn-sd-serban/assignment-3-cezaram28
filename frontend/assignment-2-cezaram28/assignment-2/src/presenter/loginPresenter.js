import store from "../model/store/store";
import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import RestClient from "../rest/RestClient";

class LoginPresenter {

    onLogin() {
        let newUser = userSelectors.getNewUser();

        const client = new RestClient("", "");
        client.login(newUser.username, newUser.password).then(response => {

            if (response.type !== undefined) {
                alert(response.type);
            } else {
                if (response.isBanned === true) {
                    alert("User is banned!");
                } else {

                    let user = {
                        id: response.id,
                        username: newUser.username,
                        password: newUser.password,
                        email: response.email,
                        score: response.score,
                        isAdmin: response.isAdmin,
                        isBanned: response.isBanned
                    }
                    
                    store.dispatch(userActions.addUser(user));
                    store.dispatch(userActions.updateCurrentUserIndex(user.id));
                    window.location.assign("#/questions-list");
                    store.dispatch(userActions.changeNewUserProperty("username", ""));
                    store.dispatch(userActions.changeNewUserProperty("password", ""));
                }
            }
        }).catch(status => alert("Bad credentials!"));
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