/**
 * Created by graham on 8/21/16.
 */

var layoutHelpers = {
    addToPage : function(data){
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                let tempDiv = document.createElement('div');
                let temph1 = document.createElement('temph1');
                temph1.appendChild(document.createTextNode(data[i].name));
                tempDiv.appendChild(temph1);
                document.getElementsByTagName('body')[0].appendChild(tempDiv);
            }
        }
    }
};