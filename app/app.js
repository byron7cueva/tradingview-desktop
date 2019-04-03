const {app} = require('electron');
const Window = require('./window');

//Private properties
const _window = Symbol('window');

//Private mehthods
const _onActivate = Symbol('onActivate');
const _onReady = Symbol('onReady');
const _onWindowAllClosed = Symbol('onWindowAllClosed');

/**
 * Class that represent app insytance
 * @author byron7cueva
 */
class App {

    /**
     * Constructor of class
     */
    constructor() {
        this[_window] = new Window();
        app.on('activate', this[_onActivate].bind(this));
        app.on('ready',this[_onReady].bind(this));
        app.on('window-all-closed', this[_onWindowAllClosed]);
    }

    /**
     * Tigger when event activate is produced
     * @private
     * @author byron7cueva
     */
    [_onActivate]() {
        this[_window].init();
    }

    /**
     * Tigger when event ready is produced
     * @private
     * @author byron7cueva
     */
    [_onReady]() {
        if(app.isReady()) {
            this[_window].init();
        }
    }

    /**
     * Tigger when event window-all-closed is produced
     * @private
     * @author byron7cueva
     */
    [_onWindowAllClosed]() {
        if(process.platform !== 'darwin') {
            app.quit();
        }
    }
}

module.exports = App;