'use strict'
const {BrowserWindow} = require('electron');
const fs = require('fs');
const path = require('path');

//Private properties
const _window = Symbol('window');

//Private methods
const _onClose = Symbol('onClose');
const _onClosed = Symbol('onClosed');
const _onDidFinishLoad = Symbol('onDidFinishLoad');

/**
 * Class represent window instance
 * @author byron7cueva
 */
class Window {

    /**
     * Constructor de la aplicacion
     */
    constructor() {
        this[_window] = null;
    }

    /**
     * Inicializa la ventana de la aplicacion
     * @public
     * @author byron7cueva
     */
    init() {
        //Validando si la ventana no exite para inicializarla
        if(this[_window] == null) {
            this[_window] = new BrowserWindow({
                width: 1024,
                height: 768,
                minWidth: 800,
                minHeight: 600,
                autoHideMenuBar: true,
                defaultFontSize: 10,
                icon: path.join(__dirname, '../assets/img/icon.png'),
                title: 'TradingView'
            });
            this[_window].on('close', this[_onClose].bind(this));
            this[_window].on('closed', this[_onClosed].bind(this));
            this[_window].loadURL('https://es.tradingview.com/chart');
            this[_window].webContents.on('did-finish-load', this[_onDidFinishLoad].bind(this));
            //this[_window].maximize();
            //this[_window].webContents.openDevTools();
        }
    }

    /**
     * Trigger when close event produce
     * @private
     * @author byron7cueva
     */
    [_onClose]() {
        this[_window].destroy();
    }

    /**
     * Trigger when produce closed event
     * @private
     * @author byron7cueva
     */
    [_onClosed]() {
        this[_window] = null;
    }

    /**
     * Trigger when did-finish-load event is produced
     * @private
     * @author byron7cueva
     */
    [_onDidFinishLoad]() {
        fs.readFile(path.join(__dirname, '../assets/css/app.css'), 'utf-8',
            (error, data) => {
                if(!error) {
                    let formatedData = data.replace(/\s{2,10}/g, ' ').trim();
                    this[_window].webContents.insertCSS(formatedData);
                }
            });
    }
}

module.exports = Window;