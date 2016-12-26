function AlertView () {
    var self = this;
    self.nativeObject = new android.app.AlertDialog.Builder(Android.getActivity()).create();

    var titleInitial = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return titleInitial;
        },
        set: function(title) {
            titleInitial = title;
            self.nativeObject.setTitle(title);
        },
        enumerable: true
    });

    var messageInitial = "";
    Object.defineProperty(this, 'message', {
        get: function() {
            return messageInitial;
        },
        set: function(message) {
            messageInitial = message;
            self.nativeObject.setMessage(message);
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'isShowing', {
        get: function() {
            return self.nativeObject.isShowing();
        },
        enumerable: true
    });

    this.show = function() {
        self.nativeObject.show();
    };

    this.dismiss = function() {
        self.nativeObject.dismiss();
    };

    var buttonCallbacks = [];
    this.addButton = function(params){
        buttonCallbacks[params.index] = params.onClick;
        var nativeButtonIndex = -1;
        switch(params.index){
            case 0:
                nativeButtonIndex = -1;
                break;
            case 1:
                nativeButtonIndex = -2;
                break;
            case 2:
                nativeButtonIndex = -3;
                break;
        }
        self.nativeObject.setButton(nativeButtonIndex,params.text,
                new android.content.DialogInterface.OnClickListener.implement({
                   onClick: function(dialog,which){
                       switch(which){
                            case -1:
                                buttonCallbacks[0] && buttonCallbacks[0]();
                                break;
                            case -2:
                                buttonCallbacks[1] && buttonCallbacks[1]();
                                break;
                            case -3:
                                buttonCallbacks[2] && buttonCallbacks[2]();
                                break;
                       }
                   }
        }));
    }

    var onDismissCallback;
    Object.defineProperty(this, 'onDismiss', {
        get: function() {
            return onDismissCallback;
        },
        set: function(onDismiss) {
            onDismissCallback = onDismiss;
        },
        enumerable: true
    });

    self.nativeObject.setOnDismissListener(new android.content.DialogInterface.OnDismissListener.implement({
        onDismiss: function(dialog){
            onDismissCallback && onDismissCallback(self);
        }
    }));
}

module.exports = AlertView;