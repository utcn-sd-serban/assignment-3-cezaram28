import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import RestClient from "../rest/RestClient";

class RegisterPresenter {

    onLogin() {
        window.location.assign("#/login");
    }

    onRegister() {
        let newUser = userSelectors.getNewUser();
        const client = new RestClient("", "");

        client.register(newUser.username, newUser.password, newUser.email).then(status => {
            if (status >= 300) {
                alert("User exists!");
            } else {
                store.dispatch(userActions.addUser(newUser.username, newUser.password, newUser.email));
                window.location.assign("#/login");
                store.dispatch(userActions.changeNewUserProperty("username", ""));
                store.dispatch(userActions.changeNewUserProperty("password", ""));
                store.dispatch(userActions.changeNewUserProperty("email", ""));
            }
        });
    }

    onChange(property, value) {
        store.dispatch(userActions.changeNewUserProperty(property, value));
    }

}

const registerPresenter = new RegisterPresenter();
export default registerPresenter;