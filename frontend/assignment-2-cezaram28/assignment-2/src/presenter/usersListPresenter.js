import * as userActions from "../model/user/userActions";
import store from "../model/store/store";

class UsersListPresenter {

    onLogout() {
        window.location.assign("#");
        store.dispatch(userActions.logout());
    }

    onBan(id) {
        store.dispatch(userActions.banUser(id));
    }
}

const usersListPresenter = new UsersListPresenter();
export default usersListPresenter;