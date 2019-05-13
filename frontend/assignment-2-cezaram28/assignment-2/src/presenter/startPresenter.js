
class StartPresenter {

    onLogin() {
        window.location.assign("#/login");
    }

    onRegister() {
        window.location.assign("#/register");
    }
}

const startPresenter = new StartPresenter();
export default startPresenter;