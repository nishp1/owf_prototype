OWF.Model.Widget = Backbone.Model.extend({
    defaults: {
        "editable": false,
        "visible": true,
        "position": -1,
        "userId": "",
        "userRealName": "",
        "namespace": "",
        "url": "",
        "headerIcon": "",
        "image": "",
        "smallIconUrl": "",
        "largeIconUrl": "",
        "width": 400,
        "height": 400,
        "x": 0,
        "y": 0,
        "minimized": false,
        "maximized": false,
        "widgetVersion": "1.0",
        "tags": [],
        "definitionVisible": true,
        "singleton": false,
        "background": false,
        "allRequired": [],
        "directRequired": [],
        "widgetTypes": [],
        "path": ""
    }
});