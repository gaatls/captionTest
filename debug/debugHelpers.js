/**
 * Created by graham on 8/20/16.
 */
module.exports = {
    HBSDebugHelpers : {
        debug: function (optionalValue) {
            console.log("Current Context");
            console.log("====================");
            console.log(this);

            if (optionalValue) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
            }
        }
    }
};