import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";

class CreateUserPresenter {

    onCreate() {
        let newUser = userSelectors.getNewUser();
        store.dispatch(userActions.addUser(newUser.username, newUser.password, newUser.email));
        store.dispatch(userActions.changeNewUserProperty("username", ""));
        store.dispatch(userActions.changeNewUserProperty("password", ""));
        store.dispatch(userActions.changeNewUserProperty("email", ""));
        window.location.assign("#/users-list");
    }

    onChange(property, value) {
        store.dispatch(userActions.changeNewUserProperty(property, value));
    }

}

const createUserPresenter = new CreateUserPresenter();
export default createUserPresenter;