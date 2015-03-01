'use strict';

var BaseComponent   = require('../../component/base')
,   Store           = require('./store')
,   Namespace       = require('./namespace')
,   AppComponents   = require('./components');

/**
 * @class AppInstance
 * @memberof API
 *
 * @description The main point for generating the application class.
 * Is generated from {@link API.App App}.
 */
var AppInstance = module.exports = function(namespace){

    if(!Namespace.checker(namespace)) throw new Error(
        "Specified namespace is invalid"
    );

    var components = AppComponents();
    injector(this, components);

    var stores = {
        configuration: new Store(),
        utilities: new Store(true)
    };

    injector(this.getComponents(), stores)

    /**
     * @function API.AppInstance#getSkeleton
     * @description Shortcut for long schema skeleton of namespace.
     * @return {Object} The skeleton of the application, including namespaces.
     */
    this.getSkeleton = function(){
        return Namespace.generator(namespace, {}, this.getComponents);
    };

};