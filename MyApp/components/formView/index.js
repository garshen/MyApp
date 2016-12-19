'use strict';

app.formView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('formView');

// START_CUSTOM_CODE_formView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_formView
(function(parent) {
    var
    /// start global model properties
    /// end global model properties
        dataProvider = app.data.myApp,
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'Entries',
                dataProvider: dataProvider
            },
            error: function(e) {
                if (e.xhr) {
                    alert(JSON.stringify(e.xhr));
                }
            }
        },
        formViewModel = kendo.observable({
            submit: function() {
                var addFormData = parent.get('addFormData'),
                    addModel = {};

                app.mobileApp.showLoading();

                function saveModel(data) {
                    /// start add form data save
                    addModel.Entry = addFormData.textAreaField;
                    addModel.Date = addFormData.date6;
                    /// end add form data save
                    var dataSource = new kendo.data.DataSource(dataSourceOptions);
                    dataSource.add(addModel);
                    dataSource.one('change', function(e) {
                        // datasource operation finished
                        app.mobileApp.hideLoading();
                        app.showNotification('Saved');
                    });

                    dataSource.one('error', function(error) {
                        showErrorMessage(error.xhr || error);
                    });

                    dataSource.sync();
                };

                function showErrorMessage(error) {
                    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                    app.mobileApp.hideLoading();
                }

                /// start add form save
                /// end add form save
                /// start add form save handler
                saveModel();
                /// end add form save handler
            },
            /// start add model functions
            /// end add model functions

            cancel: function() {
                    /// start add model cancel
                    /// end add model cancel
                }
                /// start add model properties
                /// end add model properties

        });

    /// start form functions
    /// end form functions

    parent.set('onShow', function _onShow() {
        var that = parent;
        that.set('addFormData', {
            textAreaField: '',
            date6: '',
            /// start add form data init
            /// end add form data init
        });
        /// start add form show
        /// end add form show
    });
    parent.set('formViewModel', formViewModel);
})(app.formView);

// START_CUSTOM_CODE_formViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_formViewModel