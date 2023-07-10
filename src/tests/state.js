const state = {
    state: {}
};

const getTestState = () => state.state;

const setTestState = new_state => {
    state.state = new_state;
};

module.exports = {
    getTestState,
    setTestState,
}