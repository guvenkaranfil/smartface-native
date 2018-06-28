//NativeAccess
const Invocation = require('sf-core/util/iOS/invocation.js');
const UICollectionView = SF.requireClass("UICollectionView");
const UICollectionViewFlowLayout = SF.requireClass("UICollectionViewFlowLayout");

function StaggeredFlowLayout(params) {
    var sfSelf = this;
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // NATIVE FLOWLAYOUT CLASS IMPLEMENTATION
    
    var flowLayout = UICollectionViewFlowLayout.new(); // This will change to StaggeredFlowLayout class
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // INITIALIZATION
    if(!sfSelf.nativeObject){
        sfSelf.nativeObject = flowLayout;
        sfSelf.collectionView = null; //CollectionView will set this property.
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PROPERTIES
    
    var _spanCount = 1;
    Object.defineProperty(sfSelf, 'spanCount', {
        get: function() {
            return _spanCount;
        },
        set: function(value) {
            if (typeof value === "number") {
                _spanCount = value;   
            }
        },
        enumerable: true
    });
    
    var _lineSpacing = sfSelf.nativeObject.minimumLineSpacing;
    Object.defineProperty(sfSelf, 'lineSpacing', {
        get: function() {
            return _lineSpacing;
        },
        set: function(value) {
            if (typeof value === "number") {
                _lineSpacing = value; 
                sfSelf.nativeObject.minimumLineSpacing = _lineSpacing;
            }
        },
        enumerable: true
    });
    
    var _itemSpacing = sfSelf.nativeObject.minimumInteritemSpacing;
    Object.defineProperty(sfSelf, 'itemSpacing', {
        get: function() {
            return _itemSpacing;
        },
        set: function(value) {
            if (typeof value === "number") {
                _itemSpacing = value; 
                sfSelf.nativeObject.minimumInteritemSpacing = _itemSpacing;
            }
        },
        enumerable: true
    });
    
    var _contentInset = {top:0, left:0, bottom:0, right:0};
    Object.defineProperty(sfSelf, 'contentInset', {
        get: function() {
            return _contentInset;
        },
        set: function(value) {
            if (typeof value === "object") {
                _contentInset = value;
                
                if (sfSelf.collectionView) {
                    var argContentInset = new Invocation.Argument({
                        type:"UIEdgeInsets",
                        value: _contentInset
                    });
                    Invocation.invokeInstanceMethod(sfSelf.collectionView, "setContentInset:", [argContentInset]);
                }
            }
        },
        enumerable: true
    });
    
    var _scrollDirection = StaggeredFlowLayout.ScrollDirection.VERTICAL;
    Object.defineProperty(sfSelf, 'scrollDirection', {
        get: function() {
            return _scrollDirection;
        },
        set: function(value) {
            if (typeof value === "number") {
                _scrollDirection = value;
                sfSelf.nativeObject.scrollDirection = _scrollDirection;
            }
        },
        enumerable: true
    });
     
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODS
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CALLBACKS
    
    var _onItemLengthForDirection = null;
    Object.defineProperty(sfSelf, 'onItemLengthForDirection', {
        get: function() {
            return _onItemLengthForDirection;
        },
        set: function(value) {
            if (typeof value === "function") {
                _onItemLengthForDirection = value;
            }
        },
        enumerable: true
    });
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // HIDDEN
    
    var _sectionInset = {top:0, left:0, bottom:0, right:0};
    Object.defineProperty(sfSelf, 'sectionInset', {
        get: function() {
            return _sectionInset;
        },
        set: function(value) {
            if (typeof value === "object") {
                _sectionInset = value;
                
                var argSectionInset = new Invocation.Argument({
                    type:"UIEdgeInsets",
                    value: _sectionInset
                });
                Invocation.invokeInstanceMethod(sfSelf.nativeObject, "setSectionInset:", [argSectionInset]);
            }
        },
        enumerable: true
    });
    
    // LOGIC
    sfSelf.sizeForItemAtIndexPath = function (collectionView, collectionViewLayout, indexPath) {
        var retval = {width: 0, height: 0};
        
        if (sfSelf.scrollDirection == StaggeredFlowLayout.ScrollDirection.VERTICAL) 
        {
            var columnCount = sfSelf.spanCount;
            var itemWidth = (collectionView.frame.width - (sfSelf.contentInset.left + sfSelf.sectionInset.left + 
                                                            (sfSelf.itemSpacing * (columnCount - 1)) + 
                                                                sfSelf.sectionInset.right + sfSelf.contentInset.right)) / columnCount;
            var itemHeight = 0;
            if (sfSelf.onItemLengthForDirection) {
                itemHeight = sfSelf.onItemLengthForDirection(indexPath.row, indexPath.section, itemWidth);
            }
            
            retval.width = itemWidth;
            retval.height = itemHeight;
        } 
        else if (sfSelf.scrollDirection == StaggeredFlowLayout.ScrollDirection.HORIZONTAL) 
        {
            var rowCount = sfSelf.spanCount;
            var itemHeight = (collectionView.frame.height - (sfSelf.contentInset.top + sfSelf.sectionInset.top + 
                                                            (sfSelf.itemSpacing * (rowCount - 1)) + 
                                                                sfSelf.sectionInset.bottom + sfSelf.contentInset.bottom)) / rowCount;
            var itemWidth = 0;
            if (sfSelf.onItemLengthForDirection) {
                itemWidth = sfSelf.onItemLengthForDirection(indexPath.row, indexPath.section, itemHeight);
            }
            
            retval.width = itemWidth;
            retval.height = itemHeight;
        }
        return retval;
    };
     
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

StaggeredFlowLayout.ScrollDirection = {};
Object.defineProperties(StaggeredFlowLayout.ScrollDirection,{ 
    'VERTICAL': {
        value: 0,
        writable: false
    },
    'HORIZONTAL': {
        value: 1,
        writable: false
    }
});

module.exports = StaggeredFlowLayout;