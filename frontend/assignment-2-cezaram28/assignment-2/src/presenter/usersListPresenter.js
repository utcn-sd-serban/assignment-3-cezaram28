import * as userActions from "../model/user/userActions";
import * as userSelectors from "../model/user/userSelectors";
import store from "../model/store/store";
import RestClient from "../rest/RestClient";

class UsersListPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onBan(id) {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        let user = userSelectors.getCurrentUser();
        client.banUser(id, user);
    }

    onInit() {
        const client = new RestClient(userSelectors.getCurrentUser().username, userSelectors.getCurrentUser().password);
        client.loadUsers().then(users => {
            store.dispatch(userActions.loadUsers(users));
        });
    }
}

const usersListPresenter = new UsersListPresenter();
export default usersListPresenter;